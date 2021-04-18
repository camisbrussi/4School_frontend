import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa'

import { Link } from 'react-router-dom';

import styles from './Logs.module.css'

import { INFO_GET } from '../../API/Api_Logs';
import axios from 'axios'

const Info = () => {

  const [infos, setInfos] = useState([]);


  useEffect(() =>{ 
    async function getData(){
      
      const { url, options } = INFO_GET();
      const response = await axios.get(url, options);
      setInfos(response.data);
    } 
    getData();
  },[]);

  return (
    <section className="animeLeft">
 
      <h1 className="title title-2">Auditoria de erros do sistema</h1>
      <div className={styles.logs}>
 
      {infos.map(info => (
        
        <div key={String(info) } className={styles.list}>
            <span>{info}</span>
            <Link 
              to={`/${info}`}
              
              >
                <FaEye 
                  size={16} 
                  style={{color: 'gray'}}
                />
            </Link>
        </div>
      ))}
      </div>
    </section>
  );
};

export default Info;
