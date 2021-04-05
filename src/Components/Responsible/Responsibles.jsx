import React, {useEffect, useState} from 'react';
import Head from '../Helper/Head';
import {FaEdit, FaWindowClose} from 'react-icons/fa'
import {Link} from 'react-router-dom';

import styles from './Responsibles.module.css'
import stylesBtn from '../Forms/Button.module.css';

import {RESPONSIBLE_GET} from '../../API/Api_Responsible';
import axios from 'axios'
import {BsPersonPlusFill} from "react-icons/all";

const Responsibles = () => {

    const [responsibles, setResponsibles] = useState([]);
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        async function getData() {
            const {url, options} = RESPONSIBLE_GET(token);
            //console.log(url, options)
            const response = await axios.get(url, options);
            //console.log(response.data)
            setResponsibles(response.data)
        }

        getData();
    }, [token]);

    return (
        <section className="animeLeft">
            <Head title="Responsáveis"/>
            <h1 className="title title-2">Responsáveis</h1>
            <Link className={stylesBtn.button} to="createresponsible">Cadastrar</Link>
            <div className={styles.responsibles}>
                {responsibles.map(responsible => (

                    <div key={String(responsible.id)} className={styles.list}>

                        <span>{responsible.person.name}</span>

                        <span>{responsible.person.cpf}</span>
                        <div className={styles.buttons}>
                            <Link to={`../students/createstudent?responsible=` + responsible.id} title="Cadastrar estudante">
                                <BsPersonPlusFill size={16} style={{color: 'green'}}/>
                            </Link>

                            <Link to={`edit/${responsible.id}`}>
                                <FaEdit size={16} style={{color: 'blue'}}/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Responsibles;