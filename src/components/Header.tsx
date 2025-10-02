import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        className="flex items-center cursor-pointer" 
        onClick={() => navigate('/')}
      >
        {/* public 폴더에 있으므로 절대 경로 /lawbot_logo.svg 사용 */}
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
      </nav>
    </header>
  );
};

export default Header;
