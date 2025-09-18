import React from 'react';
import lawbotLogo from '../assets/lawbot_logo.svg'; // 이미지 경로를 확인해주세요.

const Header: React.FC = () => {
  return (
    <header>
      <img src={lawbotLogo} alt="LawBot Logo" className="header-logo" />
      <nav>
        <button className="btn-signup">회원가입</button>
        <button className="btn-login">로그인</button>
      </nav>
    </header>
  );
};

export default Header;