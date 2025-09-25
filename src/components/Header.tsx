import React from 'react';
import { useNavigate } from 'react-router-dom'
import lawbotLogo from '../assets/lawbot_logo.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header>
      <img src={lawbotLogo} alt="LawBot Logo" className="header-logo" />
      <nav>
        <button
          onClick = { () => navigate('/register') }
          className="btn-signup">회원가입</button>
        <button 
          onClick = { () => navigate('login_intro')}
          className="btn-login">로그인</button>
      </nav>
    </header>
  );
};

export default Header;
