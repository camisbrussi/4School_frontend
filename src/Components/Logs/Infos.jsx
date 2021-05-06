import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import { Link } from "react-router-dom";
import Button from "../Forms/Button";

import styles from "./Logs.module.css";

import { INFO_GET, INFO_FILTER } from "../../API/Api_Logs";
import axios from "axios";

const Info = () => {
  const [infos, setInfos] = useState([]);
  const start = useForm();
  const end = useForm();

  useEffect(() => {
    async function getData() {
      const { url, options } = INFO_GET();
      const response = await axios.get(url, options);
      setInfos(response.data);
    }
    getData();
  }, []);

  function date(date) {
    date = date.split(".");
    date = new Date(date[0]);

    let options = { year: "numeric", month: "2-digit", day: "2-digit" };

    date.setHours(date.getHours() + 3);


    return date.toLocaleString("pt-BR", options);
  }

  async function filtraLogs(){
  
    const token = window.localStorage.getItem("token");
        const {url, body, options} = INFO_FILTER(
            {
              start :start.value,
              end: end.value
            },
            token
        );
        const response = await axios.post(url, body, options);
        setInfos(response.data);
  }

  return (
    <section className="animeLeft">
      <h1 className="title title-2">Auditoria de erros do sistema</h1>
      <div className={styles.logs}>
        <h3 className="mb-5">Filtro</h3>
        <div className={styles.container40}>
          <Input label="Inicio" type="date" name="start" {...start} />
        </div>
        <div className={styles.container40}>
          <Input label="Fim" type="date" name="end" {...end} />
        </div>
        <div className={styles.container20}>
          <label>&nbsp;</label>
          <Button type="button" onClick={filtraLogs}>
            Filtrar
          </Button>
        </div>
        <div className={[styles.container100, "mt-30"].join(" ")}>
          {infos.map((info) => (
            <div key={String(info)} className={styles.list}>
              <span>{date(info)}</span>
              <Link to={`${info}`}>
                <FaEye size={16} style={{ color: "gray" }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;
