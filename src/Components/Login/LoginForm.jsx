import React, {useState} from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import {UserContext} from '../../Contexts/UserContext';
import styles from './Login.module.css';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginForm = () => {
    const login = useForm();
    const password = useForm();
    const [type, setType] = useState(1);
    const [labelUserField,setLabelUserField] = useState("Usuário");

    const {userLogin, error, loading} = React.useContext(UserContext);

    async function handleSubmit(event) {
        event.preventDefault();

        if (login.validate() && password.validate()) {
            userLogin(login.value, password.value, type);
        }
    }

    return (
        <section className="animeLeft">
            <Head title="Login"/>
            <h1 className="title">Login</h1>
            <form onSubmit={handleSubmit} className={styles.formLogin}>
                <Input label={labelUserField} type="text" name="login" {...login} />
                <Input label="Senha:" type="password" name="password" {...password} />

                <label className="container50 mb-30"><input type="radio" name="tipoUsuario" onClick={() => {setLabelUserField("Usuário");setType(1);}} className="float-left" defaultChecked={true}/> Sou administrador</label>
                <label className="container50 mb-30"><input type="radio" name="tipoUsuario" onClick={() => {setLabelUserField("CPF");setType(2);}} className="float-left"/> Sou respons&aacute;vel/professor</label>

                {loading ? (
                    <Button disabled>Carregando...</Button>
                ) : (
                    <Button>Entrar</Button>
                )}
                <Error error={error && 'Dados incorretos.'}/>
            </form>
        </section>
    );
};

export default LoginForm;