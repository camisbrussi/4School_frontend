import React from 'react';
import Head from './Helper/Head';
import AdminPanel from './AdminPanel/AdminPanel'

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head
        title="Home"
        description="Home do site 4|Scholl"
      />
      <AdminPanel />
    
    </section>
  );
};

export default Home;
