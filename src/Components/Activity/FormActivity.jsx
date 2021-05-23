import React, { useState, useEffect } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { Alert } from 'react-st-modal';

import useFetch from '../../Hooks/useFetch';

import styles from './FormActivity.module.css';

const FormActivity = ({ titulo, handleSubmit, dados, addCheckAtivo, disabled }) => {
  const { loading } = useFetch();

  const [name, setName] = useState(dados.name ?? '');
  const [description, setDescription] = useState(dados.description ?? '');
  const [start, setStart] = useState(dados.start ?? '');
  const [end, setEnd] = useState(dados.end ?? '');
  const [generate_certificate, setGenerateCertificate] = useState(
    dados.generate_certificate ?? false
  );
  const [vacancies, setVacancies] = useState(dados.vacancies ?? '');
  const [isActive, setIsActive] = useState(dados.isActive ?? false);

  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros, modalError]);

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

  function date(datetime) {
    if (datetime) var date = datetime.replace(/Z/, "");
    return date;
  }

  return (
    <section className="animeLeft">
      <h1 className="title title-2">{[titulo]}</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e, {
            name,
            description,
            start,
            end,
            vacancies,
            generate_certificate,
            isActive,
          });
        }}
        className={styles.activity}
      >
        <Input
          label="Nome"
          type="text"
          name="name"
          value={name}
          disabled={disabled}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Descrição"
          type="text"
          name="description"
          value={description}
          disabled={disabled}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Input
          label="Inicio"
          type="datetime-local"
          name="start"
          value={date(start)}
          disabled={disabled}
          onChange={(e) => {
            setStart(e.target.value);
          }}
        />
        <Input
          label="Fim"
          type="datetime-local"
          name="end"
          value={date(end)}
          disabled={disabled}
          onChange={(e) => {
            setEnd(e.target.value);
          }}
        />
        {!disabled ? (
        <div className={styles.checkbox}>
          <Input
            label="Gera Certificado"
            type="checkbox"
            name="generate_certificate"
            checked={generate_certificate}
            onChange={(e) => {
              setGenerateCertificate(e.target.checked);
            }}
          />
        </div>): (
          ''
        )}
        <Input
          label="Vagas"
          type="number"
          name="vacancies"
          value={vacancies}
          disabled={disabled}
          onChange={(e) => {
            setVacancies(e.target.value);
          }}
        />

          {addCheckAtivo ? (
          <div className={styles.checkbox}>
            <Input
              label="Registro Ativo"
              type="checkbox"
              name="isActive"
              checked={isActive}
              onChange={(e) => {
                setIsActive(e.target.checked);
              }}
            />
          </div>
        ) : (
          ''
        )}

        {loading ? (
          <Button disabled>Processando...</Button>
        ) : (disabled ? (
          <Button>Voltar</Button>
        ) : <Button>Salvar</Button>
        )}
      </form>
    </section>
  );
};

export default FormActivity;
