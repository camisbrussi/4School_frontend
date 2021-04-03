import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './AdminPanelHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const AdminPanelHeaderNav = () => {
  
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
        <NavLink to="/conta/users" end activeClassName={styles.active} className={styles.menu}>Usuário
          
        </NavLink>
        <NavLink to="/conta/activities" end activeClassName={styles.active} className={styles.menu}>Atividade
          
        </NavLink>
        <NavLink to="/conta/teachers" end activeClassName={styles.active} className={styles.menu}>Professores
         
        </NavLink>
        <NavLink to="/conta/teams" end activeClassName={styles.active} className={styles.menu}>Turmas
          
        </NavLink>
      </nav>
    </>
  );
};

export default AdminPanelHeaderNav;
