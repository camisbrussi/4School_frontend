import React, { useCallback, useEffect, useState } from 'react';
import Head from '../Helper/Head';
import { FaEdit, FaWindowClose, FaUserGraduate } from 'react-icons/fa';
import { UserContext } from '../../Contexts/UserContext';
import { Link } from 'react-router-dom';
import { Confirm } from 'react-st-modal';
import styles from './Students.module.css';
import stylesBtn from '../Forms/Button.module.css';
import { STUDENT_GET, STUDENT_DELETE } from '../../API/Api_Student';
import axios from 'axios';

import DataTable from 'react-data-table-component';
import Filter from '../Tables/Filter';
import { formata_cpf } from '../Helper/Functions';

const Students = () => {
  const [students, setStudents] = useState([]);
  const responsible_id = new URL(window.location.href).searchParams.get(
    'responsible'
  );
  const { userLogged, token } = React.useContext(UserContext);

  useEffect(() => {
    async function getData() {
      let opcoes;
      if (responsible_id) opcoes = STUDENT_GET(responsible_id, token);
      else opcoes = STUDENT_GET(null, token);

      const { url, options } = opcoes;
      const response = await axios.get(url, options);
      let estudantes = response.data;

      for (let i = 0; i < estudantes.length; i++) {
        estudantes[i].person.cpf = formata_cpf(estudantes[i].person.cpf);
      }

      setStudents(estudantes);
    }

    if(Object.keys(token).length > 0) getData()
  }, [responsible_id, token]);

  async function modalConfirm(studentId, studentName) {
    const result = await Confirm(
      'Inativar o estudante ' + studentName + '?',
      'Inativação de estudante'
    );
    if (result) {
      const { url, options } = STUDENT_DELETE(studentId, userLogged, token);
      await axios.delete(url, options);
      window.location.reload(false);
    }
  }

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = students.filter(
    (item) =>
      (item.person.name &&
        item.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.person.cpf &&
        item.person.cpf.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.responsible.person.name &&
        item.responsible.person.name
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
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
    {
      name: 'Responsável',
      selector: 'responsible.person.name',
      sortable: true,
    },
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
                <FaUserGraduate size={16} style={{ color: 'grey' }} />
              ) : (
                <FaUserGraduate size={16} style={{ color: 'blue' }} />
              )}
            </>
          );
        },
      },
      ...columns,
      {
        name: '',
        allowOverflow: true,
        maxWidth: '50px',
        cell: (student) => {
          return (
            <>
              <Link to={`edit/${student.id}`}>
                <FaEdit size={16} style={{ color: 'black' }} title="Editar" 
                className="link"/>
              </Link>
              <button
                onClick={() => {
                  modalConfirm(student.id, student.person.name);
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
        <Head title="Estudantes" />
        <h1 className="title title-2">Estudantes</h1>
        {responsible_id ? (
          <Link
            className={stylesBtn.button}
            to={`createstudent?responsible=` + responsible_id}
          >
            Cadastrar
          </Link>
        ) : (
          <small>
            <b>
              <i>
                * O cadastro de novos estudantes deve ser feito através do
                cadastro de responsáveis
              </i>
            </b>
          </small>
        )}
      </header>

      <div className={styles.container100}>
        <p className={styles.list}>
          <span>Status:</span>
          <span>
            <FaUserGraduate size={16} style={{ color: 'gray' }} /> Inativo
          </span>
          <span>
            <FaUserGraduate size={16} style={{ color: 'blue' }} /> Ativo
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
      <div className={styles.students}>
        <DataTable
          title="Estudantes cadastrados"
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

export default Students;
