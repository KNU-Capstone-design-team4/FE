import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  to: string;
  isLoggedIn: boolean; // 로그인 상태를 prop으로 받습니다.
}

const Card: React.FC<CardProps> = ({ title, description, to, isLoggedIn }) => {
  const navigate = useNavigate();

  // 클릭 이벤트 핸들러 함수
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 챗봇으로 이동하는 링크일 경우에만 검사
    if (to === '/chatbot') {
      // 로그인하지 않은 상태라면
      if (!isLoggedIn) {
        e.preventDefault(); // 기본 링크 이동을 막습니다.
        alert('로그인이 필요한 서비스입니다.'); // 알림창을 띄웁니다.
        navigate('/login'); // 로그인 페이지로 이동시킵니다.
      }
    }
    // 로그인 상태이거나 다른 링크일 경우, Link의 기본 동작(to 경로로 이동)을 따릅니다.
  };

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      {/* a 태그 대신 Link를 사용하고, onClick 이벤트를 연결합니다. */}
      <Link to={to} onClick={handleNavigate}>
        바로가기
      </Link>
    </div>
  );
};

export default Card;