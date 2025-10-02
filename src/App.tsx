import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DocumentEditorPage from './pages/chatbot/DocumentEditorPage';

const App: React.FC = () => {
  // 'main'과 'editor' 두 가지 상태를 관리하는 state 생성
  const [currentPage, setCurrentPage] = useState('main');

  // 'editor' 페이지로 이동하는 함수
  const navigateToEditor = () => {
    setCurrentPage('editor');
  };

  return (
    <>
      {/* currentPage 값에 따라 조건부 렌더링 */}
      {currentPage === 'main' ? (
        <>
          <Header />
          <main>
            <Hero />
            {/* Features 컴포넌트에 페이지 이동 함수를 prop으로 전달 */}
            <Features onNavigate={navigateToEditor} />
          </main>
        </>
      ) : (
        <DocumentEditorPage />
      )}
    </>
  );
};

export default App;