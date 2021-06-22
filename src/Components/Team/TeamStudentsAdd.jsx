import React, {useEffect, useState} from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import {UserContext} from '../../Contexts/UserContext';
import useFetch from "../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";

import {TEAM_GET_STUDENTS, TEAM_POST_STUDENTS} from "../../API/Api_Team";
import axios from "axios";
import {STUDENT_FILTER} from "../../API/Api_Student";
import {RiAddBoxFill} from "react-icons/all";
import {FaWindowClose} from "react-icons/fa";
import {bloqueiaTela, formata_cpf, liberaTela} from "../Helper/Functions";

const TeamStudentsAdd = () => {
    const [nameFiltro, setNameFiltro] = useState("");
    const [cpfFiltro, setCpfFiltro] = useState("");
    const [anoFiltro, setAnoFiltro] = useState("");

    const [alunosFiltro, setAlunosFiltro] = useState([]);
    const [alunosTurma, setAlunosTurma] = useState([]);

    const [objErros, setObjErros] = useState({});
    const {userLogged, token} = React.useContext(UserContext);

    const team_id = new URL(window.location.href).searchParams.get("team");
    const team_name = new URL(window.location.href).searchParams.get("name");
    const team_year = new URL(window.location.href).searchParams.get("year");

    const {loading, error} = useFetch();
    const navigate = useNavigate();

    //- busca os alunos que ja estao vinculados com a turma
    useEffect(() => {
        async function getStudents() {
            bloqueiaTela();

            const {url, options} = TEAM_GET_STUDENTS(new URL(window.location.href).searchParams.get("team"), token);
            const response = await axios.get(url, options);
            setAlunosTurma(response.data);

            liberaTela();
        }

        if (Object.keys(token).length > 0) getStudents();

    }, [token]);

    async function filtraEstudantes() {
        bloqueiaTela();

        const token = window.localStorage.getItem("token");
        const {url, options} = STUDENT_FILTER(
            {
                status_id: 1, //-Ativo
                name: nameFiltro,
                cpf: cpfFiltro,
                yearBirth: anoFiltro
            },
            token
        );

        const response = await axios.get(url, options);
        setAlunosFiltro(response.data);

        liberaTela();
    }

    function addAluno(id) {
        if (id <= 0 || !alunosFiltro.length)
            return;

        alunosFiltro.map(aluno => {
            if (aluno.id === id && !isAlunoInTurma(aluno.id)) {
                let alunos = [...alunosTurma];
                alunos.push(aluno);

                alunos = ordernarAlunosTurma(alunos);
                setAlunosTurma(alunos);
            }
        });
    }

    function removeAluno(id) {
        if (id <= 0 || !alunosTurma.length)
            return;

        for (let i = 0; i < alunosTurma.length; i++) {
            if (alunosTurma[i].id === id) {
                let alunos = [...alunosTurma];
                alunos.splice(i, 1);
                setAlunosTurma(alunos);
                break;
            }
        }
    }

    function isAlunoInTurma(id) {
        if (!alunosTurma.length)
            return false;

        for (let i = 0; i < alunosTurma.length; i++) {
            if (alunosTurma[i].id === id)
                return true;
        }

        return false;
    }

    function formataData(data) {
        let dados = data.split("-");
        return dados[2] + "/" + dados[1] + "/" + dados[0];
    }

    function ordernarAlunosTurma(alunos) {
        alunos.sort(function (a, b) {
            return a.person.name < b.person.name ? -1 : a.person.name > b.person.name ? 1 : 0;
        });

        return alunos;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        bloqueiaTela();

        const token = window.localStorage.getItem("token");
        const {url, body, options} = TEAM_POST_STUDENTS(team_id, {students: alunosTurma}, userLogged, token);

        const response = await axios.post(url, body, options);
        //console.log(response);
        if (response.statusText === "OK") {
            if (response.data.erros !== undefined && response.data.erros.length) {
                let erros = {msg: response.data.success, erros: []};
                for (let i = 0; i < response.data.erros.length; i++) {
                    erros.erros.push(response.data.erros[i]);
                }
                setObjErros(erros);
            } else {
                navigate("/conta/teams");
            }
        }

        liberaTela();
    }

    return (
        <section className="animeLeft">
            <h1 className="title title-2">Gerenciar alunos da turma {team_name} ({team_year})</h1>

            <div className="containerFiltro">
                <h3 className="mb-5">Filtro de Alunos</h3>

                <div className="container40">
                    <Input label="Nome" type="text" onChange={(e) => {
                        setNameFiltro(e.target.value)
                    }}/>
                </div>
                <div className="container20">
                    <Input label="CPF" type="text" onChange={(e) => {
                        setCpfFiltro(e.target.value)
                    }}/>
                </div>
                <div className="container20">
                    <Input label="Ano Nascimento" type="text" onChange={(e) => {
                        setAnoFiltro(e.target.value)
                    }}/>
                </div>
                <div className="container20">
                    <label>&nbsp;</label>
                    <Button type="button" onClick={filtraEstudantes}>Buscar</Button>
                </div>
            </div>

            <div className="container100 mt-30">
                <div className="container50 mb-30">
                    <h3 className="mb-5">Estudantes filtrados</h3>
                    {alunosFiltro.length ? (
                            <table>
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Nascimento</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {alunosFiltro.map(aluno => (
                                    <tr key={aluno.id}>
                                        <td>{aluno.person.name}</td>
                                        <td>{formata_cpf(aluno.person.cpf)}</td>
                                        <td>{formataData(aluno.person.birth_date)}</td>
                                        <td><RiAddBoxFill className="cursor-pointer" onClick={() => {
                                            addAluno(aluno.id)
                                        }} size={16} style={{color: 'green'}}/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>)
                        : ("Nenhum aluno encontrado")}
                </div>

                <div className="container50 mb-30">
                    <h3 className="mb-5">Estudantes da turma</h3>
                    {alunosTurma.length ? (
                            <table>
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Nascimento</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {alunosTurma.map(aluno => (
                                    <tr key={aluno.id}>
                                        <td>{aluno.person.name}</td>
                                        <td>{formata_cpf(aluno.person.cpf)}</td>
                                        <td>{formataData(aluno.person.birth_date)}</td>
                                        <td>
                                            <FaWindowClose onClick={() => {
                                                removeAluno(aluno.id)
                                            }} className="cursor-pointer" size={16} style={{color: 'red'}}/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>)
                        : ("Nenhum aluno na turma")}
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

export default TeamStudentsAdd;