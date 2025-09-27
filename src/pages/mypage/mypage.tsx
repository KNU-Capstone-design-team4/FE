import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./mypage_layout";
import DocumentCard from "./documentcard";
import contractImg from "../../assets/contract.png";

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  const documents = [
    { id: 1, title: "크누커피 근로계약서", date: "2025. 08. 13", imgSrc: contractImg },
    { id: 2, title: "근로계약서 - 호반우", date: "2024. 07. 22", imgSrc: contractImg },
    { id: 3, title: "감꽃식당 근로계약서", date: "2024. 03. 01", imgSrc: contractImg },
  ];

  const handleCreate = () => {
    navigate("/document/create");
  };

  const handleOpenDoc = (id: number) => {
    navigate(`/document/${id}`);
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
        {/* 타이틀 및 설명 (타이틀을 위로 약간 올림) */}
        <div className="text-center -mt-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">마이페이지</h1>
          <p className="mt-2 text-lg md:text-xl text-gray-600">당신의 문서들을 관리하고 열람하세요!</p>
        </div>

        {/* 문서 그리드: 중앙 정렬, 반응형 */}
        <div className="grid grid-flow-row-dense gap-2 justify-start auto-rows-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))" }}>
          {/* 추가 버튼은 항상 첫 번째로 보여짐 */}
          <DocumentCard isAddButton onClick={handleCreate} small />

          {/* 문서 카드들 */}
          {documents.map((d) => (
            <DocumentCard
              key={d.id}
              title={d.title}
              date={d.date}
              imgSrc={d.imgSrc}
              onClick={() => handleOpenDoc(d.id)}
              small
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
