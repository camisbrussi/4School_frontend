import React, {useEffect, useState} from 'react';
import Head from '../Helper/Head';
import {FaUserPlus, FaWindowClose} from 'react-icons/fa'
import {Link} from 'react-router-dom';

import styles from './Activities.module.css'
import stylesBtn from '../Forms/Button.module.css';

import {
    ACTIVITY_DELETE_SUBSCRIPTION,
    ACTIVITY_GET_PARTICIPANTS,
} from '../../API/Api_Activity';
import axios from 'axios'

const ActivityParticipants = () => {
    const activity_id = new URL(window.location.href).searchParams.get("activity");
    const activity_name = new URL(window.location.href).searchParams.get("name");
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        async function getData() {
            const {url, options} = ACTIVITY_GET_PARTICIPANTS(activity_id);
            const response = await axios.get(url, options);
            setParticipants(response.data)
        }

        getData();
    }, []);

    async function removerParticipante(id){
        if (!window.confirm("Deseja realmente remover essa inscrição?"))
            return;

        const token = window.localStorage.getItem("token");
        const {url, options} = ACTIVITY_DELETE_SUBSCRIPTION(id,token);

        const response = await axios.delete(url,options);
        if (response.statusText === "OK") {
            for (let i = 0; i < participants.length; i++){
                if (participants[i].id === id) {
                    let participantes = [...participants];
                    participantes.splice(i,1);
                    setParticipants(participantes);
                    break;
                }
            }
        }
    }

    return (
        <section className="animeLeft">
            <Head title="Participantes"/>
            <h1 className="title title-2">Participantes de {activity_name}</h1>
            <Link className={stylesBtn.button} to={`activityaddparticipants?activity=${activity_id}&name=${activity_name}`}><FaUserPlus size={16}/> Adicionar Participantes</Link>
            {/*<Link className={[stylesBtn.button,"mr-10"].join(" ")} to={`activityaddteacher?activity=${activity_id}&name=${activity_name}`}><FaUserPlus size={16}/> Professor</Link>*/}
            {/*<Link className={[stylesBtn.button,"mr-10"].join(" ")} to="activityaddteam"><FaUserPlus size={16}/> Turma</Link>*/}
            {/*<Link className={[stylesBtn.button,"mr-10"].join(" ")} to="activityaddstudent"><FaUserPlus size={16}/> Aluno</Link>*/}
            {/*<Link className={[stylesBtn.button,"mr-10"].join(" ")} to="activityaddresponsible"><FaUserPlus size={16}/> Respons&aacute;vel</Link>*/}
            <div className={styles.activities}>
                {participants.map(participant => (

                    <div key={String(participant.id)} className={styles.list}>
                        <span>{participant.person.name}</span>
                        <span>{participant.person.type.description}</span>
                        <span>{participant.person.email}</span>
                        {/*<span>{date(participant.registration_date)}</span>*/}
                        {/*<span>{participant.number_tickets}</span>*/}

                        <div className={styles.buttons}>
                            <a onClick={() => {removerParticipante(participant.id)}}>
                                <FaWindowClose size={16} style={{color: 'red'}}/>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ActivityParticipants;
