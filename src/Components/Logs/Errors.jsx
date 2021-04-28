import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa'

import { Link } from 'react-router-dom';

import styles from './Logs.module.css'

import { ERROR_GET } from '../../API/Api_Logs';
import axios from 'axios'

const Error = () => {

  const [errors, setErrors] = useState([]);


  useEffect(() =>{ 
    async function getData(){
      
      const { url, options } = ERROR_GET();
      const response = await axios.get(url, options);
      console.log(response)
      setErrors(response.data);
    } 
    getData();
  },[]);
  

  return (
    <section className="animeLeft">
 
      <h1 className="title title-2">Logs de Erro do Sistema</h1>
      <div className={styles.logs}>
 
      {errors.map(error => (
        
        <div key={String(error) } className={styles.list}>
            <span>{error}</span>
            <div className={styles.buttons}> 
            <Link 
              to={`${error}`}
              
              >
                <FaEye 
                  size={16} 
                  style={{color: 'gray'}}
                />
            </Link>
            </div>
        </div>
      ))}
      </div>
    </section>
  );
};

export default Error;
