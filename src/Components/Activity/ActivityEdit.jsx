import React, { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { Alert } from "react-st-modal";

import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./ActivityCreate.module.css";

import axios from "axios";
import { ACTIVITY_PUT, ACTIVITY_SHOW } from "../../API/Api_Activity";

const ActivityEdit = () => {
  const { loading, error } = useFetch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [generate_certificate, setGenerate_certificate] = useState(false);
  const [vacancies, setVacancies] = useState("");
  const [activeActivity, setActiveActivity] = useState(false);

  const [objErros, setObjErros] = useState({});

  useEffect(() => {
    modalError();
  }, [objErros]);

  var params = window.location.href.substr(1).split("/");
  let id = params[6];
  let status_id = 2;

  useEffect(() => {
    async function getData() {
      const { url, options } = ACTIVITY_SHOW(id);
      const response = await axios.get(url, options);
      setName(response.data.name);
      setDescription(response.data.description);
      setStart(response.data.start);
      setEnd(response.data.end);
      setGenerate_certificate(response.data.generate_certificate);
      setVacancies(response.data.vacancies);
      if (response.data.status_id === 1) {
        setActiveActivity(response.data.status_id);
      }
    }
    getData();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    var check = document.getElementsByName("active_ativity")[0].checked;
    if (check === true) {
      status_id = 1;
    }

    const { url, body, options } = ACTIVITY_PUT(
      id,
      {
        status_id,
        name,
        description,
        start,
        end,
        generate_certificate,
        vacancies,
      },
    );
    const response = await axios.put(url, body, options);
   
    if (response.statusText === "OK") {
      if (response.data.erros !== undefined && response.data.erros.length) {
        let erros = { msg: response.data.success, erros: [] };
        for (let i = 0; i < response.data.erros.length; i++) {
          erros.erros.push(response.data.erros[i]);
        }
        setObjErros(erros);
        modalError();
      } else {
        navigate("/conta/users");
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
      setObjErros("");
    }
  }

  function date(datetime) {
    if (datetime) var date = datetime.replace(/Z/, "");
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
        <div className={styles.checkbox}>
          <Input
            label="Atividade Ativa"
            type="checkbox"
            name="active_ativity"
            checked={activeActivity}
            onChange={(e) => {
              setActiveActivity(e.target.checked);
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

export default ActivityEdit;
