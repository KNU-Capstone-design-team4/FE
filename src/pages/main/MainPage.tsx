import React from 'react';
// 👇 [수정 1] Header는 Layout이 렌더링하므로 여기서 import할 필요 없습니다.
// import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Features from '../../components/Features';

// 
// 👇 [수정 2] App.tsx로부터 'isLoggedIn' prop을 받기 위한 인터페이스
// 
interface MainPageProps {
  isLoggedIn: boolean;
}

const MainPage: React.FC<MainPageProps> = ({ isLoggedIn }) => { // 👈 [수정 3] isLoggedIn을 prop으로 받음
  return (
    <>
      {/* 👇 [수정 4] <Header /> 삭제 (Layout.tsx가 이미 렌더링함)
      */}
      {/* <Header /> */}
      
      <main>
        <Hero />
        {/* 👇 [수정 5] Features 컴포넌트에 isLoggedIn 상태를 넘겨줍니다.
        */}
        <Features isLoggedIn={isLoggedIn} />
      </main>
    </>
  );
};

export default MainPage;