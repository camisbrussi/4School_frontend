import React, { useState, useEffect } from 'react';
import Error from '../Helper/Error';
import { Alert } from "react-st-modal";

import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import { ACTIVITY_POST } from '../../API/Api_Activity';
import axios from "axios";

import FormActivity from './FormActivity'

const ActivityCreate = () => {
  const navigate = useNavigate();
  const { loading } = useFetch();

  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros, modalError]);

  async function handleSubmit(event, data) {
    event.preventDefault();
    const { url, body, options } = ACTIVITY_POST(data);
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
        navigate("/conta/activities");
      }
    }
  }

  async function modalError() {
    let result;
    if (Object.keys(objErros).length > 0) {
      result = await Alert(
        objErros.erros.map((val, key) => (
          <li key={key}>
            <Error error={val} />
          </li>
        )),
        objErros.msg
      );
      setObjErros("")
    }
  }

  return (
   <FormActivity
      titulo="Cadastro de Atividades"
      handleSubmit={handleSubmit}
      loading={loading}
      dados={{}}
   />
  );
};

export default ActivityCreate;
