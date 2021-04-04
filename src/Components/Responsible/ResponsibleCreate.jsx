import React from 'react';

import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom';

import {RESPONSIBLE_POST} from '../../API/Api_Responsible';
import axios from "axios";
import FormPerson from "../Person/FormPerson";

const ResponsibleCreate = () => {
    const navigate = useNavigate();
    const {loading, error} = useFetch();

    async function handleSubmit(event, data) {
        event.preventDefault();
        const token = window.localStorage.getItem('token');

        const {url, body, options} = RESPONSIBLE_POST(data, token);
        const response = await axios.post(url, body, options);

        if (response.statusText === 'OK') navigate("/conta/responsibles");
    }

    return (
        <FormPerson titulo="Cadastro de Responsáveis" handleSubmit={handleSubmit} loading={loading} error={error} dados={{}} addPassword={true} />
    );
};

export default ResponsibleCreate;