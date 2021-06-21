import React, { useState, useEffect } from 'react';
import styles from './Chat.module.css';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { type_user } from '../Helper/Functions'
import { WEB_SOCKET } from '../../API/Api_Chat'

var socket = io('http://177.44.248.32:8085', { transport : ['websocket'] });

const ServiceQueue = () => {
  const [connectionsUsers, setConnectionsUser] = useState([]);

  useEffect(() => {

    socket.emit("service_queue", (connections) => {
      setConnectionsUser(JSON.parse(connections));
    });
    
  }, [socket]);

    socket.on("admin_list_all_users", (connections) => {
      setConnectionsUser(JSON.parse(connections));
    });

  return (
    <section className="animeLeft">

{Object.keys(connectionsUsers).length >  0 ? (    <div >
    {connectionsUsers.map(connection => (
        
        <div key={String(connection.socket_id) } className={styles.list_users}>
          <span>Aguardando Atendimento: {connection.person.name} ({type_user(connection.person.type_id)})</span>
          <Link className={styles.btn_atd} to={`/chat/attendance/${connection.socket_id}`}  >Entrar em atendimento</Link>
        </div>
      ))}

    </div>):( <h1 className="title title-2">Não há atendimentos Pendentes</h1>) }

    </section>
  );
};

export default ServiceQueue;
