import React from 'react';
import Head from './Helper/Head';
import User from './User/User';


const Home = () => {
  return (
    <section className="container mainContainer">
      <Head
        title="Home"
        description="Home do site 4|Scholl"
      />
      <User />
    </section>
  );
};

export default Home;
