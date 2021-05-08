import React, { useEffect, useState } from 'react';
import Head from '../Helper/Head';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Confirm } from 'react-st-modal';

import styles from './Students.module.css';
import stylesBtn from '../Forms/Button.module.css';

import { STUDENT_GET, STUDENT_DELETE } from '../../API/Api_Student';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);

  const responsible_id = new URL(window.location.href).searchParams.get(
    'responsible'
  );

  useEffect(() => {
    async function getData() {
      let opcoes;
      if (responsible_id) opcoes = STUDENT_GET(responsible_id);
      else opcoes = STUDENT_GET();

      const { url, options } = opcoes;
      const response = await axios.get(url, options);
      setStudents(response.data);
    }

    getData();
  }, [responsible_id]);

  async function modalConfirm(studentId, studentName) {
    const result = await Confirm(
      'Inativar o estudante ' + studentName + '?',
      'Inativação de estudante'
    );
    if (result) {
      const { url, options } = STUDENT_DELETE(studentId);
      await axios.delete(url, options);
      window.location.reload(false);
    }
  }

  return (
    <section className="animeLeft">
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
      <div className={styles.students}>
        {students && students.length
          ? students.map((student) => (
              <div key={String(student.id)} className={styles.list}>
                <span>{student.person.name}</span>
                <span>{student.person.cpf}</span>
                <span>{student.responsible.person.name}</span>
                <span>{student.status.description}</span>
                <div className={styles.buttons}>
                  <Link to={`edit/${student.id}`}>
                    <FaEdit size={16} style={{ color: 'blue' }} />
                  </Link>
                  <button
                    onClick={() => {
                      modalConfirm(student.id, student.person.name);
                    }}
                  >
                    <FaWindowClose size={16} style={{ color: 'red' }} />
                  </button>
                </div>
              </div>
            ))
          : 'Nenhum estudante cadastrado'}
      </div>
    </section>
  );
};

export default Students;
