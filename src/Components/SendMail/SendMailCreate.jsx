import React, {useEffect, useState} from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

import useFetch from "../../Hooks/useFetch";
import {Link, useNavigate} from "react-router-dom";

import axios from "axios";
import {RiAddBoxFill} from "react-icons/all";
import {FaWindowClose} from "react-icons/fa";
import {SENDMAIL_GET_STUDENTS, SENDMAIL_POST_STUDENTS} from "../../API/Api_SendMail";
import {SENDMAIL_FILTER} from "../../API/Api_SendMail";

const ActivityAddTeacher = () => {
    const [nameFiltro, setNameFiltro] = useState("");
    const [cpfFiltro, setCpfFiltro] = useState("");

    const [estudanteFiltro, setestudanteFiltro] = useState("");

    const [professoresFiltro, setProfessoresFiltro] = useState([]);
    const [professoresAtividade, setProfessoresAtividade] = useState([]);

    const [estudantesFiltro, setEstudantesFiltro] = useState([]);
    const [estudantes, setEstudantes] = useState([]);

    const [objErros, setObjErros] = useState({});

    const activity_id = new URL(window.location.href).searchParams.get("activity");
    const activity_name = new URL(window.location.href).searchParams.get("name");


    const sendmail_id = new URL(window.location.href).searchParams.get("sendmail");
    const sendmail_message = new URL(window.location.href).searchParams.get("message");

    const {loading, error} = useFetch();
    const navigate = useNavigate();

    //- busca os professores que ja estao vinculados com a atividade
    useEffect(() => {
        async function getEstudante() {
            const { url, options } = SENDMAIL_GET_STUDENTS(sendmail_id);
            const response = await axios.get(url, options);

            let estudantes = response.data;
            for (let i = 0; i < estudantes.length; i++) {
                estudantes[i].inActivity = true;
            }

            setEstudantes(estudantes);
        }
        getEstudante();
    }, []);

    async function filtraSendMail() {
        const token = window.localStorage.getItem("token");
        const {url, options} = SENDMAIL_FILTER(
            {
                //status_id: 1, //-Ativo
                message: estudanteFiltro,
            },
            token
        );

        const response = await axios.get(url, options);
        setEstudantes(response.data);
    }

    function addestudantes(id){
        if (id <= 0 || !estudantesFiltro.length)
            return;

        estudantesFiltro.map(estudante => {
            if (estudante.person.id === id ) {
                let estudantes = [...estudantes];
                estudante.inActivity = false;
                estudantes.push(estudante);

                //estudantes = ordernarestudanteEmail(estudantes);
                setEstudantes(estudantes);
            }
        });
    }

    function removeEstudantes(id) {
        if (id <= 0 || !estudantes.length)
            return;

        for (let i = 0; i < estudantes.length; i++) {
            if (estudantes[i].person.id === id) {
                let estudante = [...estudantes];
                estudante.splice(i,1);
                setEstudantes(estudante);
                break;
            }
        }
    }



    /*function ordernarestudanteEmail(estudantes) {
        estudantes.sort(function(a,b) {
            return a.person.name < b.person.name ? -1 : a.person.name > b.person.name ? 1 : 0;
        });

        return estudantes;
    }*/

    async function handleSubmit(event) {
        event.preventDefault();

        const token = window.localStorage.getItem("token");
        const {url, body, options} = SENDMAIL_POST_STUDENTS(sendmail_id,{
            turms:estudantes
        },token);

        const response = await axios.post(url, body, options);
        if (response.statusText === "OK") {
            if (response.data.erros !== undefined && response.data.erros.length) {
                let erros = {msg: response.data.success, erros: []};
                for (let i = 0; i < response.data.erros.length; i++) {
                    erros.erros.push(response.data.erros[i]);
                }
                setObjErros(erros);
            } else {
                navigate("/conta/sendmail/participants/?sendmail="+sendmail_id+"&message="+sendmail_message);
            }
        }
    }

    return (
        <section className="animeLeft">
            <h1 className="title title-2">Gerenciar envio de mensagens e e-mails {sendmail_message}</h1>

            <div className="container70">
                    <Input label="Mensagem" type="text" onChange={(e) => { setNameFiltro(e.target.value) }}/>
                </div>
            <div className="containerFiltro">
                <br></br>
                <h3 className="mb-5">Filtro alunos</h3>

                <div className="container60">
                    <Input label="Nome" type="text" onChange={(e) => { setNameFiltro(e.target.value) }}/>
                </div>
                
              
                <div className="container20">
                    <label>&nbsp;</label>
                    <Button type="button" onClick={filtraSendMail}>Buscar</Button>
                </div>
            </div>

            <div className="container100 mt-30">
                <div className="container50 mb-30">
                    <h3 className="mb-5">Estudantes filtrados</h3>
                    {estudantesFiltro.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                                                        <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {estudantesFiltro.map(estudante => (
                                <tr key={estudante.id}>
                                    <td>{estudante.name}</td>
                                    <td><RiAddBoxFill className="cursor-pointer" onClick={() => {addestudantes(estudante.person.id)}} size={16} style={{color: 'green'}}/></td>
                                    <td>{estudante.inActivity ? "" : (<FaWindowClose onClick={() => {removeEstudantes(estudante.person.id)}} className="cursor-pointer" size={16} style={{color: 'red'}}/>)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>)
                     : ("Nenhum estudante encontrado")}
                </div>

               
            </div>

            <div className="container100 my-30">
                {loading ? (<Button disabled>Salvando...</Button>) : (<Button onClick={handleSubmit}>Enviar e-mail</Button>)}
                <Error error={error && ""}/>
                {
                    Object.keys(objErros).length > 0 ?
                    (
                        <>
                            <b><Error error={objErros.msg}/></b>
                            {objErros.erros.map((val, key) => (<li key={key}><Error error={val}/></li>))}
                        </>
                        ) : ""
                }
            </div>
        </section>
    );
};

export default ActivityAddTeacher;