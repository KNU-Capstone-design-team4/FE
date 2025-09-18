import React from 'react';
import './App.css'; // 전역 스타일 파일 불러오기
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';

const App: React.FC = () => {
  return (
    // <div className="container"> 대신 #root가 이 역할을 합니다.
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