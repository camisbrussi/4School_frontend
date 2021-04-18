import React, { useEffect, useState } from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { ACTIVITY_DELETE,  ACTIVITY_SHOW} from '../../API/Api_Activity';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ActivityDelete = () => {
   
  const navigate = useNavigate();

  const { loading, error } = useFetch();


  const [activity, setactivitys] = useState({});
   
  var params = window.location.href.substr(1).split('/');
  let activityId = params[6];

    useEffect(() =>{ 
      async function getData(){
        
        const { url, options } = ACTIVITY_SHOW(activityId);
        const response = await axios.get(url, options);
        setactivitys(response.data);
      } 
      getData();
    },[activityId]);


  async function confirm(event) {
    event.preventDefault();
    const { url, options } = ACTIVITY_DELETE(activity.id)
    const response = await axios.delete(url, options);

    if (response.statusText === 'OK') navigate("/conta/activities");
  }

  async function cancel(event) {
    event.preventDefault();
    navigate('/conta/activities');

  }

  return (
    <section className="animeLeft">

      <h1 className="title title-2">Deletar Atividade</h1>
     
        
        <label value={activity.name}>Deseja deletar a atividade {activity.name}?</label>
        
        {loading ? (
          <Button disabled>Confirmar...</Button>
        ) : (
          <Button onClick={confirm}>Confirmar</Button>
        )}
        <Error error={error && ''} />

        {loading ? (
          <Button disabled>Cancelando...</Button>
        ) : (
          <Button onClick={cancel}>Cancelar</Button>
        )}


    </section>
  );
};

export default ActivityDelete;
