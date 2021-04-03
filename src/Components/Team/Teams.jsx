import React, { useEffect, useState } from 'react';
import Head from '../Helper/Head';
import { FaEdit, FaWindowClose } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import styles from './Teams.module.css'
import stylesBtn from '../Forms/Button.module.css';

import { TEAM_GET } from '../../API/Api_Team';
import axios from 'axios'
const Teams = () => {

  const [teams, setTeams] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(() =>{ 
    async function getData(){
      
      const { url, options } = TEAM_GET(token);
      const response = await axios.get(url, options);
      setTeams(response.data)
    } 
    getData();
  },[token]);



  return (
    <section className="animeLeft">
      <Head title="Team" />
      <h1 className="title title-2">Turmas</h1>
      <Link className={stylesBtn.button} to="createteam">Cadastrar</Link>
      <div className={styles.teams}>
      {teams.map(team => (
        
        <div key={String(team.id) } className={styles.list}>
          
            <span>{team.name}</span>
           
            
            <span>{team.teacher.person.name}</span>
            <span>{team.year}</span>
          <div className={styles.buttons}> 
            <Link 
              to={`edit/${team.id}`}>
                <FaEdit 
                size={16}
                style={{color: 'blue'}}/>
                </Link>
            <Link 
            to={`delete/${team.id}`}>
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

export default Teams;
