import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
// 👇 Hero와 Features는 MainPage가 렌더링하므로 App.tsx에서는 필요 없습니다.
// import Hero from './components/Hero'; 
// import Features from './components/Features';
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage';
import LoginIntroPage from './pages/login/login_intro';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/RegisterPage';
import LandingPage from './pages/landing/landing';
import MyPage from "./pages/mypage/mypage";
import Chatbot from "./pages/chatbot/ChatInterface";
import NewDocumentPage from "./pages/chatbot/NewDocumentPage";

// 
// 👇 [수정 1] './pages/main/MainPage'에서 MainPage를 import 합니다.
// 
import MainPage from './pages/main/MainPage'; 

// 
// 👇 [수정 2] App.tsx 내부에 있던 인라인 MainPage 정의를 삭제합니다.
// 
/* const MainPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => (
  <main>
    <Hero />
    <Features isLoggedIn={isLoggedIn} />
  </main>
);
*/

const App: React.FC = () => {
  // 
  // 👇 [수정 3] (이전 제안 반영) localStorage에서 로그인 상태를 확인합니다.
  // 
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  const handleLogin = () => setIsLoggedIn(true);

  // 
  // 👇 [수정 4] (이전 제안 반영) 로그아웃 시 localStorage 토큰을 삭제합니다.
  // 
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 저장된 토큰 삭제
    setIsLoggedIn(false); // 상태 업데이트
  };

  return (
    <Routes>
      {/* 👇 [수정 5] Layout에 handleLogout을 전달합니다.
      */}
      <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
        {/* MainPage에 isLoggedIn 상태를 prop으로 전달합니다. */} 
        <Route path="/main" element={<MainPage isLoggedIn={isLoggedIn} />} />
        <Route path="/chatbot" element={<DocumentEditorPage />} />
        <Route path="/mypage" element = {<MyPage />} />
        <Route path="/DocumentEditorPage" element={<Chatbot messages={[]} onSendMessage={function (): void {
          throw new Error('Function not implemented.');
        } } isLoading={false} onExport={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/ChatInterface" element={<NewDocumentPage />} />
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