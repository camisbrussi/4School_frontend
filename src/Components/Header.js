import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../Assets/logo.svg';
import { UserContext } from '../Contexts/UserContext';
import Button from './Forms/Button';

const Header = () => {
  const { data,userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="4|School - Home">
          <Logo />
        </Link>
        {data ? (
          <Button onClick={userLogout}>Sair
        </Button>
        ) : (
          ''
        )}
      </nav>
    </header>
  );
};

export default Header;
