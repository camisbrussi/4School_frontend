import React, {useState} from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';

import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom';

import styles from './TeacherCreate.module.css'

import {TEACHER_POST} from '../../API/Api_Teacher';
import axios from "axios";

const TeacherCreate = () => {
    const navigate = useNavigate();
    const {loading, error} = useFetch();

    const name = useForm();
    const cpf = useForm();
    const email = useForm();
    const birth_date = useForm();
    const [phones, setPhones] = useState([]);

    function addPhone(e) {
        e.preventDefault();

        let number = document.getElementById("number").value.replace(/\D/g, '');
        let is_whatsapp = document.getElementById("is_whatsapp").checked;

        if (number.length < 10 || number.length > 11) {
            //- Numero invalido
            console.log("Número de telefone inválido")
            return;
        }

        setPhones([...phones, {number, is_whatsapp}]);
        document.getElementById("number").value = "";
        document.getElementById("is_whatsapp").checked = false;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const token = window.localStorage.getItem('token');

        const {url, body, options} = TEACHER_POST({
            name: name.value,
            cpf: cpf.value,
            email: email.value,
            birth_date: birth_date.value,
            phones: phones
        }, token);
        const response = await axios.post(url, body, options);

        if (response.statusText === 'OK') navigate("/conta/teachers");
    }

    return (
        <section className="animeLeft">
            <h1 className="title title-2">Cadastrar Professor</h1>
            <form onSubmit={handleSubmit} className={styles.teacher}>
                <Input label="Nome" type="text" name="name" {...name} />
                <Input label="CPF" type="text" name="cpf" {...cpf} />
                <Input label="E-mail" type="email" name="email" {...email} />
                <Input label="Data de nascimento" type="date" name="birth_date" {...birth_date} />

                <div style={{width: "100%", float: "left"}}>
                    <div styl style={{width: "50%", float: "left"}}>
                        <Input label="Número" type="text" name="number" id="number"/>
                    </div>
                    <div style={{width: "25%", float: "left"}}>
                        <div className={styles.checkbox}>
                            <Input label="É WhatsApp?" type="checkbox" name="is_whatsapp" id="is_whatsapp"/>
                        </div>
                    </div>
                    <div style={{width: "25%", float: "left"}}>
                        <Button onClick={addPhone}>Add fone</Button>
                    </div>
                </div>

                <div style={{width: "100%", float: "left"}}>
                    {phones.map((v, k) => {
                        return (
                            <section key={k}>
                                <label>{v.number}</label>
                                <label>{v.is_whatsapp ? " - WhatsApp" : ""}</label>
                            </section>
                        );
                    })}
                </div>

                {loading ? (
                    <Button disabled>Cadastrando...</Button>
                ) : (
                    <Button>Cadastrar</Button>
                )}
                <Error error={error && 'Professor já existe.'}/>
            </form>
        </section>
    );
};

export default TeacherCreate;