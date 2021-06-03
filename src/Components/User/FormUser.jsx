import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from './UserForm.module.css';
import useFetch from '../../Hooks/useFetch';

const FormUser = ({ titulo, handleSubmit, dados }) => {
  const { loading } = useFetch();

  const [name, setName] = useState(dados.name ?? '');
  const [login, setLogin] = useState(dados.login ?? '');
  const [password, setPassword] = useState(dados.password ?? '');
  const [isActive, setIsActive] = useState(dados.isActive ?? false);

  return (
    <section className="animeLeft">
      <h1 className="title title-2">{[titulo]}</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e, {
            name,
            login,
            password,
            isActive,
          });
        }}
      >
        <Input
          label="Usuário"
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Login"
          type="login"
          name="login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
          <div className={styles.checkbox}>
            <Input
              label="Registro Ativo"
              type="checkbox"
              name="isActive"
              checked={isActive}
              onChange={(e) => {
                setIsActive(e.target.checked);
              }}
            />
          </div>
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
      </form>
    </section>
  );
};

export default FormUser;
