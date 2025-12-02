import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../api/api"; // 너의 실제 경로에 맞게 조정

const NewDocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "근로계약서";

  useEffect(() => {
    const createNewContract = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        const response = await apiClient.post(
          "/api/contracts",
          { contract_type: type },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const newContractId = response.data.id;
        navigate(`/ChatInterface/${newContractId}`);
      } catch (err) {
        console.error("문서 생성 실패:", err);
        alert("문서 생성 중 오류가 발생했습니다.");
        navigate("/main");
      }
    };

    createNewContract();
  }, [type, navigate]);

  return <div style={{ padding: 20 }}>새 문서를 생성 중입니다...</div>;
};

export default NewDocumentPage;
