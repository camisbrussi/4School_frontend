import React, { useState, useEffect } from "react";
import Error from '../Helper/Error';
import { Alert } from 'react-st-modal';
import { UserContext } from '../../Contexts/UserContext';
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

import FormUser from './FormUser'

import { USER_POST } from "../../API/Api_User";
import axios from "axios";

const UserCreate = () => {
  const navigate = useNavigate();

  const { loading } = useFetch();
  const [objErros, setObjErros] = useState({});

  const { userLogged, token } = React.useContext(UserContext);

  useEffect(() => {
    modalError();
  }, [objErros]);

  async function handleSubmit(event, data) {
    event.preventDefault();
    const { url, body, options } = USER_POST(data, userLogged, token );
    const response = await axios.post(url, body, options);

    if (response.statusText === "OK") {
      if (response.data.erros !== undefined && response.data.erros.length) {
        let erros = { msg: response.data.success, erros: [] };
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
      setObjErros('');
    }
  }
  return (
    <FormUser
      titulo="Cadastro de Usuários"
      handleSubmit={handleSubmit}
      loading={loading}
      dados={{}}
       />
  );
};

export default UserCreate;
