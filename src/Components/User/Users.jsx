import React, { useEffect, useState } from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import styles from './User.module.css'
import stylesBtn from '../Forms/Button.module.css';

import { USER_GET } from '../../API/Api_User';
import axios from 'axios'

const Users = () => {

  const [users, setUsers] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(() =>{ 
    async function getData(){
      
      const { url, options } = USER_GET(token);
      const response = await axios.get(url, options);
      setUsers(response.data);
    } 
    getData();
  },[token]);


  function status(status) {
    if(status === 1){
      return 'Ativo';
    }
    if(status === 2){
      return 'Inativo';
    }
    if(status === 3){
      return 'Bloqueado';
    }
  }
  

  return (
    <section className="animeLeft">
 
      <h1 className="title title-2">Usuários</h1>
      <Link className={stylesBtn.button} to="createuser">Cadastrar</Link>
      <div className={styles.users}>
 
      {users.map(user => (
        
        <div key={String(user.id) } className={styles.list}>
            <span>{user.name}</span>
            <span>{user.login}</span>
            <span>{status(user.status_id)}</span>
          <div className={styles.buttons}> 
            <Link 
              to={`edit/${user.id}`}
              
              >
                <FaEdit 
                  size={16} 
                  style={{color: 'blue'}}
                />
            </Link>
            <Link
              to={`delete/${user.id}`}
              >
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

export default Users;
