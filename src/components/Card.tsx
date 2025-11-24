import React from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface CardProps {
  title: string;
  description: string;
  onClickType: string;
  isLoggedIn: boolean;
}

const Card: React.FC<CardProps> = ({ title, description, onClickType, isLoggedIn }) => {
  console.log("Card props:", { title, description, onClickType, isLoggedIn }); // 디버깅용
  const navigate = useNavigate();

  const handleClick = async () => {
    // 로그인 안했으면 로그인 페이지로 이동
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
     //console.log("Sending contract_type:", onClickType, "token:", accessToken); 
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    try {
      // 토큰 가져오기
      const accessToken = localStorage.getItem("accessToken");

      // 문서 생성 요청
      const res = await axios.post(
        `${API}/api/contracts`,
        { contract_type: onClickType },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // contractId 받아서 채팅 인터페이스로 이동
      navigate(`/ChatInterface/${res.data.id}`);
    } catch (err) {
      console.error("문서 생성 실패:", err);
      alert("문서 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="card-link">바로가기 →</span>
    </div>
  );
};

export default Card;
