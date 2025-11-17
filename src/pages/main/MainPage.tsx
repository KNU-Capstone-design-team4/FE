import React from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Features from '../../components/Features';

const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </>
  );
};

export default MainPage;