import React from 'react';

import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom';

import {TEACHER_POST} from '../../API/Api_Teacher';
import axios from "axios";
import FormPerson from "../Person/FormPerson";

const TeacherCreate = () => {
    const navigate = useNavigate();
    const {loading, error} = useFetch();

    async function handleSubmit(event, data) {
        event.preventDefault();
        const token = window.localStorage.getItem('token');

        const {url, body, options} = TEACHER_POST(data, token);
        const response = await axios.post(url, body, options);

        if (response.statusText === 'OK') navigate("/conta/teachers");
    }

    return (
        <FormPerson titulo="Cadastro de Professores" handleSubmit={handleSubmit} loading={loading} error={error} dados={{}} />
    );
};

export default TeacherCreate;