import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './AdminPanelHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const AdminPanelHeaderNav = () => {
  
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const userType = window.localStorage.getItem("type"); //- 0-Admin, 1-Professor, 2-Responsavel

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
        {userType == 0 ? (
            <>
              <NavLink to="/conta/users" end activeClassName={styles.active} className={styles.menu}>
                Usuário
              </NavLink>
              <NavLink to="/conta/activities" end activeClassName={styles.active} className={styles.menu}>
                Atividade
              </NavLink>
              <NavLink to="/conta/teachers" end activeClassName={styles.active} className={styles.menu}>
                Professores
              </NavLink>
              <NavLink to="/conta/responsibles" end activeClassName={styles.active} className={styles.menu}>
                Responsáveis
              </NavLink>
              <NavLink to="/conta/students" end activeClassName={styles.active} className={styles.menu}>
                Estudantes
              </NavLink>
              <NavLink to="/conta/teams" end activeClassName={styles.active} className={styles.menu}>
                Turmas
              </NavLink>
              <NavLink to="/conta/errors" end activeClassName={styles.active} className={styles.menu}>
                Log de Erros
              </NavLink>
              <NavLink to="/conta/infos" end activeClassName={styles.active} className={styles.menu}>
                Auditoria
              </NavLink>
            </>
        ) : ""}
        <NavLink to="/conta/sendmail" end activeClassName={styles.active} className={styles.menu}>
          Mensagens e Emails
        </NavLink>
      </nav>
    </>
  );
};

export default AdminPanelHeaderNav;
