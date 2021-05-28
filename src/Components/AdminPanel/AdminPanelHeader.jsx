import React from 'react';
import AdminPanelHeaderNav from './AdminPanelHeaderNav';
import styles from './AdminPanelHeader.module.css';
const userType = window.localStorage.getItem("type"); //- 0-Admin, 1-Professor, 2-Responsavel

const AdminPanelHeader = () => {
  return (
    <header className={styles.header}>
      <AdminPanelHeaderNav />
    </header>
  );
};

export default AdminPanelHeader;
