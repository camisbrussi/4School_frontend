import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

import { USER_PUT, USER_SHOW } from "../../API/Api_User";
import axios from "axios"

const UserEdit = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { error, loading } = React.useContext(UserContext);

  const token = window.localStorage.getItem('token');



  var params = window.location.href.substr(1).split("/");
  let userId = params[6];

  useEffect(() => {
    async function getData() {
      const { url, options } = USER_SHOW(userId, token);
      const response = await axios.get(url, options);
      setName(response.data.name);
      setLogin(response.data.login);
    }
    getData();
  }, [userId, token]);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, body, options } = USER_PUT(userId, {
      name,
      login,
      password,
    }, token);
    const response = await axios.put(url, body, options);
    if (response.statusText === 'OK') navigate("/conta/users");
  }

  return (
    <section className="animeLeft">
      <h1 className="title title-2">Editar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Login"
          type="login"
          name="login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {loading ? (
          <Button disabled>Salvando...</Button>
        ) : (
          <Button>Salvar</Button>
        )}
        <Error error={error && "Login já existe."} />
      </form>
    </section>
  );
};

export default UserEdit;
