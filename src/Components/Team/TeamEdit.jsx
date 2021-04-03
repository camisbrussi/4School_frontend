import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";

import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./TeamCreate.module.css";

import axios from "axios"
import { TEAM_PUT, TEAM_SHOW } from "../../API/Api_Team";
import { TEACHER_GET } from "../../API/Api_Teacher";
import Select from "../Forms/Select";


const TeamEdit = () => {
  const { loading, error } = useFetch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [idTeacher, setIdTeacher] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [year, setYear] = useState("");
  const [activeTeam, setActiveTeam] = useState(false);


  const token = window.localStorage.getItem('token');

  var params = window.location.href.substr(1).split("/");
  let id = params[6];
  let status_id = 2;

  useEffect(() => {
    async function getData() {
      const { url, options } = TEAM_SHOW(id, token);
      const response = await axios.get(url, options);
      setName(response.data.name);
      setIdTeacher(response.data.teacher.id)
      setYear(response.data.year);
      if(response.data.status_id === 1){
        setActiveTeam(response.data.status_id)
        }
        console.log(response)
    }
    getData();
  }, [id, idTeacher, token]);

  useEffect(() => {
    async function getData() {
      const { url, options } = TEACHER_GET(token);
      const response = await axios.get(url, options);
      setTeachers(response.data);
    }
    getData();
  }, [token, idTeacher]);

  useEffect(() => {   
    teachers.map(teacher => addOption(teacher.id, teacher.person.name, idTeacher===teacher.id))

    function addOption(id, name, selected) {
      var option = new Option(name, id, selected, selected);
     
      var select = document.getElementById("teacher");
      select.add(option);
    }
  }, [teachers, idTeacher]);


  async function handleSubmit(event) {
    event.preventDefault();

    var check = document.getElementsByName("active_team")[0].checked;
    if (check === true){
      status_id = 1;
    }
    
    var select = document.getElementById('teacher');
	  var teacher_id = select.options[select.selectedIndex].value;

    const { url, body, options } = TEAM_PUT(id, {
      status_id,
      name,
      teacher_id,
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
        <Select label="Professor" name="teacher" />
        <Input
            label="Ano"
            type="number"
          name="year"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        <div className={styles.checkbox}>
          <Input
            label="Turma Ativa"
            type="checkbox"
            name="active_team"
            checked={activeTeam}
            onChange={(e) => {
              setActiveTeam(e.target.checked);
            }}
          />
        </div>
    
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
