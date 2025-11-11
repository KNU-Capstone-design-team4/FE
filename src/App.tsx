import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage.tsx';
import LoginIntroPage from './pages/login/login_intro.tsx';
import LoginPage from './pages/login/loginpage.tsx';
import RegisterPage from './pages/register/RegisterPage.tsx';
import LandingPage from './pages/landing/landing.tsx';
import MyPage from "./pages/mypage/mypage.tsx";
import Chatbot from "./pages/chatbot/ChatInterface.tsx";

// MainPage 컴포넌트는 isLoggedIn prop을 받도록 수정합니다.
const MainPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => (
  <main>
    <Hero />
    {/* Features 컴포넌트에 isLoggedIn 상태를 넘겨줍니다. */}
    <Features isLoggedIn={isLoggedIn} />
  </main>
);

const App: React.FC = () => {
  // 
  // 👇 [수정 1] useState의 초기값을 localStorage에서 확인하도록 변경
  // 
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // localStorage에 "accessToken"이 있으면 true, 없으면 false로 시작
    return !!localStorage.getItem("accessToken");
  });

  const handleLogin = () => setIsLoggedIn(true);

  // 
  // 👇 [수정 2] 로그아웃 시 localStorage에서도 토큰을 삭제하도록 변경
  // 
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 저장된 토큰 삭제
    setIsLoggedIn(false); // 상태 업데이트
  };

  return (
    <Routes>
      <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
        {/* MainPage에 isLoggedIn 상태를 prop으로 전달합니다. */} 
        <Route path="/main" element={<MainPage isLoggedIn={isLoggedIn} />} />
        <Route path="/chatbot" element={<DocumentEditorPage />} />
        <Route path="/mypage" element = {<MyPage />} />
        <Route path="/DocumentEditorPage" element={<Chatbot />} />
        <Route path="/ChatInterface" element={<DocumentEditorPage />} />
        <Route path="/ChatInterface/:contractId" element={<DocumentEditorPage />} />
      </Route>
      <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
      <Route path="/login_intro" element={<LoginIntroPage />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLogin} />} />
      
    </Routes>

  );
};

export default App;