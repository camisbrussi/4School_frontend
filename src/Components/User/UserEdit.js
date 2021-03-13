import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { USER_PUT } from "../../Api_User";
import useFetch from "../../Hooks/useFetch";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";

const UserEdit = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { error, loading } = React.useContext(UserContext);

  const { request } = useFetch();

  var params = window.location.href.substr(1).split("/");
  let userId = params[6];

  useEffect(() => {
    async function getData() {
      const userData = await axios.get(`http://localhost:3001/users/${userId}`);
      setName(userData.data.name);
      setLogin(userData.data.login);
    }
    getData();
  }, []);

  async function handleSubmit(event) {
    console.log(password)
    event.preventDefault();
    const { url, options } = USER_PUT(userId, {
      name,
      login,
      password,
    });
    const response = await request(url, options);

    if (response.json) navigate("/conta/users");
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
