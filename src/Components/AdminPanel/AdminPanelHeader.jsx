import React from 'react';
import AdminPanelHeaderNav from './AdminPanelHeaderNav';
import styles from './AdminPanelHeader.module.css';

const AdminPanelHeader = () => {
  return (
    <header className={styles.header}>
      <AdminPanelHeaderNav />
    </header>
  );
};

export default AdminPanelHeader;
