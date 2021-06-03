import React, { useEffect, useState } from "react";
import { Alert } from "react-st-modal";
import Error from '../Helper/Error';
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { USER_PUT, USER_SHOW } from "../../API/Api_User";
import axios from "axios"
import FormUser from "./FormUser";

const UserEdit = () => {
  const navigate = useNavigate();
  const [dados, setDados] = useState('');
  const [podeAtualizar, setPodeAtualizar] = useState(false);

  var params = window.location.href.substr(1).split("/");
  let id = params[6];

  const [objErros, setObjErros] = useState({});

  const { userLogged, token } = React.useContext(UserContext);

  useEffect(() => {
    modalError();
  }, [objErros]);


  useEffect(() => {
    async function getData() {
      const { url, options } = USER_SHOW(id, token);
      const response = await axios.get(url, options);

      let name = response.data.name;
      let login = response.data.login;
      let password = response.data.password;
      let isActive = response.data.status_id === 1;

      setDados({name, login, password, isActive});
      setPodeAtualizar(true);
    }
    getData();
  }, [id, token]);

  async function handleSubmit(event, data) {
    event.preventDefault();
    const { url, body, options } = USER_PUT(id, data, userLogged, token);
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

  return podeAtualizar ?(
      <FormUser 
        titulo="Editar Usuário"
        handleSubmit={handleSubmit}
        dados={dados}
      />
    ) : null;
};

export default UserEdit;