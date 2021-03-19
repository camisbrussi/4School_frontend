import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./ActivityCreate.module.css";

import axios from "axios"
import { ACTIVITY_PUT, ACTIVITY_SHOW } from "../../API/Api_Activity";


const UserEdit = () => {
  const { loading, error } = useFetch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [generate_certificate, setGenerate_certificate] = useState(false);
  const [vacancies, setVacancies] = useState("");

  const token = window.localStorage.getItem('token');

  var params = window.location.href.substr(1).split("/");
  let id = params[6];

  useEffect(() => {
    async function getData() {

      const { url, options } = ACTIVITY_SHOW(id, token);
     
      const response = await axios.get(url, options);
      setName(response.data.name);
      setDescription(response.data.description);
      setStart(response.data.start);
      setEnd(response.data.end);
      setGenerate_certificate(response.data.generate_certificate);
      setVacancies(response.data.vacancies);
      
    }
    getData();
  }, [id, token]);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, body, options } = ACTIVITY_PUT(id, {
      name,
      description,
      start,
      end,
      generate_certificate,
      vacancies,
    }, token);
    const response = await axios.put(url, body, options);
    if (response.statusText === 'OK') navigate("/conta/activities");
  }

  function date(datetime) {
    if (datetime) var date = datetime.replace(/Z/, "");

    console.log(date);
    return date;
  }

  return (
    <section className="animeLeft">
      <h1 className="title title-2">Editar Atividade</h1>
      <form onSubmit={handleSubmit} className={styles.activity}>
        <Input
          label="Nome"
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Descrição"
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Input
          label="Inicio"
          type="datetime-local"
          name="start"
          value={date(start)}
          onChange={(e) => {
            setStart(e.target.value);
          }}
        />
        <Input
          label="Fim"
          type="datetime-local"
          name="end"
          value={date(end)}
          onChange={(e) => {
            setEnd(e.target.value);
          }}
        />
        <div className={styles.checkbox}>
          <Input
            label="Gera Certificado"
            type="checkbox"
            name="generate_certificate"
            checked={generate_certificate}
            onChange={(e) => {
              setGenerate_certificate(e.target.checked);
            }}
          />
        </div>
        <Input
          label="Vagas"
          type="number"
          name="vacancies"
          value={vacancies}
          onChange={(e) => {
            setVacancies(e.target.value);
          }}
        />
        {loading ? (
          <Button disabled>Salvando...</Button>
        ) : (
          <Button>Salvar</Button>
        )}
        <Error error={error && ""} />
      </form>
    </section>
  );
};

export default UserEdit;
