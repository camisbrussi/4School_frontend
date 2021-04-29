import React, { useEffect, useState } from 'react';

import { INFO_SHOW } from '../../API/Api_Logs';
import axios from 'axios'

import styles from './Logs.module.css'


const InfoShow = () => {
    const [infos, setInfos] = useState([]);

    var params = window.location.href.substr(1).split("/");
    let arquive = params[5];

  useEffect(() =>{ 
    async function getData(){
      
      const { url, options } = INFO_SHOW(arquive);
      const response = await axios.get(url, options);
      console.log(response.data)
      setInfos(response.data);
    } 
    getData();
  },[arquive]);


  function replaceData(info){
    let infoFormated = info.replace('",', '\n');
    infoFormated = infoFormated.replace('"', '');
    if(info){
    let temp = infoFormated.split(" |");

    infoFormated = `${date(temp[0])} - ${temp[1]}`
    }

    return infoFormated
  }

  function formatTitle(arquive){
    var title = arquive.split(".");
    console.log(arquive)
   
    return date(title[0]);
  }

  function date(datetime){
    var date = new Date(datetime)
  
    let options = { year: "numeric", month: "2-digit", day: "2-digit" };

    date.setHours(date.getHours() + 3);

    return date.toLocaleString("pt-BR", options);
  }
  


  return (
    <section className="animeLeft">
 
      <h1 className="title title-2">{formatTitle(arquive)}</h1>
 
      {infos.map(info => (
        
        <div key={ String(info) } className={styles.show}>
            <span>{replaceData(info)}</span>
           
              
        </div>
      ))}
    </section>
  );
};

export default InfoShow;
