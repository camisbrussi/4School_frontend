import React from 'react';

import useFetch from '../../Hooks/useFetch';
import {useNavigate, useParams} from 'react-router-dom';

import {STUDENT_POST} from '../../API/Api_Student';
import axios from "axios";
import FormPerson from "../Person/FormPerson";

const StudentCreate = () => {
    const navigate = useNavigate();
    const {loading, error} = useFetch();

    async function handleSubmit(event, data) {
        event.preventDefault();
        const token = window.localStorage.getItem('token');

        const responsible_id = new URL(window.location.href).searchParams.get("responsible");
        data.responsible_id = responsible_id;

        const {url, body, options} = STUDENT_POST(data, token);
        const response = await axios.post(url, body, options);

        if (response.statusText === 'OK') navigate("/conta/students");
    }

    return (
        <FormPerson titulo="Cadastro de Estudantes" handleSubmit={handleSubmit} loading={loading} error={error} dados={{}} addPassword={false} />
    );
};

export default StudentCreate;