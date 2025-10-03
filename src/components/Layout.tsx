import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

// App.tsx에서 로그인 상태와 로그아웃 함수를 받아오기 위한 타입
interface LayoutProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <>
      {/* 이제 Header는 모든 페이지에 공통으로 표시됩니다. */}
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      {/* page-content 클래스를 가진 div가 페이지의 실제 내용을 담습니다. */}
      <div className="page-content">
        {/* Outlet은 App.tsx의 자식 Route들이 렌더링될 위치를 의미합니다. */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;