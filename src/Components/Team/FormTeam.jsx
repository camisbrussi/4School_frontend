import React, { useEffect, useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';

import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Contexts/UserContext';
import styles from './TeamCreate.module.css';

import axios from 'axios';
import { TEACHER_GET } from '../../API/Api_Teacher';
import Select from '../Forms/Select';

const FormTeam = ({titulo, handleSubmit, dados, addCheckAtivo}) => {
  const { loading, error } = useFetch();

  const [name, setName] = useState(dados.name ?? '');
  const [idTeacher] = useState(dados.teacherId ?? 0);
  const [teachers, setTeachers] = useState(dados.teacher ?? []);
  const [year, setYear] = useState(dados.year ?? '');
  const [isActive, setIsActive] = useState(dados.isActive ?? false);
  const { token } = React.useContext(UserContext);

  useEffect(() => {
    async function getData() {
      const { url, options } = TEACHER_GET(token);
      const response = await axios.get(url, options);
      setTeachers(response.data);
    }
    getData();
  }, [idTeacher, token]);

  useEffect(() => {
    var select = document.getElementById('teacher');
    teachers.map((teacher) =>
    addOption(teacher.id, teacher.person.name, idTeacher === teacher.id)
    );
    function addOption(id, name) {
      var option = new Option(name, id);
      select.add(option);
    }

    select.value = idTeacher;

  }, [teachers]);

  return (
    <section className="animeLeft">
      <h1 className="title title-2">{[titulo]}</h1>
      <form onSubmit={(e) => {
        var select = document.getElementById('teacher');
        var teacher_id = select.options[select.selectedIndex].value;
        handleSubmit(e, {
          name,
          teacher_id,
          year,
          isActive
        })
      }}>
        <Input
          label="Nome"
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Select label="Professor" name="teacher" />
        <Input
          label="Ano"
          type="number"
          name="year"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        {addCheckAtivo ? (
          <div className={styles.checkbox}>
            <Input
              label="Registro Ativo"
              type="checkbox"
              name="isActive"
              checked={isActive}
              onChange={(e) => {
                setIsActive(e.target.checked);
              }}
            />
          </div>
        ) : ''}

        {loading ? (
          <Button disabled>Salvando...</Button>
        ) : (
          <Button>Salvar</Button>
        )}
        <Error error={error && ''} />
      </form>
    </section>
  );
};

export default FormTeam;
