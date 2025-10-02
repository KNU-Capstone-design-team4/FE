import React from 'react';
<<<<<<< HEAD
import { useNavigate, useLocation } from 'react-router-dom'; // 👈 1. useLocation을 추가로 불러옵니다.

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 2. 현재 위치 정보를 가져옵니다.

  // 3. 현재 페이지 경로에 따라 다르게 동작하는 로그아웃 핸들러
  const handleLogout = () => {
    // 현재 경로가 '/chatbot'일 경우
    if (location.pathname === '/chatbot') {
      if (window.confirm('정말 로그아웃 하시겠습니까?')) {
        onLogout();
        navigate('/login'); // 로그인 페이지로 이동
      }
    } 
    // 그 외 다른 모든 페이지의 경우
    else {
      window.confirm('정말 로그아웃 하시겠습니까?')
      onLogout();
      navigate('/'); // 메인 페이지로 이동
    }
  };
=======
import lawbotLogo from '../assets/lawbot_logo.svg';
>>>>>>> origin/develop

const Header: React.FC = () => {
  return (
<<<<<<< HEAD
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* 왼쪽 상단 로고 */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src="/lawbot_logo.svg" alt="LawBot Logo"
          style={{ height: '40px', width: 'auto', display: 'block' }} />
      </div>

      {/* 오른쪽 메뉴 */}
      <nav className="flex gap-2">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/mypage')}
              className="btn-mypage px-4 py-2 bg-blue-500 text-white rounded"
            >
              마이페이지
            </button>
            {/* 👇 로그아웃 버튼의 onClick에 새로 만든 함수를 연결합니다. */}
            <button
              onClick={handleLogout}
              className="btn-logout px-4 py-2 bg-gray-300 rounded"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login_intro')}
              className="btn-signup px-4 py-2 bg-blue-500 text-white rounded"
            >
              회원가입
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn-login px-4 py-2 bg-gray-300 rounded"
            >
              로그인
            </button>
          </>
        )}
=======
    <header>
      <img src={lawbotLogo} alt="LawBot Logo" className="header-logo" />
      <nav>
        <button className="btn-signup">회원가입</button>
        <button className="btn-login">로그인</button>
>>>>>>> origin/develop
      </nav>
    </header>
  );
};

export default Header;