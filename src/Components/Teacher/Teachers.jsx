import React, { useEffect, useState } from 'react';
import Head from '../Helper/Head';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Confirm } from "react-st-modal";

import styles from './Teachers.module.css';
import stylesBtn from '../Forms/Button.module.css';

import { TEACHER_DELETE, TEACHER_GET } from '../../API/Api_Teacher';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function getData() {
      const { url, options } = TEACHER_GET();
      //console.log(url, options)
      const response = await axios.get(url, options);
      //console.log(response.data)
      setTeachers(response.data);
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

  function formataCpf(cpf){
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return (
    <section className="animeLeft">
      <Head title="Professores" />
      <h1 className="title title-2">Professores</h1>
      <Link className={stylesBtn.button} to="createteacher">
        Cadastrar
      </Link>
      <div className={styles.teachers}>
        {teachers.map((teacher) => (
          <div key={String(teacher.id)} className={styles.list}>
            <span>{teacher.person.name}</span>

            <span>{formataCpf(teacher.person.cpf)}</span>
            <span>{teacher.status.description}</span>
            <div className={styles.buttons}>
              <Link to={`edit/${teacher.id}`}>
                <FaEdit size={16} style={{ color: 'blue' }} />
              </Link>
              <button
                onClick={() => {
                  modalConfirm(teacher.id, teacher.person.name);
                }}
              >
                <FaWindowClose size={16} style={{ color: 'red' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teachers;
