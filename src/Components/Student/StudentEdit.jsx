import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import axios from 'axios';
import { STUDENT_PUT, STUDENT_SHOW } from '../../API/Api_Student';
import FormPerson from '../Person/FormPerson';
import { Alert } from 'react-st-modal';
import Error from '../Helper/Error';

const StudentEdit = () => {
  const navigate = useNavigate();

  var params = window.location.href.substr(1).split('/');
  let id = params[6];

  const [dados, setDados] = useState({});
  const [podeAtualziar, setPodeAtualizar] = useState(false);

  const [objErros, setObjErros] = useState({});

  const { userLogged, token } = React.useContext(UserContext);

  useEffect(() => {
    modalError();
  }, [objErros]);

  useEffect(() => {
    async function getData() {
      const { url, options } = STUDENT_SHOW(id, token);
      const response = await axios.get(url, options);

      let name = response.data.person.name;
      let cpf = response.data.person.cpf;
      let email = response.data.person.email;
      let birth_date = response.data.person.birth_date;
      let address = response.data.person.address.address;
      let cep = response.data.person.address.cep;
      let number = response.data.person.address.number;
      let complement = response.data.person.address.complement;
      let district = response.data.person.address.district;
      let idCity = response.data.person.address.city_id;
      let isActive = response.data.status.id === 1;
      let phones = [];

      if (response.data.person.phones.length) {
        phones = [...response.data.person.phones];
      }

      setDados({ name, cpf, email, birth_date, phones, address, number, complement, district, cep, idCity, isActive });
      setPodeAtualizar(true);
    }

    getData();
  }, [id, token]);

  async function handleSubmit(event, data) {
    event.preventDefault();
    const { url, body, options } = STUDENT_PUT(id, data, userLogged, token);
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
        if (response.statusText === 'OK') navigate('/conta/students');
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
      titulo="Editar Estudante"
      handleSubmit={handleSubmit}
      dados={dados}
      addPassword={false}
      addCheckAtivo={true}
    />
  ) : null;
};

export default StudentEdit;
