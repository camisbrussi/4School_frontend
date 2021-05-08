import React, { useEffect, useState } from "react";
import Head from "../Helper/Head";
import { FaClipboardList, FaEdit, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Confirm } from "react-st-modal";

import styles from "./Activities.module.css";
import stylesBtn from "../Forms/Button.module.css";

import { ACTIVITY_GET, ACTIVITY_DELETE } from "../../API/Api_Activity";
import axios from "axios";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getData() {
      const { url, options } = ACTIVITY_GET();

      const response = await axios.get(url, options);
      setActivities(response.data);
    }

    getData();
  }, []);

  function status(status) {
    if (status === 1) {
      return "Ativo";
    }
    if (status === 2) {
      return "Inativo";
    }
  }

  function date(datetime) {
    var date = new Date(datetime);

    return date.toLocaleString("pt-BR");
  }

  async function modalConfirm(ActivityId, ActivityName) {
    const result = await Confirm(
      "Inativar a atividade " + ActivityName + "?",
      "Inativação de atividade"
    );
    if (result) {
      const { url, options } = ACTIVITY_DELETE(ActivityId);
      await axios.delete(url, options);
      window.location.reload(false);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Atividades" />
      <h1 className="title title-2">Atividades</h1>
      <Link className={stylesBtn.button} to="createactivity">
        Cadastrar
      </Link>
      <div className={styles.activities}>
        {activities.map((activity) => (
          <div key={String(activity.id)} className={styles.list}>
            <span>{activity.name}</span>

            <span>{date(activity.start)}</span>
            <span>{date(activity.end)}</span>
            <span>{status(activity.status_id)}</span>
            <div className={styles.buttons}>
              <Link
                to={`participants?activity=${activity.id}&name=${activity.name}`}
              >
                <FaClipboardList
                  size={16}
                  style={{ color: "green" }}
                  title="Participantes"
                />
              </Link>
              <Link to={`edit/${activity.id}`}>
                <FaEdit size={16} style={{ color: "blue" }} />
              </Link>
              <button
                onClick={() => {
                  modalConfirm(activity.id, activity.name);
                }}
              >
                <FaWindowClose size={16} style={{ color: "red" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
