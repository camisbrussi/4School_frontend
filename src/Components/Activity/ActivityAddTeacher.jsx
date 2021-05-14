import React, {useEffect, useState} from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

import useFetch from "../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {RiAddBoxFill} from "react-icons/all";
import {FaWindowClose} from "react-icons/fa";
import {ACTIVITY_GET_TEACHERS, ACTIVITY_POST_PARTICIPANT} from "../../API/Api_Activity";
import {TEACHER_FILTER} from "../../API/Api_Teacher";

const ActivityAddTeacher = () => {
    const [nameFiltro, setNameFiltro] = useState("");
    const [cpfFiltro, setCpfFiltro] = useState("");

    const [professoresFiltro, setProfessoresFiltro] = useState([]);
    const [professoresAtividade, setProfessoresAtividade] = useState([]);

    const [objErros, setObjErros] = useState({});

    const activity_id = new URL(window.location.href).searchParams.get("activity");
    const activity_name = new URL(window.location.href).searchParams.get("name");

    const {loading, error} = useFetch();
    const navigate = useNavigate();

    //- busca os professores que ja estao vinculados com a atividade
    useEffect(() => {
        async function getTeachers() {
            const { url, options } = ACTIVITY_GET_TEACHERS(activity_id);
            const response = await axios.get(url, options);

            let professores = response.data;
            for (let i = 0; i < professores.length; i++) {
                professores[i].inActivity = true;
            }

            setProfessoresAtividade(professores);
        }
        getTeachers();
    }, []);

    async function filtraProfessores() {
        const token = window.localStorage.getItem("token");
        const {url, options} = TEACHER_FILTER(
            {
                status_id: 1, //-Ativo
                name: nameFiltro,
                cpf: cpfFiltro
            },
            token
        );

        const response = await axios.get(url, options);
        setProfessoresFiltro(response.data);
    }

    function addProfessor(id){
        if (id <= 0 || !professoresFiltro.length)
            return;

        professoresFiltro.map(professor => {
            if (professor.person.id === id && !isTeacherInActivity(professor.person.id)) {
                let professores = [...professoresAtividade];
                professor.inActivity = false;
                professores.push(professor);

                professores = ordernarProfessoresAtividade(professores);
                setProfessoresAtividade(professores);
            }
        });
    }

    function removeProfessor(id) {
        if (id <= 0 || !professoresAtividade.length)
            return;

        for (let i = 0; i < professoresAtividade.length; i++) {
            if (professoresAtividade[i].person.id === id) {
                let professores = [...professoresAtividade];
                professores.splice(i,1);
                setProfessoresAtividade(professores);
                break;
            }
        }
    }

    function isTeacherInActivity(id){
        if (!professoresAtividade.length)
            return false;

        for (let i = 0; i < professoresAtividade.length; i++) {
            if (professoresAtividade[i].person.id === id)
                return true;
        }

        return false;
    }
    
    function formataCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    function ordernarProfessoresAtividade(professores) {
        professores.sort(function(a,b) {
            return a.person.name < b.person.name ? -1 : a.person.name > b.person.name ? 1 : 0;
        });

        return professores;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const token = window.localStorage.getItem("token");
        const {url, body, options} = ACTIVITY_POST_PARTICIPANT(activity_id,{
            participants:professoresAtividade
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
                navigate("/conta/activities/participants/?activity="+activity_id+"&name="+activity_name);
            }
        }
    }

    return (
        <section className="animeLeft">
            <h1 className="title title-2">Gerenciar professores da atividade {activity_name}</h1>

            <div className="containerFiltro">
                <h3 className="mb-5">Filtro de Professores</h3>

                <div className="container60">
                    <Input label="Nome" type="text" onChange={(e) => { setNameFiltro(e.target.value) }}/>
                </div>
                <div className="container20">
                    <Input label="CPF" type="text" onChange={(e) => { setCpfFiltro(e.target.value) }}/>
                </div>
                <div className="container20">
                    <label>&nbsp;</label>
                    <Button type="button" onClick={filtraProfessores}>Buscar</Button>
                </div>
            </div>

            <div className="container100 mt-30">
                <div className="container50 mb-30">
                    <h3 className="mb-5">Estudantes filtrados</h3>
                    {professoresFiltro.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {professoresFiltro.map(professor => (
                                <tr key={professor.id}>
                                    <td>{professor.person.name}</td>
                                    <td>{formataCPF(professor.person.cpf)}</td>
                                    <td><RiAddBoxFill className="cursor-pointer" onClick={() => {addProfessor(professor.person.id)}} size={16} style={{color: 'green'}}/></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>)
                     : ("Nenhum professor encontrado")}
                </div>

                <div className="container50 mb-30">
                    <h3 className="mb-5">Professores na atividade</h3>
                    {professoresAtividade.length ? (
                            <table>
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {professoresAtividade.map(professor => (
                                    <tr key={professor.id}>
                                        <td>{professor.person.name}</td>
                                        <td>{formataCPF(professor.person.cpf)}</td>
                                        <td>
                                            {professor.inActivity ? "" : (<FaWindowClose onClick={() => {removeProfessor(professor.person.id)}} className="cursor-pointer" size={16} style={{color: 'red'}}/>)}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>)
                        : ("Nenhum professor na atividade")}
                </div>
            </div>

            <div className="container100 my-30">
                {loading ? (<Button disabled>Salvando...</Button>) : (<Button onClick={handleSubmit}>Salvar</Button>)}
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