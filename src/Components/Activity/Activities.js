import React, { useEffect, useState } from 'react';
import Head from '../Helper/Head';
import { FaEdit, FaWindowClose } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import styles from './Activities.module.css'
import stylesBtn from '../Forms/Button.module.css';

import { ACTIVITY_GET } from '../../API/Api_Activity';
import axios from 'axios'
const Activities = () => {

  const [activities, setActivities] = useState([]);
 const token = window.localStorage.getItem('token');

  useEffect(() =>{ 
    async function getData(){
      
      const { url, options } = ACTIVITY_GET(token);
      console.log(url, options)
      const response = await axios.get(url, options);
      console.log('ATIVIDADE'+response)
      setActivities(response.data)
    } 
    getData();
  },[ token]);

  function date(datetime){
    var date = new Date(datetime)

    return date.toLocaleString('pt-BR')
  }



  return (
    <section className="animeLeft">
      <Head title="Atividades" />
      <h1 className="title title-2">Atividades</h1>
      <Link className={stylesBtn.button} to="createactivity">Cadastrar</Link>
      <div className={styles.activities}>
      {activities.map(activity => (
        
        <div key={String(activity.id) } className={styles.list}>
          
            <span>{activity.name}</span>

            <span>{date(activity.start)}</span>
            <span>{date(activity.end)}</span>
          <div className={styles.buttons}> 
            <Link 
              to={`edit/${activity.id}`}>
                <FaEdit 
                size={16}
                style={{color: 'blue'}}/>
                </Link>
            <Link 
            to={`delete/${activity.id}`}>
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

export default Activities;
