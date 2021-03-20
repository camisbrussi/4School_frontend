import React from "react";
import AdminPanelHeaderNav from "../AdminPanel/AdminPanelHeaderNav";
import styles from "./AdminPanelHeader.module.css";
import { useLocation } from "react-router-dom";

const AdminPanelHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className="title">Painel</h1>
      <AdminPanelHeaderNav />
    </header>
  );
};

export default AdminPanelHeader;
