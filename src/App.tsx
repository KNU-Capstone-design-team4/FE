import React, { useState } from 'react';
// 👇 Router를 App.tsx가 아닌 main.tsx에서 사용하므로 여기서는 제거합니다.
import { Routes, Route } from 'react-router-dom'; 
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage';

import LoginIntroPage from './pages/login/login_intro';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/RegisterPage';

const App: React.FC = () => {
  // 로그인 상태 관리는 그대로 유지합니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  
  return (
    // 👇 Router 컴포넌트는 main.tsx로 옮겼으므로 여기서는 제거합니다.
    <Routes>
      {/* 메인 페이지 */}
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

      {/* 로그인 및 회원가입 페이지 (기존 코드 유지) */}
      <Route path="/login_intro" element={<LoginIntroPage />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLogin} />} />

      {/* 👇 여기에 챗봇 페이지 라우트를 추가합니다. */}
      <Route path="/chatbot" element={<DocumentEditorPage />} />
    </Routes>
  );
};

export default App;