import React, {useCallback, useEffect, useState} from 'react';
import Head from '../Helper/Head';
import { FaUsers, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Teams.module.css';
import { TEAMS_GET_TEACHER } from '../../API/Api_Team';
import axios from 'axios';
import { IoIosPeople } from 'react-icons/all';

import DataTable from "react-data-table-component";
import Filter from "../Tables/Filter";
import {status_turma} from "../Helper/Functions";

const TeamsTeacher = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function getData() {
      const { url, options } = TEAMS_GET_TEACHER();
      const response = await axios.get(url, options);
      let turmas = response.data;

      for (let i = 0; i < turmas.length; i++) {
        turmas[i].status_description = status_turma(turmas[i].status_id);
      }
      setTeams(turmas);
    }
    getData();
  }, []);

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = teams.filter(item => (
      (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.year && item.year.toString().toLowerCase().includes(filterText.toLowerCase())) ||
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
    {name:"Ano", selector:'year', sortable:true},
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
              {row.status_id == 2 ? (
                <FaUsers size={16} style={{ color: 'grey' }} />
              ) : (
                <FaUsers size={16} style={{ color: 'blue' }} />
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
        cell: team => {
          return (
              <>
              <Link to={`/teams/participants?team=${team.id}&name=${team.name}&year=${team.year}`} title="Gerenciar alunos">
                  <IoIosPeople size={16} style={{ color: 'green' }} className="mx-5 link" />
                </Link>
                <Link to={`edit/${team.id}`}>
                  <FaEnvelope size={16} style={{ color: 'black' }} title="Editar"className="link" />
                </Link>
              </>
          );
        },
      },
    ];
  }, [columns]);

  return (
    <section className="animeLeft">
       <header className={styles.header}>
      <Head title="Team" />
      <h1 className="title title-2">Turmas</h1>
      </header>

      <div className={styles.container100}>
        <p className={styles.list}>
          <span>Status:</span>
          <span>
            <FaUsers size={16} style={{ color: 'gray' }} /> Inativa
          </span>
          <span>
            <FaUsers size={16} style={{ color: 'blue' }} /> Ativa
          </span>
        </p>
      </div>
      <div className={styles.container100}>
        <p className={styles.list}>
          <span>Menu:</span>
          <span>
            <IoIosPeople size={16} style={{ color: 'green' }} /> Visualizar Alunos
          </span>
          <span>
            <FaEnvelope size={16} style={{ color: 'black' }} /> Enviar Email para os responsáveis
          </span>
        </p>
      </div>
      <div className={styles.teams}>
        <DataTable
            title="Turmas cadastradas"
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

export default TeamsTeacher;
