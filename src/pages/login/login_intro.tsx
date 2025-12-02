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
          LawBot과 함께라면 간단한 채팅을 통해 복잡한 법률 문서를 쉽게 작성하고 다운로드 할 수 있습니다. 지금 바로 시작해보세요!
        </p>
        <Link to="/register">
          <button className="auth-button">시작하기</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginIntroPage;
