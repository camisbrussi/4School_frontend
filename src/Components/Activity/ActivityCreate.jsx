import React, { useState, useEffect } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';
import { Alert } from "react-st-modal";

import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import styles from './ActivityCreate.module.css'

import { ACTIVITY_POST } from '../../API/Api_Activity';
import axios from "axios";

const ActivityCreate = () => {
  const name = useForm();
  const description = useForm(false);
  const start = useForm();
  const end = useForm();
  let generate_certificate = 0;
  const vacancies = useForm(false);
  const navigate = useNavigate();

  const { loading } = useFetch();

  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros, modalError]);

  async function handleSubmit(event) {
    event.preventDefault();
    var check = document.getElementsByName("generate_certificate")[0].checked;

    if (check === true){
      generate_certificate = 1;
    }

    const { url, body, options } = ACTIVITY_POST({
      name: name.value,
      description: description.value,
      start: start.value,
      end: end.value,
      generate_certificate: generate_certificate,
      vacancies: vacancies.value,
    });
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
    <section className="animeLeft">

      <h1 className="title title-2">Criar Atividade</h1>
      <form onSubmit={handleSubmit} className={styles.activity}>
        <Input label="Nome" type="text" name="name" {...name} />
        <Input label="Descrição" type="text" name="description" {...description} />
        <Input label="Inicio" type="datetime-local" name="start" {...start} />
        <Input label="Fim" type="datetime-local" name="end" {...end} />
        <div className={styles.checkbox}>
        <Input label="Gera Certificado" type="checkbox" name="generate_certificate"/>
        </div>
        <Input label="Vagas" type="number" name="vacancies" {...vacancies} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
      </form>
    </section>
  );
};

export default ActivityCreate;
