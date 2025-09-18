import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';

const App: React.FC = () => {
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

export default App;
