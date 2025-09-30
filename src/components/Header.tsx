import React from 'react';
import { useNavigate } from 'react-router-dom';
import lawbotLogo from '../assets/lawbot_logo.svg';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* 왼쪽 상단 로고 */}
      <div
        className="cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={lawbotLogo} alt="LawBot Logo" className="h-10" />
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
            <button
              onClick={onLogout}
              className="btn-logout px-4 py-2 bg-gray-300 rounded"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/register')}
              className="btn-signup px-4 py-2 bg-blue-500 text-white rounded"
            >
              회원가입
            </button>
            <button
              onClick={() => navigate('/login_intro')}
              className="btn-login px-4 py-2 bg-gray-300 rounded"
            >
              로그인
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
