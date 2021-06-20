import React, { useState, useEffect } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import styles from './Chat.module.css';
import io from 'socket.io-client';
import { FiSend } from 'react-icons/all'

var socket = io('http://localhost:3005', { transport: ['websocket'] });

const ChatAdmin = () => {
  const { userLogged } = React.useContext(UserContext);
  const [connection, setConnection] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  var params_url = window.location.href.substr(1).split('/');
  let socket_id = params_url[5];

  useEffect(() => {
    var objDiv = document.getElementById("div_chat");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages]);

  
  useEffect(() => {
    function getData() {
      const params = {
        user_id: userLogged.id,
        socket_id
      };
      socket.emit('admin_user_in_support', params, (connection) => {
        setConnection(JSON.parse(connection));        
      });
      
      socket.emit('admin_list_messages_by_user', params, (messages) => {
        setMessages(JSON.parse(messages));
      }); 
    }
    if (Object.keys(userLogged).length > 0) getData();
  }, [userLogged]);

  socket.on('admin_receive_message', (messages) => {
    setMessages(JSON.parse(messages));
   });

  function sendMessage(e) {
    e.preventDefault();
    const params = {
      socket_id: connection.socket_id,
      text,
    };
    socket.emit("admin_send_to_client", params, (messages) => {
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
            <span>Em Atendimento ... </span>
            <div className="icon_close" ></div>
          </div>

          <div className={styles.text_support} id="div_chat">
            
              {messages.map((message) => (
                <div key={String(message.id)}>
                  {!message.user_id ? (
                  <div className={styles.client}>
                      <span>{message.person.name}</span>
                      <span className={`${styles.client} ${styles.message}`}>
                        {message.text}
                      </span>
                    </div>
                  ) : (
                    <div className={styles.admin}>
                      <span className={styles.admin_name}>{message.user.name}</span>
                      <span className={`${styles.admin} ${styles.message}`}>
                      {message.text}
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatAdmin;
