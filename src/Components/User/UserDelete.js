import React, { useEffect, useState } from 'react';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { USER_DELETE } from '../../Api_User';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from "../../services/axios";

const UserDelete = () => {
   
  const navigate = useNavigate();

  const { error} = React.useContext(UserContext);
  const [user, setUsers] = useState({});

  const { request, loading } = useFetch();


    useEffect(() =>{ 
      async function getData(){
        var params = window.location.href.substr(1).split('/');
        let userId = params[6];
        const userdata = await axios.get(`http://localhost:3001/users/${userId}`);
        setUsers(userdata.data)
      } 
      getData();
    },[]);


  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_DELETE(user.id)
    const response = await request(url, options);

    if (response.json) navigate('/conta/users');
  }

  console.log('name'+user.name)

  return (
    <section className="animeLeft">

      <h1 className="title title-2">Deletar Usuário</h1>
      <form onSubmit={handleSubmit}>
        
        <label value={user.name}>Deseja inativar o usuário {user.name}?</label>
        
        {loading ? (
          <Button disabled>Confirmar...</Button>
        ) : (
          <Button>Confirmar</Button>
        )}
        <Error error={error && 'Login já existe.'} />
      </form>
    </section>
  );
};

export default UserDelete;
