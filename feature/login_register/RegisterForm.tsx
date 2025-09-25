import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePhoneNumber, validatePassword } from "./validation";

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // 실시간 유효성 검사
  useEffect(() => {
    if (email && !validateEmail(email)) setEmailError('유효한 이메일 주소를 입력해주세요.');
    else setEmailError('');

    if (password && !validatePassword(password)) 
      setPasswordError('비밀번호는 8자 이상, 대문자/소문자/숫자/특수문자 중 3종류 이상 포함해야 합니다.');
    else setPasswordError('');

    if (phoneNumber && !validatePhoneNumber(phoneNumber))
      setPhoneError('전화번호는 숫자와 하이픈(-)만 포함해야 합니다.');
    else setPhoneError('');
  }, [email, password, phoneNumber]);

  const handleRegister = () => {
    if (!email || !password || !name || !phoneNumber) {
      console.error("모든 항목을 입력해주세요.");
      return;
    }

    if (emailError || passwordError || phoneError) return;

    console.log({ email, password, name, phoneNumber });
    onRegisterSuccess(); // 회원가입 후 메인페이지로 이동
  };

  return (
    <div className="bg-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center space-y-6">
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-80 px-4 py-2 border rounded-md"
      />
      {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-80 px-4 py-2 border rounded-md"
      />
      {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-80 px-4 py-2 border rounded-md"
      />

      <input
        type="tel"
        placeholder="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-80 px-4 py-2 border rounded-md"
      />
      {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}

      <button
        onClick={handleRegister}
        className="w-80 py-2 mt-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
      >
        가입하기
      </button>
    </div>
  );
};

export default RegisterForm;
