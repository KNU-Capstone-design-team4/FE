import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lawbotLogo from '../../assets/lawbot_logo.svg';
import { validateEmail, validatePassword } from "../register/validation";

interface LoginPageProps {
  onLogin: () => void; //App.tsx에서 전달
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

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
        </p>
      </div>
    </div>
  );
}

export default LoginPage;