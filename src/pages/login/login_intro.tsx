import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // 스타일시트 불러오기

const LoginIntroPage: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-box login-intro-box">
        <h1 className="auth-logo" style={{ textAlign: 'left', marginBottom: '60px' }}>LawBot</h1>
        <h2>법률 문서를 쉽게 작성하세요!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <Link to="/login">
          <button className="auth-button">시작하기</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginIntroPage;