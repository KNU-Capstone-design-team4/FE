<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lawbotLogo from '../../assets/lawbot_logo.svg';
import { validateEmail, validatePassword } from "../register/validation";

interface LoginPageProps {
  onLogin: () => void; //App.tsx에서 전달
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // 스타일시트는 그대로 사용합니다.

interface LoginPageProps {
  onLogin: () => void;
>>>>>>> 30c545b32af4c143c62c32784a5eecf60aecf0df
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (password && !validatePassword(password)) {
      setPasswordError("비밀번호는 8자 이상, 대문자/소문자/숫자/특수문자 중 3종류 이상 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
  }, [password]);

  const handleLoginClick = () => {
    if (!email || !password || emailError || passwordError) {
      console.error("입력 정보를 확인해주세요.");
      return;
    }

    console.log("로그인 성공!", { email, password });
    onLogin(); //로그인 상태 true로 업데이트
    navigate("/");
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm flex flex-col items-center">
        <img
          src={lawbotLogo}
          alt="LawBot Logo"
          style={{ height: '30px', width: 'auto' }}
          className="mb-6"
        />

        {/* 이메일 래퍼(가로 중앙 정렬) */}
        <div className="mb-4 w-full flex flex-col items-center">
          <input
            type="email"
            id="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-96 mx-auto px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          {/* Tailwind 클래스 유지 + 인라인 컬러 페일백 */}
          {emailError && (
            <p className="text-red-500 text-xs mt-1 text-center" style={{ color: '#ef4444' }}>
              {emailError}
            </p>
          )}
        </div>

        {/* 비밀번호 래퍼(가로 중앙 정렬) */}
        <div className="mb-6 w-full flex flex-col items-center">
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 mx-auto px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          {passwordError && (
            <p className="text-red-500 text-xs mt-1 text-center" style={{ color: '#ef4444' }}>
              {passwordError}
            </p>
          )}
        </div>

        <button
          className="w-96 py-3 mb-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          onClick={handleLoginClick}
        >
          로그인
        </button>

        <p className="text-center text-sm text-gray-600">
          계정이 없으신가요?
          <button
            onClick={() => navigate("/register")}
            className="text-blue-900 font-semibold ml-1 hover:underline p-0 m-0 bg-transparent"
          >
            회원가입
          </button>
=======
  // 1. 이메일, 비밀번호 값과 에러 메시지를 관리하는 state 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 2. 실시간 유효성 검사 핸들러 추가
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // 이메일 형식 검사
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    // 비밀번호는 비어있는지만 확인
    if (value.length === 0) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else {
      setPasswordError('');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 시도 시, 에러가 없는지 최종 확인
    if (email && password && !emailError && !passwordError) {
      console.log('로그인 시도:', { email, password });
      onLogin();
      navigate('/');
    } else {
      alert('이메일과 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
          <Link to="/" className="auth-logo">
            <img src="/lawbot_logo.svg" alt="LawBot Logo" className="auth-logo-img" />
          </Link>
          <form onSubmit={handleLoginSubmit}>
          {/* 3. 입력 필드에 state와 핸들러 연결 */}
          <input 
            className="auth-input" 
            type="email" 
            placeholder="email" 
            value={email}
            onChange={handleEmailChange}
            required 
          />
          {/* 에러 메시지 표시 */}
          {emailError && <p className="auth-error-message">{emailError}</p>}

          <input 
            className="auth-input" 
            type="password" 
            placeholder="password" 
            value={password}
            onChange={handlePasswordChange}
            required 
          />
          {/* 에러 메시지 표시 */}
          {passwordError && <p className="auth-error-message">{passwordError}</p>}

          <button className="auth-button" type="submit">로그인</button>
        </form>
        <p className="auth-link">
          계정이 없으신가요? <Link to="/register">회원가입</Link>
>>>>>>> 30c545b32af4c143c62c32784a5eecf60aecf0df
        </p>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> 30c545b32af4c143c62c32784a5eecf60aecf0df

export default LoginPage;