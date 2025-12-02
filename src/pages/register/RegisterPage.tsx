import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/Login.css'; // 스타일시트는 그대로 사용합니다.
import apiClient from '../../api/api';
import axios from 'axios';

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

const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name && phone && !emailError && !passwordError && !nameError && !phoneError) {
      try {
        // API 서버에 회원가입 요청
        const response = await apiClient.post('/api/users/signup', { // 👈 API 엔드포인트에 맞게 수정
          email: email,
          password: password,
          username: name, // 'name' state를 'username' 필드로 사용
          name: name,
          phone: phone,
        });

        console.log('회원가입 성공:', response.data);
        alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        
        // 회원가입 성공 시 바로 로그인 처리 및 메인으로 보낼 경우 아래 주석 해제
        // onRegisterSuccess();
        // navigate('/'); 
        
        navigate('/login'); // 회원가입 후 로그인 페이지로 이동

      } catch (error) {
        console.error('회원가입 실패:', error);
        // axios 에러인 경우, 서버에서 보낸 에러 메시지를 확인할 수 있습니다.
        if (axios.isAxiosError(error) && error.response) {
            alert(error.response.data.message || '회원가입 중 오류가 발생했습니다.');
        } else {
            alert('회원가입 중 오류가 발생했습니다.');
        }
      }
    } else {
      alert('입력 정보를 다시 확인해주세요.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box register-page">
          <Link to="/" className="auth-logo">
            <img src="/lawbot_logo.svg" alt="LawBot Logo" className="auth-logo-img" />
          </Link>
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
