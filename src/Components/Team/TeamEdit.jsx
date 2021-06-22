import React, {useEffect, useState} from 'react';
import Error from '../Helper/Error';
import FormTeam from './FormTeam'
import {UserContext} from "../../Contexts/UserContext";
import {useNavigate} from 'react-router-dom';
import {Alert} from 'react-st-modal';

import axios from 'axios';
import {TEAM_PUT, TEAM_SHOW} from '../../API/Api_Team';
import {bloqueiaTela, liberaTela} from "../Helper/Functions";

const TeamEdit = () => {
    const navigate = useNavigate();
    const [objErros, setObjErros] = useState({});
    const [dados, setDados] = useState({});
    const [podeAtualziar, setPodeAtualizar] = useState(false);
    const {userLogged, token} = React.useContext(UserContext);

    var params = window.location.href.substr(1).split('/');
    let id = params[6];

    useEffect(() => {
        modalError();
    }, [objErros]);

    useEffect(() => {
        async function getData() {
            bloqueiaTela();

            const {url, options} = TEAM_SHOW(id, token);
            const response = await axios.get(url, options);

            let name = response.data.name;
            let teacherId = response.data.teacher.id;
            let year = response.data.year;
            let isActive = response.data.status_id == 1;

            setDados({name, teacherId, year, isActive});
            setPodeAtualizar(true);

            liberaTela();
        }

        getData();
    }, [id, token]);

    async function handleSubmit(event, data) {
        event.preventDefault();
        bloqueiaTela();

        const {url, body, options} = TEAM_PUT(id, data, userLogged, token);
        const response = await axios.put(url, body, options);
        if (response.statusText === 'OK') {
            if (response.data.erros !== undefined && response.data.erros.length) {
                let erros = {msg: response.data.success, erros: []};
                for (let i = 0; i < response.data.erros.length; i++) {
                    erros.erros.push(response.data.erros[i]);
                }
                setObjErros(erros);
                modalError();
            } else {
                navigate('/conta/teams');
            }
        }

        liberaTela();
    }

    async function modalError() {
        if (Object.keys(objErros).length > 0) {
            await Alert(
                objErros.erros.map((val, key) => (
                    <li key={key}>
                        <Error error={val}/>
                    </li>
                )),
                objErros.msg
            );
            setObjErros('');
        }
    }

    return podeAtualziar ? (
        <FormTeam
            titulo="Editar Turma"
            handleSubmit={handleSubmit}
            dados={dados}
            addCheckAtivo={true}
        />
    ) : null;
};

export default TeamEdit;
