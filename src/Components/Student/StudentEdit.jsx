import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import axios from "axios"
import {STUDENT_PUT, STUDENT_SHOW} from "../../API/Api_Student";
import FormPerson from "../Person/FormPerson";

const StudentEdit = () => {
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');
    var params = window.location.href.substr(1).split("/");
    let id = params[6];

    const [dados,setDados] = useState({});
    const [podeAtualziar, setPodeAtualizar] = useState(false);

    useEffect(() => {
        async function getData() {
            const {url, options} = STUDENT_SHOW(id, token);
            const response = await axios.get(url, options);

            let name = response.data.person.name;
            let cpf = response.data.person.cpf;
            let email = response.data.person.email;
            let birth_date = response.data.person.birth_date;
            let isActive = response.data.status.id === 1;
            let phones = [];

            if (response.data.person.phones.length) {
                phones = [...response.data.person.phones];
            }

            setDados({name,cpf,email,birth_date,phones,isActive})
            setPodeAtualizar(true);
        }

        getData();
    }, [id, token]);

    async function handleSubmit(event, data) {
        event.preventDefault();
        const {url, body, options} = STUDENT_PUT(id, data, token);
        const response = await axios.put(url, body, options);
        if (response.statusText === 'OK') navigate("/conta/students");
    }

    return podeAtualziar ? <FormPerson titulo="Editar Estudante" handleSubmit={handleSubmit} dados={dados} addPassword={false} addCheckAtivo={true} /> : null;
};

export default StudentEdit;