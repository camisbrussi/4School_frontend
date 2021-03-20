import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./TeamCreate.module.css";

import axios from "axios"
import { TEAM_PUT, TEAM_SHOW } from "../../API/Api_Team";


const TeamEdit = () => {
  const { loading, error } = useFetch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [year, setYear] = useState("");


  const token = window.localStorage.getItem('token');

  var params = window.location.href.substr(1).split("/");
  let id = params[6];

  useEffect(() => {
    async function getData() {

      const { url, options } = TEAM_SHOW(id, token);
     
      const response = await axios.get(url, options);
      setName(response.data.name);
      setTeacher(response.data.description);
      setYear(response.data.start);
    }
    getData();
  }, [id, token]);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, body, options } = TEAM_PUT(id, {
      name,
      teacher,
      year,
    }, token);
    const response = await axios.put(url, body, options);
    if (response.statusText === 'OK') navigate("/conta/teams");
  }


  return (
    <section className="animeLeft">
      <h1 className="title title-2">Editar Classe</h1>
      <form onSubmit={handleSubmit} className={styles.team}>
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
          label="Professor"
          type="text"
          name="description"
          value={teacher}
          onChange={(e) => {
            setTeacher(e.target.value);
          }}
        />
        <Input
          label="Inicio"
          type="datetime-local"
          name="start"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
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

export default TeamEdit;
