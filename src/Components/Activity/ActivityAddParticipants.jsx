import React, {useEffect, useState} from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

import useFetch from "../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";
import { Alert } from "react-st-modal";

import axios from "axios";
import {RiAddBoxFill} from "react-icons/all";
import {FaWindowClose} from "react-icons/fa";
import {ACTIVITY_GET_PARTICIPANTS, ACTIVITY_POST_PARTICIPANT} from "../../API/Api_Activity";
import {TEAM_FILTER, TEAM_FILTER_STUDENTS} from "../../API/Api_Team";
import Select from "../Forms/Select";
import {PERSON_FILTER} from "../../API/Api_Person";

const ActivityAddParticipants = () => {
    const [nameFiltro, setNameFiltro] = useState("");
    const [typeFiltro, setTypeFiltro] = useState(0);
    const [teamFiltro, setTeamFiltro] = useState(0);

    const types = [
        {id: 3, description: "Aluno"},
        {id: 1, description: "Professor"},
        {id: 2, description: "Responsável"}
    ];
    const [teams, setTeams] = useState([]);

    const [pessoasFiltro, setPessoasFiltro] = useState([]);
    const [pessoasAtividade, setPessoasAtividade] = useState([]);

    const [objErros, setObjErros] = useState({});

    const activity_id = new URL(window.location.href).searchParams.get("activity");
    const activity_name = new URL(window.location.href).searchParams.get("name");

    const {loading, error} = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
        modalError();
      }, [objErros, modalError]);

    //- busca os professores que ja estao vinculados com a atividade
    useEffect(() => {
        async function getTeams() {
            const token = window.localStorage.getItem("token");
            const {url, options} = TEAM_FILTER(
                {status_id: 1},
                token
            );

            const response = await axios.get(url, options);
            setTeams(response.data);
        }

        async function getParticipants() {
            const {url, options} = ACTIVITY_GET_PARTICIPANTS(activity_id);
            const response = await axios.get(url, options);

            let participantes = [];
            for (let i = 0; i < response.data.length; i++) {
                let pessoa = response.data[i].person;
                pessoa.inActivity = true;
                participantes.push(pessoa);
            }

            setPessoasAtividade(participantes);
        }

        let select = document.getElementById("type");
        types.map(type => {
            let option = new Option(type.description, type.id);
            select.add(option);
        });

        getTeams();
        getParticipants();
    }, []);

    useEffect(() => {
        let select = document.getElementById("team");
        teams.map(team => {
            let option = new Option(team.name+" ("+team.year+")", team.id);
            select.add(option);
        });
    }, [teams]);

    async function filtraPessoas() {
        const token = window.localStorage.getItem("token");
        let getParamentes = PERSON_FILTER(
            {
                name: nameFiltro,
                type_id: typeFiltro
            },
            token
        );

        if (teamFiltro > 0) {
            getParamentes = TEAM_FILTER_STUDENTS(teamFiltro,
                { name: nameFiltro },
                token
            );
        }

        let {url, options} = getParamentes;

        const response = await axios.get(url, options);

        let dados = {};
        if (teamFiltro > 0 && response.data.length) {
            //- Quando o filtro eh por turma o retorno da API tem um formato diferente, entao vamos ter que organizar os dados
            let persons = [];
            for (let i = 0; i < response.data.length; i++) {
                persons.push(response.data[i].student.person);
            }
            dados = persons;
        } else {
            dados = response.data;
        }

        setPessoasFiltro(dados);
    }

    function addPessoa(id) {
        if (id <= 0 || !pessoasFiltro.length)
            return;

        pessoasFiltro.map(pessoa => {
            if (pessoa.id === id && !isPersonInActivity(pessoa.id)) {
                let pessoas = [...pessoasAtividade];
                pessoa.inActivity = false;
                pessoas.push(pessoa);

                pessoas = ordernarPessoasAtividade(pessoas);
                setPessoasAtividade(pessoas);
            }
        });
    }

    function removePessoa(id) {
        if (id <= 0 || !pessoasAtividade.length)
            return;

        for (let i = 0; i < pessoasAtividade.length; i++) {
            if (pessoasAtividade[i].id === id) {
                let professores = [...pessoasAtividade];
                professores.splice(i, 1);
                setPessoasAtividade(professores);
                break;
            }
        }
    }

    function isPersonInActivity(id) {
        if (!pessoasAtividade.length)
            return false;

        for (let i = 0; i < pessoasAtividade.length; i++) {
            if (pessoasAtividade[i].id === id)
                return true;
        }

        return false;
    }
    
    function formataCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    function ordernarPessoasAtividade(pessoas) {
        pessoas.sort(function (a, b) {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        return pessoas;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const token = window.localStorage.getItem("token");
        const {url, body, options} = ACTIVITY_POST_PARTICIPANT(activity_id, {
            participants: pessoasAtividade
        }, token);

        const response = await axios.post(url, body, options);
        if (response.statusText === "OK") {
            if (response.data.erros !== undefined && response.data.erros.length) {
                let erros = {msg: response.data.success, erros: []};
                for (let i = 0; i < response.data.erros.length; i++) {
                    erros.erros.push(response.data.erros[i]);
                }
                setObjErros(erros);
                modalError();
            } else {
                navigate("/conta/activities/participants/?activity=" + activity_id + "&name=" + activity_name);
            }
        }
    }

    async function modalError() {
        let result;
        if (Object.keys(objErros).length > 0) {
          result = await Alert(
            objErros.erros.map((val, key) => (
              <li key={key}>
                <Error error={val} />
              </li>
            )),
            objErros.msg
          );
          setObjErros("");
        }
      }

    return (
        <section className="animeLeft">
            <h1 className="title title-2">Adicionar participantes &agrave; atividade {activity_name}</h1>

            <div className="containerFiltro">
                <h3 className="mb-5">Filtro de Participantes</h3>

                <div className="container40">
                    <Input label="Nome" type="text" onChange={(e) => {
                        setNameFiltro(e.target.value)
                    }}/>
                </div>

                <div className="container20">
                    <Select label="Tipo" name="type" primeiraOpcao={{id:0,name:":: TODOS ::"}} onChange={(e) => {
                        setTypeFiltro(e.target.value);
                    }}/>
                </div>

                <div className="container20">
                    <Select label="Turma" name="team" primeiraOpcao={{id:0,name:":: TODAS ::"}} onChange={(e) => {
                        setTeamFiltro(e.target.value);
                    }}/>
                </div>

                <div className="container20">
                    <label>&nbsp;</label>
                    <Button type="button" onClick={filtraPessoas}>Buscar</Button>
                </div>
            </div>

            <div className="container100 mt-30">
                <div className="container50 mb-30">
                    <h3 className="mb-5">Pessoas filtradas</h3>
                    {pessoasFiltro.length ? (
                            <table>
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    {/*<th>CPF</th>*/}
                                    <th>Tipo</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {pessoasFiltro.map(pessoa => (
                                    <tr key={pessoa.id}>
                                        <td>{pessoa.name}</td>
                                        {/*<td>{formataCPF(pessoa.cpf)}</td>*/}
                                        <td>{pessoa.type.description}</td>
                                        <td><RiAddBoxFill className="cursor-pointer" onClick={() => {
                                            addPessoa(pessoa.id)
                                        }} size={16} style={{color: 'green'}}/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>)
                        : ("Nenhuma pessoa encontrada")}
                </div>

                <div className="container50 mb-30">
                    <h3 className="mb-5">Participantes</h3>
                    {pessoasAtividade.length ? (
                            <table>
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    {/*<th>CPF</th>*/}
                                    <th>Tipo</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {pessoasAtividade.map(pessoa => (
                                    <tr key={pessoa.id}>
                                        <td>{pessoa.name}</td>
                                        {/*<td>{formataCPF(pessoa.cpf)}</td>*/}
                                        <td>{formataCPF(pessoa.type.description)}</td>
                                        <td>
                                            {pessoa.inActivity ? "" : (<FaWindowClose onClick={() => {
                                                removePessoa(pessoa.id)
                                            }} className="cursor-pointer" size={16} style={{color: 'red'}}/>)}
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
            </div>
        </section>
    );
};

export default ActivityAddParticipants;