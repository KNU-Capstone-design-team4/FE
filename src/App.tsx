import React, { useState } from 'react';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
=======
>>>>>>> origin/develop
import './App.css';

import Layout from './components/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage';
<<<<<<< HEAD
import LoginIntroPage from './pages/login/login_intro';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/RegisterPage';

// MainPage 컴포넌트는 isLoggedIn prop을 받도록 수정합니다.
const MainPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => (
  <main>
    <Hero />
    {/* Features 컴포넌트에 isLoggedIn 상태를 넘겨줍니다. */}
    <Features isLoggedIn={isLoggedIn} />
  </main>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Routes>
      <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
        {/* MainPage에 isLoggedIn 상태를 prop으로 전달합니다. */}
        <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
        <Route path="/chatbot" element={<DocumentEditorPage />} />
      </Route>

      <Route path="/login_intro" element={<LoginIntroPage />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLogin} />} />
    </Routes>
=======

const App: React.FC = () => {
  // 'main'과 'editor' 두 가지 상태를 관리하는 state 생성
  const [currentPage, setCurrentPage] = useState('main');

  // 'editor' 페이지로 이동하는 함수
  const navigateToEditor = () => {
    setCurrentPage('editor');
  };

  return (
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
>>>>>>> origin/develop
  );
};

export default App;