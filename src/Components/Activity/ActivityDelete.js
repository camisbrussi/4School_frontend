import React, { useEffect, useState } from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { ACTIVITY_DELETE } from '../../Api_Activity';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from "../../services/axios";

const ActivityDelete = () => {
   
  const navigate = useNavigate();

  const { request, loading, error } = useFetch();

  
  const [activity, setactivitys] = useState({});

    useEffect(() =>{ 
      async function getData(){
        var params = window.location.href.substr(1).split('/');
        let activityId = params[6];
        const activitydata = await axios.get(`http://localhost:3002/activities/${activityId}`);
        setactivitys(activitydata.data)
      } 
      getData();
    },[]);


  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = ACTIVITY_DELETE(activity.id)
    const response = await request(url, options);

    if (response.json) navigate('/conta/activities');
  }

  console.log('name'+activity.name)

  return (
    <section className="animeLeft">

      <h1 className="title title-2">Deletar Atividade</h1>
      <form onSubmit={handleSubmit}>
        
        <label value={activity.name}>Deseja deletar a atividade {activity.name}?</label>
        
        {loading ? (
          <Button disabled>Confirmar...</Button>
        ) : (
          <Button>Confirmar</Button>
        )}
        <Error error={error && ''} />
      </form>
    </section>
  );
};

export default ActivityDelete;
