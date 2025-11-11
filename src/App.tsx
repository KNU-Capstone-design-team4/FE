import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
// import Hero from './components/Hero.tsx'; // 👈 [삭제] 더 이상 여기서 사용하지 않음
// import Features from './components/Features.tsx'; // 👈 [삭제] 더 이상 여기서 사용하지 않음
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage';
import LoginIntroPage from './pages/login/login_intro';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/RegisterPage';
import LandingPage from './pages/landing/landing';
import MyPage from "./pages/mypage/mypage";
// import Chatbot from "./pages/chatbot/ChatInterface.tsx"; // 👈 [삭제] 사용되지 않음

// 👇 [추가] 우리가 수정한 MainPage.tsx 파일을 import 합니다.
import MainPage from './pages/main/MainPage';

// 👇 [삭제] App.tsx 내부에 있던 const MainPage 정의를 삭제합니다.
/*
const MainPage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => (
  <main>
    <Hero />
    <Features isLoggedIn={isLoggedIn} />
  </main>
);
*/

const App: React.FC = () => {
  // [수정 1] useState의 초기값을 localStorage에서 확인하도록 변경
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // localStorage에 "accessToken"이 있으면 true, 없으면 false로 시작
    return !!localStorage.getItem("accessToken");
  });

  const handleLogin = () => setIsLoggedIn(true);

  // [수정 2] 로그아웃 시 localStorage에서도 토큰을 삭제하도록 변경
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // 저장된 토큰 삭제
    setIsLoggedIn(false); // 상태 업데이트
  };

  return (
    <Routes>
      <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
        {/* 👇 이제 이 /main 경로는 우리가 수정한 외부 MainPage.tsx 파일을 올바르게 렌더링합니다. */} 
        <Route path="/main" element={<MainPage isLoggedIn={isLoggedIn} />} />
        
        {/* [수정] /chatbot 경로도 DocumentEditorPage로 일치시킵니다. */}
        <Route path="/chatbot" element={<DocumentEditorPage />} />
        
        <Route path="/mypage" element = {<MyPage />} />
        
        {/* [수정] 불필요하거나 중복된 라우트 정리 */}
        {/* <Route path="/DocumentEditorPage" element={<Chatbot />} /> */} 
        <Route path="/DocumentEditorPage" element={<DocumentEditorPage />} />
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