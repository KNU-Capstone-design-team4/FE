import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';

import LoginIntroPage from './pages/login/login_intro';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/register/RegisterPage';
import MyPage from './pages/mypage/mypage';

const App: React.FC = () => {
  //로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true); //로그인 성공 시
  const handleLogout = () => setIsLoggedIn(false); //로그아웃 시
  return (
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
         {/* ✅ 마이페이지 */}
        <Route path="/mypage" element={isLoggedIn ? (<MyPage />) : (
              <div className="p-8 text-center text-red-500">
                로그인이 필요합니다.
              </div>
            )
          }
        />
      </Routes>
    </Router>
  );
};



export default App;
