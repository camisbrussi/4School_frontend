import React, {useEffect, useState} from 'react';

import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../Contexts/UserContext';
import {STUDENT_POST} from '../../API/Api_Student';
import axios from 'axios';
import FormPerson from '../Person/FormPerson';
import {Alert} from 'react-st-modal';
import Error from '../Helper/Error';
import {RESPONSIBLE_SHOW} from "../../API/Api_Responsible";
import {bloqueiaTela, liberaTela} from "../Helper/Functions";

const StudentCreate = () => {
    const navigate = useNavigate();
    const {loading} = useFetch();

    const [objErros, setObjErros] = useState({});

    const {userLogged, token} = React.useContext(UserContext);

    const [formData, setFormData] = useState({});
    const [responsible_name, setResponsibleName] = useState("");
    const responsible_id = new URL(window.location.href).searchParams.get('responsible');

    useEffect(() => {
        modalError();
    }, [objErros]);

    useEffect(() => {
        async function getResponsibleData() {
            bloqueiaTela();

            const {url, options} = RESPONSIBLE_SHOW(responsible_id, token);
            const response = await axios.get(url, options);

            setResponsibleName(response.data.person.name);

            let address = null;
            let cep = null;
            let number = null;
            let complement = null;
            let district = null;
            let idCity = null;
            if (response.data.person.address != null) {
                address = response.data.person.address.address;
                cep = response.data.person.address.cep;
                number = response.data.person.address.number;
                complement = response.data.person.address.complement;
                district = response.data.person.address.district;
                idCity = response.data.person.address.city_id;
            }

            setFormData({address, number, complement, district, cep, idCity});
            liberaTela();
        }

        getResponsibleData();
    }, [responsible_id, token]);

    async function handleSubmit(event, data) {
        event.preventDefault();
        bloqueiaTela();

        data.responsible_id = responsible_id;

        const {url, body, options} = STUDENT_POST(data, userLogged, token);
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
                if (response.statusText === 'OK') navigate('/conta/students');
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
        <FormPerson
            titulo={"Cadastro de Estudantes dependente de " + responsible_name}
            handleSubmit={handleSubmit}
            loading={loading}
            dados={formData}
            addPassword={false}
        />
    );
};

export default StudentCreate;
