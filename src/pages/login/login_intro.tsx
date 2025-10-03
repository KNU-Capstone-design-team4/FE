<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import lawbotLogo from '../../assets/lawbot_logo.svg';

export default function LoginIntroPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      {/* 1. 로고: 왼쪽 상단에 작게 배치 */}
      <div className="absolute top-6 left-6">
        <img
          src={lawbotLogo}
          alt="LawBot Logo"
          style={{ height: '32px', width: 'auto' }}
        />
      </div>

      {/* 2. 중앙 컨텐츠: 페이지 중앙에 배치 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl bg-white max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-2">법률 문서를 쉽게 작성하세요!</h2>
          <p className="text-gray-600 mb-6 text-sm">
            복잡한 법률 문서 작성, 이제 인공지능이 도와드립니다. 전문 변호사의 도움 없이도 필요한 서류를 쉽고 빠르게 준비하세요.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
=======
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // 스타일시트 불러오기

const LoginIntroPage: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-box login-intro-box">
        <img src="/lawbot_logo.svg" alt="LawBot Logo" className="auth-logo-img" style={{ textAlign: 'left', marginBottom: '60px', marginLeft: 0 }} />
        <h2>법률 문서를 쉽게 작성하세요!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <Link to="/register">
          <button className="auth-button">시작하기</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginIntroPage;
>>>>>>> 30c545b32af4c143c62c32784a5eecf60aecf0df
