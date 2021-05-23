import React, { useEffect, useState, useCallback } from "react";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Confirm } from "react-st-modal";
import styles from "./User.module.css";
import stylesBtn from "../Forms/Button.module.css";
import { USER_GET, USER_DELETE } from "../../API/Api_User";
import axios from "axios";

import DataTable from "react-data-table-component";
import Filter from "../Tables/Filter";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getData() {
      const { url, options } = USER_GET();
      const response = await axios.get(url, options);
      let usuarios = response.data;

      for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].status_description = status(usuarios[i].status_id);
      }

      setUsers(usuarios);
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
      await axios.delete(url, options);
      window.location.reload(false);
    }
  }

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = users.filter(item => (
      (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.login && item.login.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.status_description && item.status_description.toLowerCase().includes(filterText.toLowerCase()))
  ));

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return <Filter onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {name:"Nome", selector:'name', sortable:true},
    {name:"Usuário", selector:'login', sortable:true},
    {name:"Status", selector:'status_description', sortable:true}
  ];

  const mergedColumns = columns.map(col => {
    return col;
  });

  const createColumns = useCallback(() => {
    return [
      ...mergedColumns,
      {
        name: '',
        allowOverflow: true,
        maxWidth: '30px',
        cell: row => {
            return (
                <>
                  <Link to={`edit/${row.id}`}>
                    <FaEdit size={16} style={{ color: "blue" }} />
                  </Link>
                  <button onClick={ () => {modalConfirm(row.id, row.name ) } }>
                    <FaWindowClose size={16} style={{ color: "red" }} />
                  </button>
                </>
            );
        },
      },
    ];
  }, [mergedColumns]);

  return (
    <section className="animeLeft">
      <h1 className="title title-2">Usuários</h1>
      <Link className={stylesBtn.button} to="createuser">
        Cadastrar
      </Link>
      <div className={styles.users}>
        <DataTable
            title="Usuários cadastrados"
            columns={createColumns()}
            data={filteredItems}
            pagination
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
        />
      </div>
    </section>
  );
};

export default Users;
