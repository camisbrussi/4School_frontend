import React from 'react';
import AdminPanelHeader from './AdminPanelHeader';
import { Routes, Route } from 'react-router-dom';
import Feed from '../Feed/Feed';
import NotFound from '../NotFound';
import Head from '../Helper/Head';
import UserCreate from '../User/UserCreate'
import UserEdit from '../User/UserEdit'
import UserDelete from '../User/UserDelete'
import ActivityCreate from '../Activity/ActivityCreate'
import styles from './AdminPanel.module.css';
import Users from '../User/Users';
import Activities from '../Activity/Activities';
import ActivityDelete from '../Activity/ActivityDelete';
import ActivityEdit from '../Activity/ActivityEdit';

const AdminPanel = () => {


  return (
    <section className= {`${styles.user} container`} >
      <Head title="Painel Administrador" />
      <AdminPanelHeader />

        <div className={styles.forms}>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/createuser" element={<UserCreate />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
        <Route path="/users/delete/:id" element={<UserDelete />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/createactivity" element={<ActivityCreate />} />
        <Route path="/activities/delete/:id" element={<ActivityDelete  />} />
        <Route path="/activities/edit/:id" element={<ActivityEdit />} />
        <Route path="/activities" element={<Activities />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      
    </section>
  );
};

export default AdminPanel;
