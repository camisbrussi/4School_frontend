import React, { useState, useEffect } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { FiSend } from 'react-icons/all'
import io from 'socket.io-client';
import styles from './Chat.module.css';

var socket = io('http://localhost:3005', { transport: ['websocket'] });
socket.on('connect', () =>
  console.log('[IO] Connect => A new connection has been established')
);

const ChatUser = () => {
  const { userLogged } = React.useContext(UserContext);
  const [connection, setConnection] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [socketAdmin, setSocketAdmin] = useState(null);
  const [messages, setMessages] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    var objDiv = document.getElementById("div_chat");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);
 

  useEffect(() => {
    function getData() {
        const params = {
          person_id: userLogged.id,
        };

        socket.emit('client_access', params, (connection) => {
        setConnection(JSON.parse(connection));
       });

       socket.emit('client_list_all_messages', params, (messages) => {
        setMessages(JSON.parse(messages));
      });
    
       socket.on('client_in_support', (connection)  => {
        if((JSON.parse(connection).user))
        setAdmin(JSON.parse(connection).user);
    });
    
  }
    if (Object.keys(userLogged).length > 0) getData();
  }, [userLogged]);

  socket.on('client_receive_message', (data) => {
    console.log(JSON.parse(data));
    setMessages(JSON.parse(data).messages);
    setSocketAdmin(JSON.parse(data).socket_id);
   });

  function sendMessage(e){
    e.preventDefault();
    const params = {
      socket_id_admin: socketAdmin,
      socket_id: connection.socket_id,
      text,
    };
    socket.emit("client_send_to_admin", params, (messages) => {
      setMessages(JSON.parse(messages));
    });
    setText("");
  }

  return (
    <section className="animeLeft">
      <div
        className={`${styles.chat} ${styles.chat_support}`}
        id="chat_in_support"
      >
        <div className="chat_interno">
          <div className={styles.in_support_header}>
            <span>Em que podemos lhe ajudar ... </span>
            <div className="icon_close"></div>
          </div>

          <div className={styles.text_support} id="div_chat">
            {messages ? (
              <>
                {messages.map((message) => (
                  <div key={String(message.id)}>
                    {!message.user_id ? (
                      <div className={styles.client}>
                        <span>Você</span>
                        <span className={`${styles.client} ${styles.message}`}>
                          {message.text}
                        </span>
                      </div>
                    ) : (
                      <div className={styles.admin}>
                        <span className={styles.admin_name}>
                          {message.user.name}
                        </span>
                        <span className={`${styles.admin} ${styles.message}`}>
                          {message.text}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              ''
            )}
          </div>
          {admin ? (<>
            <form onSubmit={(e) => {sendMessage(e)}}>
            <div className={styles.message_send}>
              <input
                type="text"
                name="text"
                value={text}
                placeholder="Digite sua mensagem aqui"
                id="message_user"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
                <button><FiSend size={25}/></button>

            </div>
          </form></>) : (<> <span>Aguarde por um atendente...</span></>)}

        </div>
      </div>
    </section>
  );
};

export default ChatUser;
