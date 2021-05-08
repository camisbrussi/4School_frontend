import React, { useEffect, useState } from 'react';

import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import { RESPONSIBLE_POST } from '../../API/Api_Responsible';
import axios from 'axios';
import FormPerson from '../Person/FormPerson';
import { Alert } from 'react-st-modal';
import Error from '../Helper/Error';

const ResponsibleCreate = () => {
  const navigate = useNavigate();
  const { loading } = useFetch();

  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros]);

  async function handleSubmit(event, data) {
    event.preventDefault();

    const { url, body, options } = RESPONSIBLE_POST(data);
    const response = await axios.post(url, body, options);

    if (response.statusText === 'OK') {
      if (response.data.erros !== undefined && response.data.erros.length) {
        let erros = { msg: response.data.success, erros: [] };
        for (let i = 0; i < response.data.erros.length; i++) {
          erros.erros.push(response.data.erros[i]);
        }
        setObjErros(erros);
        modalError();
      } else {
        if (response.statusText === 'OK')
          navigate(
            '/conta/students/createstudent?responsible=' +
              response.data.responsible_id
          );
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
    <FormPerson
      titulo="Cadastro de Responsáveis"
      handleSubmit={handleSubmit}
      loading={loading}
      dados={{}}
      addPassword={true}
    />
  );
};

export default ResponsibleCreate;
