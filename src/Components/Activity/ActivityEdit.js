import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { ACTIVITY_PUT } from "../../Api_Activity";
import useFetch from "../../Hooks/useFetch";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";

import styles from "./ActivityCreate.module.css";

const UserEdit = () => {
  const { loading, request, error } = useFetch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [generate_certificate, setGenerate_certificate] = useState(false);
  const [vacancies, setVacancies] = useState("");

  var params = window.location.href.substr(1).split("/");
  let id = params[6];

  useEffect(() => {
    async function getData() {
     
      const activityData = await axios.get(
        `http://localhost:3002/activities/${id}`
      );
      setName(activityData.data.name);
      setDescription(activityData.data.description);
      setStart(activityData.data.start);
      setEnd(activityData.data.end);
      setGenerate_certificate(activityData.data.generate_certificate);
      setVacancies(activityData.data.vacancies);
      
    }
    getData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = ACTIVITY_PUT(id, {
      name,
      description,
      start,
      end,
      generate_certificate,
      vacancies,
    });
    const response = await request(url, options);

    if (response.json) navigate("/conta/activities");
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
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error && ""} />
      </form>
    </section>
  );
};

export default UserEdit;
