import React, {useCallback, useEffect, useState} from 'react';
import Head from '../Helper/Head';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Confirm } from "react-st-modal";
import styles from './Teachers.module.css';
import stylesBtn from '../Forms/Button.module.css';
import { TEACHER_DELETE, TEACHER_GET } from '../../API/Api_Teacher';
import axios from 'axios';

import DataTable from "react-data-table-component";
import Filter from "../Tables/Filter";
import {formata_cpf} from "../Helper/Functions";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function getData() {
      const { url, options } = TEACHER_GET();
      const response = await axios.get(url, options);
      let professores = response.data;

      for (let i = 0; i < professores.length; i++) {
        professores[i].person.cpf = formata_cpf(professores[i].person.cpf);
      }

      setTeachers(professores);
    }

    getData();
  }, []);

  async function modalConfirm(teacherId, teacherName) {
    const result = await Confirm(
      "Inativar o professor " + teacherName +"?",
      "Inativação de professor"
    );
    if (result) {
      const { url, options } = TEACHER_DELETE(teacherId);
      await axios.delete(url, options);
      window.location.reload(false);
    }
  }

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = teachers.filter(item => (
      (item.person.name && item.person.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.person.cpf && item.person.cpf.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.status.description && item.status.description.toLowerCase().includes(filterText.toLowerCase()))
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
    {name:"Nome", selector:'person.name', sortable:true},
    {name:"CPF", selector:'person.cpf', sortable:true},
    {name:"Status", selector:'status.description', sortable:true}
  ];

  const createColumns = useCallback(() => {
    return [
      ...columns,
      {
        name: '',
        allowOverflow: true,
        maxWidth: '50px',
        cell: teacher => {
          return (
              <>
                <Link to={`edit/${teacher.id}`}>
                  <FaEdit size={16} style={{ color: 'blue' }} title="Editar" />
                </Link>
                <button onClick={() => { modalConfirm(teacher.id, teacher.person.name); }} className="cursor-pointer" title="Remover" >
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
      <Head title="Professores" />
      <h1 className="title title-2">Professores</h1>
      <Link className={stylesBtn.button} to="createteacher">
        Cadastrar
      </Link>
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
