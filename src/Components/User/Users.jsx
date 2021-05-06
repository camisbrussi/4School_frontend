import React, { useEffect, useState } from "react";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Confirm } from "react-st-modal";

import styles from "./User.module.css";
import stylesBtn from "../Forms/Button.module.css";

import { USER_GET, USER_DELETE } from "../../API/Api_User";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getData() {
      const { url, options } = USER_GET();
      const response = await axios.get(url, options);
      setUsers(response.data);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const { url, options } = USER_GET();
      const response = await axios.get(url, options);
      setUsers(response.data);
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
    if (status === 3) {
      return "Bloqueado";
    }
  }

  async function modalConfirm(UserId, UserName) {
    const result = await Confirm(
      "Inativar o usuário " + UserName +"?",
      "Inativação de usuário"
    );
    if (result) {
      const { url, options } = USER_DELETE(UserId);
      const response = await axios.delete(url, options);
      window.location.reload(false);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title title-2">Usuários</h1>
      <Link className={stylesBtn.button} to="createuser">
        Cadastrar
      </Link>
      <div className={styles.users}>
        {users.map((user) => (
          <div key={String(user.id)} className={styles.list}>
            <span>{user.name}</span>
            <span>{user.login}</span>
            <span>{status(user.status_id)}</span>
            <div className={styles.buttons}>
              <Link to={`edit/${user.id}`}>
                <FaEdit size={16} style={{ color: "blue" }} />
              </Link>
              <button onClick={ () => {modalConfirm(user.id, user.name ) } }>
                <FaWindowClose size={16} style={{ color: "red" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Users;
