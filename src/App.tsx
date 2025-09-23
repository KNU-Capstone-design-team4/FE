import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';

import LoginIntroPage from '../feature/login_register/login_intro';
import LoginPage from '../feature/login_register/loginpage';
import RegisterPage from '../feature/login_register/register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지*/}
        <Route
          path="/"
          element={
            <>
              <Header />
              <main>
                <Hero />
                <Features />
              </main>
            </>
          }
        />

        {/* 로그인 및 회원가입 페이지 연결 */}
        <Route path="/login_intro" element={<LoginIntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};



export default App;
