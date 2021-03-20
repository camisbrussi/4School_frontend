import React, { useEffect, useState } from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { TEAM_DELETE,  TEAM_SHOW} from '../../API/Api_Team';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const TeamDelete = () => {
   
  const navigate = useNavigate();

  const { loading, error } = useFetch();

  const token = window.localStorage.getItem('token');
  const [team, setTeam] = useState({});
   
  var params = window.location.href.substr(1).split('/');
  let teamId = params[6];

    useEffect(() =>{ 
      async function getData(){
        
        const { url, options } = TEAM_SHOW(teamId, token);
        const response = await axios.get(url, options);
        setTeam(response.data);
      } 
      getData();
    },[teamId, token]);


  async function confirm(event) {
    event.preventDefault();
    const { url, options } = TEAM_DELETE(team.id, token)
    const response = await axios.delete(url, options);

    if (response.statusText === 'OK') navigate("/conta/teams");
  }

  async function cancel(event) {
    event.preventDefault();
    navigate('/conta/teams');

  }

  return (
    <section className="animeLeft">

      <h1 className="title title-2">Deletar Atividade</h1>
     
        
        <label value={team.name}>Deseja deletar a classe {team.name}?</label>
        
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

export default TeamDelete;
