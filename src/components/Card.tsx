import React from 'react';
import { Link } from 'react-router-dom'; // 👈 <a> 태그 대신 Link를 사용합니다.

interface CardProps {
  title: string;
  description: string;
  to: string; // 이동할 경로를 prop으로 받습니다.
}

const Card: React.FC<CardProps> = ({ title, description, to }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      {/* <a> 태그를 Link 컴포넌트로 변경하고 'to' prop을 전달합니다. */}
      <Link to={to}>
        바로가기
      </Link>
    </div>
  );
};

export default Card;