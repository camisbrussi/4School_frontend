import React, { useCallback, useEffect, useState } from 'react';
import Head from '../Helper/Head';
import { FaEdit, FaWindowClose, FaChalkboardTeacher } from 'react-icons/fa';
import { UserContext } from '../../Contexts/UserContext';
import { Link } from 'react-router-dom';
import { Confirm } from 'react-st-modal';
import styles from './Teachers.module.css';
import stylesBtn from '../Forms/Button.module.css';
import { TEACHER_DELETE, TEACHER_GET } from '../../API/Api_Teacher';
import axios from 'axios';

import DataTable from 'react-data-table-component';
import Filter from '../Tables/Filter';
import {bloqueiaTela, formata_cpf, liberaTela} from '../Helper/Functions';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  const { userLogged, token } = React.useContext(UserContext);

  useEffect(() => {
    async function getData() {
      bloqueiaTela();

      const { url, options } = TEACHER_GET(token);
      const response = await axios.get(url, options);
      let professores = response.data;

      for (let i = 0; i < professores.length; i++) {
        professores[i].person.cpf = formata_cpf(professores[i].person.cpf);
      }

      setTeachers(professores);

      liberaTela();
    }

    if(Object.keys(token).length > 0) getData()
  }, [token]);

  async function modalConfirm(teacherId, teacherName) {
    const result = await Confirm(
      'Inativar o professor ' + teacherName + '?',
      'Inativação de professor'
    );
    if (result) {
      bloqueiaTela();
      const { url, options } = TEACHER_DELETE(teacherId, userLogged, token);
      await axios.delete(url, options);
      liberaTela();
      window.location.reload(false);
    }
  }

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = teachers.filter(
    (item) =>
      (item.person.name &&
        item.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.person.cpf &&
        item.person.cpf.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.status.description &&
        item.status.description
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
    { name: 'Nome', selector: 'person.name', sortable: true },
    { name: 'CPF', selector: 'person.cpf', sortable: true },
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
              {row.status.id === 2 ? (
                <FaChalkboardTeacher size={16} style={{ color: 'grey' }} />
              ) : (
                <FaChalkboardTeacher size={16} style={{ color: 'blue' }} />
              )}
            </>
          );
        },
      },
      ...columns,
      {
        name: '',
        allowOverflow: true,
        maxWidth: '100px',
        width: '100px',
        cell: (teacher) => {
          return (
            <>
              <Link to={`edit/${teacher.id}`}>
                <FaEdit
                  size={16}
                  style={{ color: 'black' }}
                  title="Editar"
                  className="link"
                />
              </Link>
              <button
                onClick={() => {
                  modalConfirm(teacher.id, teacher.person.name);
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
        <Head title="Professores" />
        <h1 className="title title-2">Professores</h1>
        <Link className={stylesBtn.button} to="createteacher">
          Cadastrar
        </Link>
      </header>
      <div className={styles.container100}>
        <p className={styles.list}>
          <span>Status:</span>
          <span>
            <FaChalkboardTeacher size={16} style={{ color: 'gray' }} /> Inativo
          </span>
          <span>
            <FaChalkboardTeacher size={16} style={{ color: 'blue' }} /> Ativo
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
      <div className={styles.teachers}>
        <DataTable
          title="Professores cadastrados"
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

export default Teachers;
