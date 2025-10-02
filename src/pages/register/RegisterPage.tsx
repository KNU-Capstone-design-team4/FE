import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/Login.css'; // 스타일시트는 그대로 사용합니다.

interface RegisterPageProps {
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();

  // 1. 각 입력 필드의 값을 관리하는 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 2. 각 입력 필드의 에러 메시지를 관리하는 state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  // 3. 실시간 유효성 검사 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // 이메일 형식 검사 (간단한 버전: '@'와 '.' 포함 여부)
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    // 비밀번호 조건: 8자 이상, 영문, 숫자, 특수문자 포함
    if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(value)) {
      setPasswordError('8~15자 영문, 숫자, 특수문자를 사용하세요.');
    } else {
      setPasswordError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    // 이름 조건: 2자 이상
    if (value.length < 2) {
      setNameError('이름은 2자 이상 입력해주세요.');
    } else {
      setNameError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    // 전화번호 조건: 숫자만 10~11자리
    if (!/^\d{10,11}$/.test(value)) {
      setPhoneError('올바른 전화번호 형식이 아닙니다. (- 제외)');
    } else {
      setPhoneError('');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 모든 유효성 검사를 통과했는지 확인
    if (email && password && name && phone && !emailError && !passwordError && !nameError && !phoneError) {
      console.log('회원가입 시도:', { email, password, name, phone });
      onRegisterSuccess();
      navigate('/');
    } else {
      alert('입력 정보를 다시 확인해주세요.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box register-page">
        <Link to="/" className="auth-logo">LawBot</Link>
        <h2 className="auth-title">회원가입</h2>
        <form onSubmit={handleRegisterSubmit}>
          {/* 이메일 입력 */}
          <input className="auth-input" type="email" placeholder="이메일" value={email} onChange={handleEmailChange} required />
          {emailError && <p className="auth-error-message">{emailError}</p>}

          {/* 비밀번호 입력 */}
          <input className="auth-input" type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} required />
          {passwordError && <p className="auth-error-message">{passwordError}</p>}
          
          {/* 이름 입력 */}
          <input className="auth-input" type="text" placeholder="이름" value={name} onChange={handleNameChange} required />
          {nameError && <p className="auth-error-message">{nameError}</p>}
          
          {/* 전화번호 입력 */}
          <input className="auth-input" type="tel" placeholder="전화번호 ('-' 제외)" value={phone} onChange={handlePhoneChange} required />
          {phoneError && <p className="auth-error-message">{phoneError}</p>}

          {/* 개인정보 동의 (기능 없음) */}
          <input className="auth-input" type="text" placeholder="개인 정보 동의 (선택)" />
          
          <button className="auth-button" type="submit">가입하기</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;