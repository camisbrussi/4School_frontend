import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';

import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import styles from './TeamCreate.module.css'

import { TEAM_POST } from '../../API/Api_Team';
import axios from "axios";

const TeamCreate = () => {
  const name = useForm();
  const teacher = useForm();
  const year = useForm();
  const navigate = useNavigate();

  const { loading, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
   
    const token = window.localStorage.getItem('token');

    const { url, body, options } = TEAM_POST({
      name: name.value,
      teacher: teacher.value,
      year: year.value,
    }, token);
    const response = await axios.post(url, body, options);
    
    if (response.statusText === 'OK') navigate("/conta/teams");
   
  }

  return (
    <section className="animeLeft">

      <h1 className="title title-2">Criar Classe</h1>
      <form onSubmit={handleSubmit} className={styles.team}>
        <Input label="Nome" type="text" name="name" {...name} />
        <Input label="Professor" type="select" name="teacher" {...teacher} /> 
        <Input label="Ano" type="text" name="year" {...year} />
        
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error && ''} />
      </form>
    </section>
  );
};

export default TeamCreate;
