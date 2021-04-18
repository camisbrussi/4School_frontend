import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Select from "../Forms/Select";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";

import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

import styles from "./TeamCreate.module.css";

import { TEAM_POST } from "../../API/Api_Team";
import { TEACHER_GET } from "../../API/Api_Teacher";
import axios from "axios";

const TeamCreate = () => {
  const name = useForm();
  const year = useForm();
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const { loading, error } = useFetch();

  useEffect(() => {
    async function getData() {
      const { url, options } = TEACHER_GET();
      const response = await axios.get(url, options);
      setTeachers(response.data);
    }
    getData();
  }, []);

  useEffect(() => {   
    teachers.map(teacher => addOption(teacher.id, teacher.person.name))

    function addOption(id, name) {
      var option = new Option(name, id);
     
      var select = document.getElementById("teacher");
      select.add(option);
    }
  }, [teachers]);

  async function handleSubmit(event) {
    event.preventDefault();

    const token = window.localStorage.getItem("token");
    
    var select = document.getElementById('teacher');
	  var teacher_id = select.options[select.selectedIndex].value;

    const { url, body, options } = TEAM_POST(
      {
        name: name.value,
        teacher_id,
        year: year.value,
      },
      token
    );
    const response = await axios.post(url, body, options);

    if (response.statusText === "OK") navigate("/conta/teams");
  }

  return (
    <section className="animeLeft">
      <h1 className="title title-2">Criar Turma</h1>
      <form onSubmit={handleSubmit} className={styles.team}>
        <Input label="Nome" type="text" name="name" {...name} />
        <Select label="Professor" name="teacher" {...teachers} />
        <Input label="Ano" type="number" name="year" {...year} />

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

export default TeamCreate;
