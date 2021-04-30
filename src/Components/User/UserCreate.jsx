import React, { useState } from 'react';
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
  const [objErros, setObjErros] = useState({});



  async function handleSubmit(event) {
    event.preventDefault();
    const { url, body, options } = USER_POST({
      name: name.value,
      login: login.value,
      password: password.value,
    });
    const response = await axios.post(url, body, options);

    if (response.statusText === "OK") {
      if (response.data.erros !== undefined && response.data.erros.length) {
          let erros = {msg: response.data.success, erros: []};
          for (let i = 0; i < response.data.erros.length; i++) {
              erros.erros.push(response.data.erros[i]);
          }
          setObjErros(erros);
      } else {
          navigate("/conta/users");
      }
  }
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
        <Error error={error && ""}/>
                {
                    Object.keys(objErros).length > 0 ?
                    (
                        <>
                            <b><Error error={objErros.msg}/></b>
                            {objErros.erros.map((val, key) => (<li key={key}><Error error={val}/></li>))}
                        </>
                        ) : ""
                }
      </form>
    </section>
  );
};

export default UserCreate;
