import React from 'react';
import lawbotLogo from '../assets/law_logo.svg';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-logo-box">
        <img src={lawbotLogo} alt="LawBot Logo" className="hero-logo-image" />
      </div>
      <div className="hero-text-box">
        <h1>LAWBOT</h1>
        <br></br>
        <a href="#" className="read-more">
          More Information
        </a>
      </div>
    </section>
  );
};

export default Hero;
