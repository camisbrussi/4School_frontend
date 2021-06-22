import React, {useEffect, useState} from "react";
import Error from "../Helper/Error";
import {Alert} from "react-st-modal";
import {UserContext} from '../../Contexts/UserContext';
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {ACTIVITY_PUT, ACTIVITY_SHOW} from "../../API/Api_Activity";
import FormActivity from "./FormActivity";
import {bloqueiaTela, formata_data_hora_para_datetime, liberaTela} from "../Helper/Functions";

const ActivityEdit = () => {
    const navigate = useNavigate();

    var params = window.location.href.substr(1).split("/");
    let id = params[6];

    const {userLogged, token} = React.useContext(UserContext);

    const [dados, setDados] = useState({});
    const [podeAtualizar, setPodeAtualizar] = useState(false);

    const [objErros, setObjErros] = useState({});

    useEffect(() => {
        modalError();
    }, [objErros]);


    useEffect(() => {
        async function getData() {
            bloqueiaTela();

            const {url, options} = ACTIVITY_SHOW(id, token);
            const response = await axios.get(url, options);
            let name = response.data.name;
            let description = response.data.description;
            let start = formata_data_hora_para_datetime(new Date(response.data.start).toLocaleString()).replace(" ", "T");
            let end = formata_data_hora_para_datetime(new Date(response.data.end).toLocaleString()).replace(" ", "T");
            let generate_certificate = response.data.generate_certificate;
            let vacancies = response.data.vacancies;
            let isActive = response.data.status_id === 1;

            setDados({name, description, start, end, generate_certificate, vacancies, isActive})
            setPodeAtualizar(true);

            liberaTela();
        }

        getData();
    }, [id, token]);

    async function handleSubmit(event, data) {
        bloqueiaTela();

        event.preventDefault();

        const {url, body, options} = ACTIVITY_PUT(id, data, userLogged, token);
        const response = await axios.put(url, body, options);

        if (response.statusText === "OK") {
            if (response.data.erros !== undefined && response.data.erros.length) {
                let erros = {msg: response.data.success, erros: []};
                for (let i = 0; i < response.data.erros.length; i++) {
                    erros.erros.push(response.data.erros[i]);
                }
                setObjErros(erros);
                modalError();
            } else {
                navigate("/conta/activities");
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
            setObjErros("");
        }
    }

    return podeAtualizar ? (
        <FormActivity
            titulo="Editar Atividades"
            handleSubmit={handleSubmit}
            dados={dados}
            addCheckAtivo={true}
        />
    ) : null;
};

export default ActivityEdit;
