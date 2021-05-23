import React from 'react';
import AdminPanelHeaderNav from './AdminPanelHeaderNav';
import styles from './AdminPanelHeader.module.css';
const userType = window.localStorage.getItem("type"); //- 0-Admin, 1-Professor, 2-Responsavel

const AdminPanelHeader = () => {
  return (
    <header className={styles.header}>
      {userType === 0 ? (
        <h1 className="title">Painel Administrativo</h1>
      ) : (
        <h1 className="title">Mural</h1>
      )}
      <AdminPanelHeaderNav />
    </header>
  );
};

export default AdminPanelHeader;
