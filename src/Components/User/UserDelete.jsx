import React, { useEffect, useState } from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { USER_DELETE, USER_SHOW } from '../../API/Api_User';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const UserDelete = () => {
   
  const navigate = useNavigate();

  const { error} = React.useContext(UserContext);
  const [user, setUser] = useState('');


  const { loading } = useFetch();

        var params = window.location.href.substr(1).split('/');
        let userId = params[6];

    useEffect(() =>{ 
      async function getData(){

        const { url, options } = USER_SHOW(userId);
        const response = await axios.get(url, options);
        setUser(response.data);
      } 
      getData();
    },[userId]);


  async function confirm(event) {
    event.preventDefault();
    const { url, options } = USER_DELETE(user.id)
    const response = await axios.delete(url, options);

    if (response.statusText === 'OK') navigate("/conta/users");
  }

  async function cancel(event) {
    event.preventDefault();
    navigate('/conta/users');

  }


  

  return (
    <section className="animeLeft">

      <h1 className="title title-2">Deletar Usuário</h1>
  
        <label value={user.name}>Deseja inativar o usuário {user.name}?</label>
        {loading ? (
          <Button disabled>Confirmando...</Button>
        ) : (
          <Button onClick={confirm}>Confirmar</Button>
        )}

        {loading ? (
          <Button disabled>Cancelando...</Button>
        ) : (
          <Button onClick={cancel}>Cancelar</Button>
        )}

        
        <Error error={error && 'Login já existe.'} />

    </section>
  );
};

export default UserDelete;
