import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { TEACHER_PUT, TEACHER_SHOW } from '../../API/Api_Teacher';
import FormPerson from '../Person/FormPerson';
import { Alert } from "react-st-modal";
import Error from "../Helper/Error";

const TeacherEdit = () => {
  const navigate = useNavigate();

  var params = window.location.href.substr(1).split('/');
  let id = params[6];

  const [dados, setDados] = useState({});
  const [podeAtualziar, setPodeAtualizar] = useState(false);

  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros]);

  useEffect(() => {
    async function getData() {
      const { url, options } = TEACHER_SHOW(id);
      const response = await axios.get(url, options);

      let name = response.data.person.name;
      let cpf = response.data.person.cpf;
      let email = response.data.person.email;
      let birth_date = response.data.person.birth_date;
      let isActive = response.data.status_id === 1;
      let phones = [];

      if (response.data.person.phones.length) {
        phones = [...response.data.person.phones];
      }

      setDados({ name, cpf, email, birth_date, phones, isActive });
      setPodeAtualizar(true);
    }

    getData();
  }, [id]);

  async function handleSubmit(event, data) {
    event.preventDefault();
    const { url, body, options } = TEACHER_PUT(id, data);
    const response = await axios.put(url, body, options);
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
      setObjErros('');
    }
  }

  return podeAtualziar ? (
    <FormPerson
      titulo="Editar Professor"
      handleSubmit={handleSubmit}
      dados={dados}
      addPassword={true}
      addCheckAtivo={true}
    />
  ) : null;
};

export default TeacherEdit;
