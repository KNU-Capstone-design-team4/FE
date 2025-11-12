import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/lawbot_logo.svg";

const MyPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full h-auto bg-gray-50 relative">
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4"> 
           <img
              src={Logo}
              alt="Lawbot Logo"
              className="h-12 w-auto object-contain cursor-pointer"
              onClick={() => navigate("/")}
            />   
        </div>
      </header>

      {/* 메인 컨텐츠 영역 (중앙 정렬, 적당한 패딩) */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        {children}
      </main>
    </div>
  );
};

export default MyPageLayout;
