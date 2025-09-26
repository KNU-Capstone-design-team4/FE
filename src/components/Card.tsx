import React from 'react';

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void; // onClick prop을 옵셔널하게 받도록 추가
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault(); // 기본 링크 동작 방지
      onClick(); // 부모로부터 받은 함수 실행
    }
  };

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      {/* href는 그대로 두되, onClick 이벤트 핸들러 추가 */}
      <a href="#" onClick={handleLinkClick}>
        바로가기
      </a>
    </div>
  );
};

export default Card;