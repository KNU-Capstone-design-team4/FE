import React from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import Layout from "./mypage_layout";
import DocumentCard from "./documentcard";
import contractImg from "../../assets/contract.png";
=======
import ResizedImage from "./resize";


interface Document {
  id: number;
  title: string;
  updatedAt: string;
}
>>>>>>> 30c545b32af4c143c62c32784a5eecf60aecf0df

const MyPage: React.FC = () => {
  const navigate = useNavigate();

<<<<<<< HEAD
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
=======
  const documents: Document[] = [
    { id: 1, title: "크누커피 근로계약서", updatedAt: "2025. 08. 13" },
    { id: 2, title: "근로계약서 - 호반우", updatedAt: "2024. 07. 22" },
    { id: 3, title: "감꽃식당 근로계약서", updatedAt: "2024. 03. 01" },
  ];

  const handleCreateNew = () => {
    navigate("/ChatInterface"); // 문서 작성 페이지
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">마이페이지</h1>
        <p className="text-gray-600 mb-6">당신의 문서를 관리하고 열람하세요!</p>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'nowrap', justifyContent: 'center' }}>
          {/* 새 문서 버튼 */}
          <div
            onClick={handleCreateNew}
            style={{
              width: '160px',
              height: '260px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '48px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: '8px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}
          >
            <div style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
            <div style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1' }}></div>
            <div style={{ height: '32px' }}></div>
          
          </div>

          {/* 기존 문서들 */}
          {documents.map((doc) => (
            <div
              key={doc.id}
              style={{
                width: '160px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}
            >
              <ResizedImage width={160} height={160} alt={doc.title} />
              <div style={{ padding: '8px' }}>
                <h2 style={{ fontWeight: 600, fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.title}</h2>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>최근 수정 {doc.updatedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
>>>>>>> 30c545b32af4c143c62c32784a5eecf60aecf0df
  );
};

export default MyPage;
