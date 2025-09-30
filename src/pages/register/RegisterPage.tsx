import React from "react";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

interface RegisterPageProps {
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    onRegisterSuccess();
    navigate("/"); // 회원가입 후 메인페이지로 이동
  };

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      <div 
        className="absolute top-6 left-6 z-10 cursor-pointer" onClick={() => navigate("/")}> 
        <img src="/lawbot_logo.svg" alt="LawBot Logo" 
          style={{ height: '40px', width: 'auto', display: 'block' }}/>
      </div>

      <div className="flex flex-col items-center justify-center h-full w-full px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">회원가입</h2>
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      </div>
    </div>
  );
};

export default RegisterPage;
