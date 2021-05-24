import React, {useCallback, useEffect, useState} from 'react';
import Head from '../Helper/Head';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Confirm } from 'react-st-modal';
import styles from './Teams.module.css';
import stylesBtn from '../Forms/Button.module.css';
import { TEAM_GET, TEAM_DELETE } from '../../API/Api_Team';
import axios from 'axios';
import { IoIosPeople } from 'react-icons/all';

import DataTable from "react-data-table-component";
import Filter from "../Tables/Filter";
import {status_turma} from "../Helper/Functions";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function getData() {
      const { url, options } = TEAM_GET();
      const response = await axios.get(url, options);
      let turmas = response.data;

      for (let i = 0; i < turmas.length; i++) {
        turmas[i].status_description = status_turma(turmas[i].status_id);
      }

      setTeams(turmas);
    }

    getData();
  }, []);

  async function modalConfirm(teamId, teamName) {
    const result = await Confirm(
      'Inativar o turma ' + teamName + '?',
      'Inativação de turmas'
    );
    if (result) {
      const { url, options } = TEAM_DELETE(teamId);
      await axios.delete(url, options);
      window.location.reload(false);
    }
  }

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = teams.filter(item => (
      (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.teacher.person.name && item.teacher.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
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
    {name:"Professor", selector:'teacher.person.name', sortable:true},
    {name:"Ano", selector:'year', sortable:true},
    {name:"Status", selector:'status_description', sortable:true}
  ];

  const createColumns = useCallback(() => {
    return [
      ...columns,
      {
        name: '',
        allowOverflow: true,
        maxWidth: '50px',
        cell: team => {
          return (
              <>
                <Link to={`addstudents?team=`+team.id +'&name='+team.name+'&year='+team.year} title="Gerenciar alunos">
                  <IoIosPeople size={16} style={{ color: 'green' }} className="mx-5" />
                </Link>
                <Link to={`edit/${team.id}`}>
                  <FaEdit size={16} style={{ color: 'blue' }} title="Editar" />
                </Link>
                <button onClick={() => { modalConfirm(team.id, team.name); }} className="cursor-pointer" title="Remover">
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
      <Head title="Team" />
      <h1 className="title title-2">Turmas</h1>
      <Link className={stylesBtn.button} to="createteam">
        Cadastrar
      </Link>
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

export default Teams;
