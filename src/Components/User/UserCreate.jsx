import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';

import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';


import { USER_POST } from '../../API/Api_User';
import axios from "axios";

const UserCreate = () => {
  const name = useForm();
  const login = useForm();
  const password = useForm();
  const navigate = useNavigate();

  const { loading } = useFetch();

  const { error } = React.useContext(UserContext);
  const token = window.localStorage.getItem('token');

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, body, options } = USER_POST({
      name: name.value,
      login: login.value,
      password: password.value,
    }, token);
    const response = await axios.post(url, body, options);
    if (response.statusText === 'OK') navigate("/conta/users");
  }

  return (
    <section className="animeLeft">

      <h1 className="title title-2">Criar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="name" {...name} />
        <Input label="Login" type="login" name="login" {...login} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error && 'Login já existe.'} />
      </form>
    </section>
  );
};

export default UserCreate;
