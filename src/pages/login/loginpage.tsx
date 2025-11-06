import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // 스타일시트는 그대로 사용합니다.
import apiClient from '../../api/api';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

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

const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && !emailError && !passwordError) {
      try {
        // API 서버에 로그인 요청
        const response = await apiClient.post('/api/users/login', { // 👈 API 엔드포인트에 맞게 수정
          email: email,
          password: password,
        });

        // 성공적으로 응답을 받으면
        console.log('로그인 성공:', response.data);
        // 필요하다면 응답받은 토큰 등을 저장하는 로직 추가
        // 예: localStorage.setItem('token', response.data.token);
        
        onLogin(); // App.tsx의 로그인 상태 변경
        navigate('/'); // 메인 페이지로 이동

      } catch (error) {
        // 에러 처리
        console.error('로그인 실패:', error);
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
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
        </p>
      </div>
    </div>
  );
};

export default LoginPage;