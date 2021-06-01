import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { Alert } from "react-st-modal";

import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

import styles from "./UserEdit.module.css";

import { USER_PUT, USER_SHOW } from "../../API/Api_User";
import axios from "axios"

const UserEdit = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [activeUser, setActiveUser] = useState(false);
  const [objErros, setObjErros] = useState({});

  const navigate = useNavigate();

  const { loading } = React.useContext(UserContext);

  var params = window.location.href.substr(1).split("/");
  let userId = params[6];
  let status_id = 2;

  useEffect(() => {
    modalError();
  }, [objErros]);


  useEffect(() => {
    async function getData() {
      const { url, options } = USER_SHOW(userId);
      const response = await axios.get(url, options);
      setName(response.data.name);
      setLogin(response.data.login);
      if(response.data.status_id === 1){
      setActiveUser(response.data.status_id)
      }
    }
    getData();
  }, [userId]);

  async function handleSubmit(event) {
    event.preventDefault();
    
    var check = document.getElementsByName("active_user")[0].checked;
    if (check === true){
      status_id = 1;
    }

    const { url, body, options } = USER_PUT(userId, {
      status_id,
      name,
      login,
      password,
    });

    const response = await axios.put(url, body, options);
    if (response.statusText === "OK") {
      if (response.data.erros !== undefined && response.data.erros.length) {
          let erros = {msg: response.data.success, erros: []};
          for (let i = 0; i < response.data.erros.length; i++) {
              erros.erros.push(response.data.erros[i]);
          }
          setObjErros(erros);
          modalError();
      } else {
          navigate("/conta/users");
      }
  }
}

async function modalError() {
  if (Object.keys(objErros).length > 0) {
    await Alert(
      objErros.erros.map((val, key) => (
        <li key={key}>
          <Error error={val} />
        </li>
      )),
      objErros.msg
    );
    setObjErros("");
  }
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
        <div className={styles.checkbox}>
          <Input
            label="Usuário Ativo"
            type="checkbox"
            name="active_user"
            checked={activeUser}
            onChange={(e) => {
              setActiveUser(e.target.checked);
            }}
          />
        </div>
        {loading ? (
          <Button disabled>Salvando...</Button>
        ) : (
          <Button>Salvar</Button>
        )}     
      </form>
    </section>
  );
};

export default UserEdit;