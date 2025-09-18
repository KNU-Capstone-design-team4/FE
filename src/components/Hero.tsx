import React from 'react';
import lawbotLogo from '../assets/law_logo.svg'; // 경로가 다르면 수정해주세요.

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-logo-box">
        <img src={lawbotLogo} alt="LawBot Logo" className="hero-logo-image" />
      </div>
      <div className="hero-text-box">
        <h1>LAWBOT</h1>
        <br></br>
        <a href="#" className="read-more">More Information</a>
      </div>
    </section>
  );
};

export default Hero;