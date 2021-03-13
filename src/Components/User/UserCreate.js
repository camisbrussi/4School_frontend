import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../Api_User';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
  const name = useForm();
  const login = useForm();
  const password = useForm();
  const navigate = useNavigate();


  const { loading, request } = useFetch();

  const { error } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      name: name.value,
      login: login.value,
      password: password.value,
    });
    const response = await request(url, options);

    if (response.json) navigate('/conta/users');
   
  }

  return (
    <section className="animeLeft">

      <h1 className="title title-2">Criar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="name" {...name} />
        <Input label="Login" type="login" name="login" {...login} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error && 'Login já existe.'} />
      </form>
    </section>
  );
};

export default UserCreate;
