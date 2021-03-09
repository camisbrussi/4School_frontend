import React from 'react';
import UserHeader from './UserHeader';
import { Routes, Route } from 'react-router-dom';
import Feed from '../Feed/Feed';
import NotFound from '../NotFound';
import Head from '../Helper/Head';
import LoginCreate from '../Login/LoginCreate'
import ActivityCreate from '../Activity/ActivityCreate'

const User = () => {


  return (
    <section className="container">
      <Head title="Painel Administrador" />
      <UserHeader />
      <Routes>
      <Route path="/" element={<Feed />} />
        <Route path="/createuser" element={<LoginCreate />} />
        <Route path="/createactivity" element={<ActivityCreate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
