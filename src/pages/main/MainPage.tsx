// src/pages/main/MainPage.tsx

import React from 'react';
// import Header from '../../components/Header'; // Layout에서 처리하므로 주석 유지
import Hero from '../../components/Hero';
import Features from '../../components/Features';

interface MainPageProps {
  isLoggedIn: boolean;
}

const MainPage: React.FC<MainPageProps> = ({ isLoggedIn }) => {
  return (
    <>
      {/* <Header /> */}
      
      <main>
        <Hero />
        <Features isLoggedIn={isLoggedIn} />
        
        {/* 👇 [추가] 법적 고지 문구 (Features 아래 빈 공간에 추가) */}
        <div 
          style={{ 
            marginTop: '60px', 
            marginBottom: '40px', 
            textAlign: 'center', 
            color: '#9ca3af', // 부드러운 회색 (Tailwind gray-400 느낌)
            fontSize: '13px',
            fontWeight: 400
          }}
        >
          * 모든 법률 조언은 전문가의 자문을 바탕으로 제공되나, 최종 판단의 책임은 사용자에게 있습니다.
        </div>
      </main>
    </>
  );
};

export default MainPage;