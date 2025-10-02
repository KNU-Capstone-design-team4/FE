import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Layout 컴포넌트 불러오기
import Layout from './components/Layout';

// 페이지 컴포넌트들
import Hero from './components/Hero';
import Features from './components/Features';
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage';
import LoginIntroPage from './pages/login/login_intro';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/RegisterPage';

// 메인 페이지 내용을 별도 컴포넌트로 분리
const MainPage: React.FC = () => (
  <main>
    <Hero />
    <Features />
  </main>
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Routes>
      {/* Layout을 사용하는 페이지들 */}
      <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/chatbot" element={<DocumentEditorPage />} />
      </Route>

      {/* Layout(Header)을 사용하지 않는 페이지들 */}
      <Route path="/login_intro" element={<LoginIntroPage />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLogin} />} />
    </Routes>
  );
};

export default App;