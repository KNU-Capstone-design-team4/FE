import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 페이지가 메인 페이지인지 확인
  const isMainPage = location.pathname === '/' || location.pathname === '/main';

  const handleLogout = () => {
    if (location.pathname === '/chatbot') {
      if (window.confirm('정말 로그아웃 하시겠습니까?')) {
        onLogout();
        navigate('/login'); 
      }
    } 
    else {
      if (window.confirm('정말 로그아웃 하시겠습니까?')) {
        onLogout();
        navigate('/'); 
      }
    }
  };

  return (
    <header className="relative flex justify-between items-center p-4 bg-white shadow-md">
      
      {/* 1. 왼쪽 영역: 뒤로가기 버튼 */}
      <div className="flex items-center" style={{ minWidth: '40px' }}> 
        {!isMainPage && (
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="뒤로가기"
            style={{ 
              border: 'none', 
              background: 'transparent',
              transform: 'translate(-25px, 3px)' 
            }}
          >
            <FaChevronLeft size={20} color="#333" />
          </button>
        )}
      </div>

      {/* 2. 중앙 영역: 로고 (absolute로 화면 정중앙 고정) */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 flex items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img 
          src="/lawbot_logo.svg" 
          alt="LawBot Logo"
          style={{ height: '40px', width: 'auto', display: 'block' }} 
        />
      </div>

      {/* 3. 오른쪽 영역: 메뉴 버튼 */}
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
      </nav>
    </header>
  );
};

export default Header;