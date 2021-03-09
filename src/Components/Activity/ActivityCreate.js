import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';
import Head from '../Helper/Head';
import useFetch from '../../Hooks/useFetch';
import styles from './ActivityCreate.module.css';

const ActivityCreate = () => {
  const name = useForm();
  const description = useForm();
  const start = useForm();
  const end = useForm();
  const generate_certificate = useForm();
  const vacancies = useForm();

  async function handleSubmit(event) {
    event.preventDefault();
  }

  const { loading, error, request } = useFetch();

  return (
    <section className="animeLeft">
      <Head title="Crie uma atividade" />

      <form onSubmit={handleSubmit} className={styles.activityCreate}>
        <Input label="Atividade" type="text" name="atividade" {...name} />
        <Input label="Descrição" type="text-area" name="description" {...description} />
        <Input label="Início" type="date" name="start" {...start} />
        <Input label="Fim" type="date" name="" {...end} />
        <Input label="Vagas" type="text" name="" {...vacancies} className={styles.checkbox} />
        <Input label="Gera Certificado?" type="checkbox" name="" {...generate_certificate} />
       
        
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default ActivityCreate;
