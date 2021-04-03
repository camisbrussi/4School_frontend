import React from "react";
import AdminPanelHeaderNav from "./AdminPanelHeaderNav";
import styles from "./AdminPanelHeader.module.css";

const AdminPanelHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className="title">Painel</h1>
      <AdminPanelHeaderNav />
    </header>
  );
};

export default AdminPanelHeader;
