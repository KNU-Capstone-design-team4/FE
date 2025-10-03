import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
import Hero from './components/Hero';
import Features from './components/Features';
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage';
import LoginIntroPage from './pages/login/login_intro';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/RegisterPage';
import MyPage from "./pages/mypage/mypage";
import Chatbot from "./pages/chatbot/ChatInterface";

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
        <Route path="/mypage" element = {<MyPage />} />
        <Route path="/DocumentEditorPage" element={<Chatbot />} />
      </Route>

      <Route path="/login_intro" element={<LoginIntroPage />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onRegisterSuccess={handleLogin} />} />
      
    </Routes>

  );
};

export default App;