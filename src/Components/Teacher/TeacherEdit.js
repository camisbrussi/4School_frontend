import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import axios from "axios"
import {TEACHER_PUT, TEACHER_SHOW} from "../../API/Api_Teacher";
import FormPerson from "../Person/FormPerson";

const TeacherEdit = () => {
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');
    var params = window.location.href.substr(1).split("/");
    let id = params[6];

    const [dados,setDados] = useState({});
    const [podeAtualziar, setPodeAtualizar] = useState(false);

    useEffect(() => {
        async function getData() {
            const {url, options} = TEACHER_SHOW(id, token);
            const response = await axios.get(url, options);

            let name = response.data.person.name;
            let cpf = response.data.person.cpf;
            let email = response.data.person.email;
            let birth_date = response.data.person.birth_date;
            let phones = [];

            if (response.data.person.phones.length) {
                phones = [...response.data.person.phones];
            }

            setDados({name,cpf,email,birth_date,phones})
            setPodeAtualizar(true);
        }

        getData();
    }, [id, token]);

    async function handleSubmit(event, data) {
        event.preventDefault();
        const {url, body, options} = TEACHER_PUT(id, data, token);
        const response = await axios.put(url, body, options);
        if (response.statusText === 'OK') navigate("/conta/teachers");
    }

    return podeAtualziar ? <FormPerson titulo="Editar Professor" handleSubmit={handleSubmit} dados={dados} /> : null;
};

export default TeacherEdit;