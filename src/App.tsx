<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> d781db9 (Fix: 로그인/회원가입 후의 메인페이지 변동)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> 8aee3e6 (Fix: 로그인/회원가입 페이지 라우팅)
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage';

import LoginIntroPage from './pages/login/login_intro';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/RegisterPage';

const App: React.FC = () => {
<<<<<<< HEAD
  // 'main'과 'editor' 두 가지 상태를 관리하는 state 생성
  const [currentPage, setCurrentPage] = useState('main');

  // 'editor' 페이지로 이동하는 함수
  const navigateToEditor = () => {
    setCurrentPage('editor');
  };

=======
  //로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true); //로그인 성공 시
  const handleLogout = () => setIsLoggedIn(false); //로그아웃 시
>>>>>>> d781db9 (Fix: 로그인/회원가입 후의 메인페이지 변동)
  return (
<<<<<<< HEAD
    <>
      {/* currentPage 값에 따라 조건부 렌더링 */}
      {currentPage === 'main' ? (
        <>
          <Header />
          <main>
            <Hero />
            {/* Features 컴포넌트에 페이지 이동 함수를 prop으로 전달 */}
            <Features onNavigate={navigateToEditor} />
          </main>
        </>
      ) : (
        <DocumentEditorPage />
      )}
    </>
  );
};

export default App;
=======
    <Router>
      <Routes>
        {/* 메인 페이지*/}
        <Route
          path="/"
          element={
            <>
              <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
              <main>
                <Hero />
                <Features />
              </main>
            </>
          }
        />

        {/* 로그인 및 회원가입 페이지 연결 */}
        <Route path="/login_intro" element={<LoginIntroPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLogin} />} />
      </Routes>
    </Router>
  );
};



export default App;
>>>>>>> 8aee3e6 (Fix: 로그인/회원가입 페이지 라우팅)
