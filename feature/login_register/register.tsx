import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lawbotLogo from '../../src/assets/lawbot_logo.svg';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const re = /^[0-9-]+$/;
    return re.test(phone);
  };

  const handleRegister = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('전화번호는 숫자와 하이픈(-)만 포함해야 합니다.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (isValid) {
      console.log({ email, password, name, phoneNumber});
      navigate("/login");
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 flex flex-col items-center justify-start py-8 overflow-hidden">
      {/* 왼쪽 상단 로고 */}
      <div className="absolute top-8 left-8">
        <img
          src={lawbotLogo}
          alt="LawBot Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* 중앙 컨테이너 */}
      <div className="flex flex-col items-center justify-center h-full w-full px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">회원가입</h2>

        <div className="bg-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center space-y-6">
          {/* 이메일 입력 필드 */}
          <input
            type="email"
            id="registerEmail"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-80 px-4 py-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}

          {/* 비밀번호 입력 필드 */}
          <input
            type="password"
            id="registerPassword"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 px-4 py-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />

          {/* 이름 입력 필드 */}
          <input
            type="text"
            id="registerName"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-80 px-4 py-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />

          {/* 전화번호 입력 필드 */}
          <input
            type="tel"
            id="registerPhoneNumber"
            placeholder="전화번호"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-80 px-4 py-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}

          {/* 가입하기 버튼 */}
          <button
            onClick={handleRegister}
            className="w-80 py-24 mt-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}