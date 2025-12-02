import React, { useState } from 'react';
import lawbotLogo from '../assets/law_logo.svg';

const Hero: React.FC = () => {
  // 모달 열림/닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 토글 함수
  const toggleModal = (e: React.MouseEvent) => {
    e.preventDefault(); // a 태그 기본 동작 방지
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="hero">
      <div className="hero-logo-box">
        <img src={lawbotLogo} alt="LawBot Logo" className="hero-logo-image" />
      </div>
      <div className="hero-text-box">
        <h1>LAWBOT</h1>
        <br></br>
        {/* 클릭 시 모달을 여는 이벤트 추가 */}
        <a href="#" className="read-more" onClick={toggleModal}>
          More Information
        </a>
      </div>

      {/* 👇 모달 UI 추가 */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              Contact Us!
            </h2>
            <div style={{ textAlign: 'left', marginBottom: '20px', fontSize: '16px', color: '#555' }}>
              <p style={{ marginBottom: '10px' }}>
                <strong>👩‍💻 남규리 (Nam Gyuri)</strong><br/>
                Email: <a href="mailto:judynam03@gmail.com" style={{ color: '#007bff' }}>judynam03@gmail.com</a>
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>👩‍💻 전민영 (Jeon Minyoung)</strong><br/>
                Email: <a href="mym031472@gmail.com" style={{ color: '#007bff' }}>mym031472@gmail.com</a>
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>👩‍💻 박지영 (Park Jiyeong)</strong><br/>
                Email: <a href="mailto:qkrwldud51904690@gmail.com" style={{ color: '#007bff' }}>qkrwldud51904690@gmail.com</a>
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>👩‍💻 이영인 (Lee Yeongin)</strong><br/>
                Email: <a href="mailto:dlduddls000@gmail.com" style={{ color: '#007bff' }}>dlduddls000@gmail.com</a>
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={closeButtonStyle}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// 👇 모달 스타일 정의 (인라인 스타일)
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // 배경 어둡게 처리
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, // 최상단 노출
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  position: 'relative',
};

const closeButtonStyle: React.CSSProperties = {
  padding: '10px 24px',
  backgroundColor: '#1a1a1a',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'background-color 0.2s',
};

export default Hero;