import React, {useEffect, useState} from 'react';
import Head from '../Helper/Head';
import {FaEdit, FaWindowClose} from 'react-icons/fa'
import {Link} from 'react-router-dom';

import styles from './Teachers.module.css'
import stylesBtn from '../Forms/Button.module.css';

import {TEACHER_GET} from '../../API/Api_Teacher';
import axios from 'axios'

const Teachers = () => {

    const [teachers, setTeachers] = useState([]);


    useEffect(() => {
        async function getData() {
            const {url, options} = TEACHER_GET();
            //console.log(url, options)
            const response = await axios.get(url, options);
            //console.log(response.data)
            setTeachers(response.data)
        }

        getData();
    }, []);

    return (
        <section className="animeLeft">
            <Head title="Professores"/>
            <h1 className="title title-2">Professores</h1>
            <Link className={stylesBtn.button} to="createteacher">Cadastrar</Link>
            <div className={styles.teachers}>
                {teachers.map(teacher => (

                    <div key={String(teacher.id)} className={styles.list}>

                        <span>{teacher.person.name}</span>

                        <span>{teacher.person.cpf}</span>
                        <span>{teacher.status.description}</span>
                        <div className={styles.buttons}>
                            <Link
                                to={`edit/${teacher.id}`}>
                                <FaEdit
                                    size={16}
                                    style={{color: 'blue'}}/>
                            </Link>
                            <Link
                                to={`delete/${teacher.id}`}>
                                <FaWindowClose
                                    size={16}
                                    style={{color: 'red'}}/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Teachers;