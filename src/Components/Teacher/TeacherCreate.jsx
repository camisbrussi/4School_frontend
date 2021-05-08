import React, { useState, useEffect }  from 'react';

import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Error from "../Helper/Error";
import { TEACHER_POST } from '../../API/Api_Teacher';
import axios from 'axios';
import FormPerson from '../Person/FormPerson';
import { Alert } from "react-st-modal";

const TeacherCreate = () => {
  const navigate = useNavigate();
  const { loading } = useFetch();

  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros]);

  async function handleSubmit(event, data) {
    event.preventDefault();

    const { url, body, options } = TEACHER_POST(data);
    const response = await axios.post(url, body, options)

    console.log(body);

    if (response.statusText === 'OK') {
      if (response.data.erros !== undefined && response.data.erros.length) {
        let erros = { msg: response.data.success, erros: [] };
        for (let i = 0; i < response.data.erros.length; i++) {
          erros.erros.push(response.data.erros[i]);
        }
        setObjErros(erros);
        modalError();
      } else {
        navigate('/conta/teachers');
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
    <FormPerson
      titulo="Cadastro de Professores"
      handleSubmit={handleSubmit}
      loading={loading}
      dados={{}}
      addPassword={true}
    />
  );
};

export default TeacherCreate;
