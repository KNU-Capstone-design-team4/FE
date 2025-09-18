import React from 'react';

// 이 컴포넌트가 받을 props의 타입을 정의합니다.
interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <a href="#">바로가기</a>
    </div>
  );
};

export default Card;