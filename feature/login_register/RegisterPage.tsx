import React from "react";
import lawbotLogo from '../../src/assets/lawbot_logo.svg';
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";


const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate("/"); // 회원가입 후 메인페이지로 이동
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 flex flex-col items-center justify-start py-8 overflow-hidden">
      <div className="absolute top-8 left-8">
        <img src={lawbotLogo} alt="LawBot Logo" className="h-8 w-auto" />
      </div>

      <div className="flex flex-col items-center justify-center h-full w-full px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">회원가입</h2>
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      </div>
    </div>
  );
};

export default RegisterPage;
