import React, {useEffect, useState} from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import {TEACHER_DELETE, TEACHER_SHOW} from '../../API/Api_Teacher';
import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const TeacherDelete = () => {

    const navigate = useNavigate();

    const {loading, error} = useFetch();

   
    const [teacher, setTeachers] = useState({});

    var params = window.location.href.substr(1).split('/');
    let teacherId = params[6];

    useEffect(() => {
        async function getData() {

            const {url, options} = TEACHER_SHOW(teacherId);
            const response = await axios.get(url, options);
            setTeachers(response.data);
        }

        getData();
    }, [teacherId]);


    async function confirm(event) {
        event.preventDefault();
        const {url, options} = TEACHER_DELETE(teacher.id)
        const response = await axios.delete(url, options);

        if (response.statusText === 'OK') navigate("/conta/teachers");
    }

    async function cancel(event) {
        event.preventDefault();
        navigate('/conta/teachers');

    }

    return (
        <section className="animeLeft">

            <h1 className="title title-2">Inativar Professor</h1>


            <label value={teacher.name}>Deseja inativar o professor {teacher.name}?</label>

            {loading ? (
                <Button disabled>Processando...</Button>
            ) : (
                <Button onClick={confirm}>Confirmar</Button>
            )}
            <Error error={error && ''}/>

            {loading ? (
                <Button disabled>Cancelando...</Button>
            ) : (
                <Button onClick={cancel}>Cancelar</Button>
            )}
        </section>
    );
};

export default TeacherDelete;
