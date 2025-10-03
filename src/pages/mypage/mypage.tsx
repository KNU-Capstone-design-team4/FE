import React from "react";
import { useNavigate } from "react-router-dom";
import ResizedImage from "./resize";


interface Document {
  id: number;
  title: string;
  updatedAt: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();

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
  );
};

export default MyPage;
