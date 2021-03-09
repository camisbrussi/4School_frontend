import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as Adicionar } from '../../Assets/adicionar.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {
  
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta/createuser" end activeClassName={styles.active}>Criar Usuário
          {mobile && 'Criar Usuário'}
        </NavLink>
        <NavLink to="/conta/createactivity" end activeClassName={styles.active}>Criar Atividade
          {mobile && 'Criar Usuário'}
        </NavLink>
      </nav>
    </>
  );
};

export default UserHeaderNav;
