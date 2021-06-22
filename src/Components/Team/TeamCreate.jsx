import React, {useEffect, useState} from "react";
import Error from "../Helper/Error";
import {UserContext} from '../../Contexts/UserContext';
import FormTeam from './FormTeam'
import useFetch from "../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";
import {Alert} from 'react-st-modal';

import {TEAM_POST} from "../../API/Api_Team";
import axios from "axios";
import {bloqueiaTela, liberaTela} from "../Helper/Functions";

const TeamCreate = () => {
    const navigate = useNavigate();

    const {loading} = useFetch();

    const [objErros, setObjErros] = useState({});
    const {userLogged, token} = React.useContext(UserContext);

    useEffect(() => {
        modalError();
    }, [objErros]);


    async function handleSubmit(event, data) {
        event.preventDefault();
        bloqueiaTela();

        const {url, body, options} = TEAM_POST(data, userLogged, token);
        const response = await axios.post(url, body, options);

        if (response.statusText === 'OK') {
            if (response.data.erros !== undefined && response.data.erros.length) {
                let erros = {msg: response.data.success, erros: []};
                for (let i = 0; i < response.data.erros.length; i++) {
                    erros.erros.push(response.data.erros[i]);
                }
                setObjErros(erros);
                modalError();
            } else {
                if (response.statusText === "OK") navigate("/conta/teams/participants/addstudents?team=" + response.data.id + "&name=" + data.name + "&year=" + data.year);
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

    return (
        <FormTeam
            titulo="Cadastro de Turmas"
            handleSubmit={handleSubmit}
            loading={loading}
            dados={{}}
            addPassword={true}
        />
    )
};

export default TeamCreate;
