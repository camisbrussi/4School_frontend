import React, {useEffect, useState} from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

import useFetch from "../../Hooks/useFetch";
import {useNavigate} from "react-router-dom";
import styles from "./TeacherCreate.module.css";

import axios from "axios"
import {TEACHER_PUT, TEACHER_SHOW} from "../../API/Api_Teacher";

const TeacherEdit = () => {
    const {loading, error} = useFetch();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [birth_date, setBirthDate] = useState("");
    const [phones, setPhones] = useState([]);

    const token = window.localStorage.getItem('token');

    var params = window.location.href.substr(1).split("/");
    let id = params[6];

    useEffect(() => {
        async function getData() {

            const {url, options} = TEACHER_SHOW(id, token);

            const response = await axios.get(url, options);
            console.log(response.data);

            setName(response.data.person.name);
            setCpf(response.data.person.cpf);
            setEmail(response.data.person.email);
            setBirthDate(response.data.person.birth_date);
            if (response.data.person.phones.length) {
                for (let i = 0; i < response.data.person.phones.length; i++) {
                    let number = response.data.person.phones[i].number;
                    let is_whatsapp = response.data.person.phones[i].is_whatsapp;

                    setPhones([...phones, {number, is_whatsapp}]);
                    // console.log(...phones);
                    // console.log({number, is_whatsapp});

                    // console.log(number, is_whatsapp);
                    // console.log(phones);
                    // console.log(...phones);
                    // setPhones([...phones, {number, is_whatsapp}]);
                }
            }
        }

        getData();
    }, [id, token]);

    async function handleSubmit(event) {
        event.preventDefault();
        const {url, body, options} = TEACHER_PUT(id, {
            name,
            cpf,
            email,
            birth_date,
            phones
        }, token);
        const response = await axios.put(url, body, options);
        if (response.statusText === 'OK') navigate("/conta/teachers");
    }

    function date(datetime) {
        if (datetime) var date = datetime.replace(/Z/, "");
        return date;
    }

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

    return (
        <section className="animeLeft">
            <h1 className="title title-2">Editar Professor</h1>
            <form onSubmit={handleSubmit} className={styles.teacher}>
                <Input label="Nome" type="text" name="name" value={name} onChange={(e) => {
                    setName(e.target.value)
                }}/>
                <Input label="CPF" type="text" name="cpf" value={cpf} onChange={(e) => {
                    setCpf(e.target.value)
                }}/>
                <Input label="E-mail" type="email" name="email" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
                <Input label="Data de nascimento" type="date" name="birth_date" value={date(birth_date)}
                       onChange={(e) => {
                           setBirthDate(e.target.value)
                       }}/>

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
                    <Button disabled>Salvando...</Button>
                ) : (
                    <Button>Salvar</Button>
                )}
                <Error error={error && ""}/>
            </form>
        </section>
    );
};

export default TeacherEdit;
