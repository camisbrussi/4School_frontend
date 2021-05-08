import React, { useState } from "react";
import CardPhone from "./CardPhone";
import styles from "./Person.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useFetch from "../../Hooks/useFetch";

function FormPerson({titulo, handleSubmit, dados, addPassword, addCheckAtivo}) {
    const {loading, error} = useFetch();

    const [name, setName] = useState(dados.name ?? "");
    const [cpf, setCpf] = useState(dados.cpf ?? "");
    const [email, setEmail] = useState(dados.email ?? "");
    const [birth_date, setBirthDate] = useState(date(dados.birth_date ?? ""));
    const [password, setPassword] = useState("");
    const [phones, setPhones] = useState(dados.phones ?? []);
    const [isActive, setIsActive] = useState(dados.isActive ?? false);

    function addPhone(e) {
        e.preventDefault();

        let number = document.getElementById("number").value.replace(/\D/g, '');
        let is_whatsapp = document.getElementById("is_whatsapp").checked;

        if (number.length < 10 || number.length > 11) {
            //- Numero invalido
            console.log("Número de telefone inválido")
            return;
        }

        setPhones([...phones,{number,is_whatsapp}]);
        document.getElementById("number").value = "";
        document.getElementById("is_whatsapp").checked = false;
    }

    function removerPhone(k) {
        if (!window.confirm("Realmente deseja remover este número de telefone?")) {
            return;
        }
        let newStatePhones = [...phones];
        newStatePhones.splice(k,1);
        setPhones(newStatePhones);
    }

    function date(datetime) {
        if (datetime)
            return datetime.replace(/Z/, "");
        return null;
    }

    return (
        <section className="animeLeft">
            <h1 className="title title-2">{titulo}</h1>
            <form onSubmit={(e) => { handleSubmit(e,{name,cpf,email,birth_date,phones,password,isActive}) }} className={styles.person}>
                <Input label="Nome" type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}} />
                <Input label="CPF" type="text" name="cpf" value={cpf} mask="999.999.999-99" onChange={(e) => {setCpf(e.target.value)}} />
                <Input label="E-mail" type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <Input label="Data de nascimento" type="date" name="birth_date" value={birth_date} onChange={(e) => {setBirthDate(e.target.value)}} />

                {addPassword ? (
                    <Input label="Senha" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} />
                ) : ""}

                {addCheckAtivo ? (
                    <div className={styles.checkbox}>
                        <Input label="Registro Ativo" type="checkbox" name="isActive" checked={isActive}
                               onChange={(e) => { setIsActive(e.target.checked); }} />
                    </div>
                ) : ""}

                <div style={{width: "100%", float: "left"}}>
                    <div styl style={{width: "50%", float: "left"}}>
                        <Input label="Número" type="text" name="number" id="number" mask="(99) 9 9999-9999" />
                    </div>
                    <div style={{width: "25%", float: "left"}}>
                        <div className={styles.checkbox}>
                            <label style={{width:"100%", float:"left", margin:0}}>&nbsp;</label>
                            <label style={{width:"100%", float:"left", margin:0}}>&nbsp;</label>
                            <Input label="É WhatsApp?" type="checkbox" name="is_whatsapp" id="is_whatsapp"/>
                        </div>
                    </div>
                    <div style={{width: "25%", float: "left"}}>
                        <label style={{width:"100%", float:"left", margin:0}}>&nbsp;</label>
                        <Button onClick={addPhone}>Add fone</Button>
                    </div>
                </div>

                <div style={{width: "100%", float: "left"}}>
                    {phones.map((v,k) => {
                        return (
                            <CardPhone key={k} indice={k} number={v.number} is_whatsapp={v.is_whatsapp} removerPhone={removerPhone}/>
                        );
                    })}
                </div>

                {loading ? (
                    <Button disabled>Processando...</Button>
                ) : (
                    <Button>Salvar</Button>
                )}
                <Error error={error && 'Pessoa já existe.'}/>
            </form>
        </section>
    );
}

export default FormPerson;