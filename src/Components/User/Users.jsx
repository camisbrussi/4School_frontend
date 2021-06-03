import React, { useEffect, useState, useCallback } from 'react';
import { FaEdit, FaWindowClose, FaUserAlt } from 'react-icons/fa';
import { UserContext } from '../../Contexts/UserContext';
import { Link } from 'react-router-dom';
import { Confirm } from 'react-st-modal';
import styles from './User.module.css';
import stylesBtn from '../Forms/Button.module.css';
import { USER_GET, USER_DELETE } from '../../API/Api_User';
import axios from 'axios';

import DataTable from 'react-data-table-component';
import Filter from '../Tables/Filter';
import { status_usuario } from '../Helper/Functions';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { userLogged, token } = React.useContext(UserContext);
  
  useEffect(() => {
    async function getData() {
      const { url, options } = USER_GET(token);
      const response = await axios.get(url, options);
      let usuarios = response.data;

      for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].status_description = status_usuario(usuarios[i].status_id);
      }
      setUsers(usuarios);
    }
    
    if(Object.keys(token).length > 0) getData()
    
  }, [token]);


  async function modalConfirm(UserId, UserName) {
    const result = await Confirm(
      'Inativar o usuário ' + UserName + '?',
      'Inativação de usuário'
    );
    console.log(result);
    if (result) {
      const { url, options } = USER_DELETE(UserId, userLogged, token);
      await axios.delete(url, options);
      window.location.reload(false);
    }
  }

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = users.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.login &&
        item.login.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.status_description &&
        item.status_description
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <Filter
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    { name: 'Nome', selector: 'name', sortable: true },
    { name: 'Usuário', selector: 'login', sortable: true },
  ];

  const createColumns = useCallback(() => {
    return [
      {
        name: '',
        allowOverflow: true,
        maxWidth: '5px',
        cell: (row) => {
          return (
            <>
              {row.status_id === 2 ? (
                <FaUserAlt size={16} style={{ color: 'grey' }} title="Editar" />
              ) : (
                <FaUserAlt size={16} style={{ color: 'blue' }} title="Editar" />
              )}
            </>
          );
        },
      },
      ...columns,
      {
        name: '',
        allowOverflow: true,
        maxWidth: '30px',
        cell: (row) => {
          return (
            <>
              <Link to={`edit/${row.id}`}>
                <FaEdit size={16} style={{ color: 'black' }} title="Editar" />
              </Link>
              <button
                onClick={() => {
                  modalConfirm(row.id, row.name);
                }}
                className="cursor-pointer"
                title="Remover"
              >
                <FaWindowClose size={16} style={{ color: 'red' }} />
              </button>
            </>
          );
        },
      },
    ];
  }, [columns]);

  return (
    <section className="animeLeft">
      <header className={styles.header}>
        <h1 className="title title-2">Usuários</h1>
        <Link className={stylesBtn.button} to="createuser">
          Cadastrar
        </Link>
      </header>
      <div className={styles.container100}>
        <p className={styles.list}>
          <span>Status:</span>
          <span>
            <FaUserAlt size={16} style={{ color: 'gray' }} /> Inativo
          </span>
          <span>
            <FaUserAlt size={16} style={{ color: 'blue' }} /> Ativo
          </span>
        </p>
      </div>
      <div className={styles.container100}>
        <p className={styles.list}>
          <span>Menu:</span>
          <span>
            <FaEdit size={16} style={{ color: 'black' }} /> Editar
          </span>
          <span>
            <FaWindowClose size={16} style={{ color: 'red' }} /> Excluir
          </span>
        </p>
      </div>

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
