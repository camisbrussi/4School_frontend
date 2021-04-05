import React, {useEffect, useState} from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import {STUDENT_DELETE, STUDENT_SHOW} from '../../API/Api_Student';
import useFetch from '../../Hooks/useFetch';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const StudentDelete = () => {

    const navigate = useNavigate();

    const {loading, error} = useFetch();

    const token = window.localStorage.getItem('token');
    const [student, setStudents] = useState({});

    var params = window.location.href.substr(1).split('/');
    let studentId = params[6];

    useEffect(() => {
        async function getData() {

            const {url, options} = STUDENT_SHOW(studentId, token);
            const response = await axios.get(url, options);
            setStudents(response.data);
        }

        getData();
    }, [studentId, token]);


    async function confirm(event) {
        event.preventDefault();
        const {url, options} = STUDENT_DELETE(student.id, token)
        const response = await axios.delete(url, options);

        if (response.statusText === 'OK') navigate("/conta/students");
    }

    async function cancel(event) {
        event.preventDefault();
        navigate('/conta/students');

    }

    return (
        <section className="animeLeft">

            <h1 className="title title-2">Inativar Estudante</h1>


            <label value={student.name}>Deseja inativar o estudante {student.name}?</label>

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

export default StudentDelete;
