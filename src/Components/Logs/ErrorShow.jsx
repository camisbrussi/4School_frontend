import React, { useEffect, useState } from 'react';

import { ERROR_SHOW } from '../../API/Api_Logs';
import axios from 'axios'

const ErrorShow = () => {

  const [errors, setErrors] = useState([]);

  var params = window.location.href.substr(1).split("/");
  let arquive = params[5];


  useEffect(() =>{ 
    async function getData(){
      
      const { url, options } = ERROR_SHOW(arquive);
      const response = await axios.get(url, options);
      console.log(response)
      setErrors(response.data);
    } 
    getData();
  },[arquive]);
  


  return (
    <section className="animeLeft">
 
      <h1 className="title title-2">{arquive}</h1>
 
      {errors.map(error => (
        
        <div key={String(error) }>
            <span>{error.replace(',', '\n')}</span>
           
              
        </div>
      ))}
    </section>
  );
};

export default ErrorShow;
