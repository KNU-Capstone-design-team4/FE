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

  // 임시 데이터 (실제에선 API 연동으로 불러오면 됨)
  const documents: Document[] = [
    { id: 1, title: "크누커피 근로계약서", updatedAt: "2025. 08. 13" },
    { id: 2, title: "근로계약서 - 호반우", updatedAt: "2024. 07. 22" },
    { id: 3, title: "감꽃식당 근로계약서", updatedAt: "2024. 03. 01" },
  ];

  const handleCreateNew = () => {
    navigate("/ChatInterface"); // 문서 작성 페이지 라우트 (App.tsx에 맞춰 조정)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10">
      {/* 헤더 */}
      <div className="flex flex-col items-start justify-center mb-10 w-full max-w-[900px] px-4">
        <h1 className="text-3xl font-bold mb-2">마이페이지</h1>
        <p className="text-gray-600">당신의 문서를 관리하고 열람하세요!</p>
      </div>
      {/* 카드 리스트 */}
      <div className="flex gap-4 w-full overflow-x-auto px-4">
        {/* 새로운 문서 추가 카드 */}
        <div
          onClick={handleCreateNew}
          className="flex flex-col items-center justify-center w-40 h-40 bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-gray-700 shadow flex-shrink-0"
        >
          <span className="text-3xl font-bold mb-2">+</span>
          <span className="text-sm text-center">새 문서 작성</span>
        </div>

        {/* 기존 문서들 */}
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow w-40 flex-shrink-0 flex flex-col items-center"
          >
            <ResizedImage width={160} height={160} alt={doc.title} />
            <div className="p-2 w-full">
              <h2 className="font-semibold text-gray-800 text-center truncate">{doc.title}</h2>
              <p className="text-xs text-gray-500 mt-1 text-center">최근 수정 {doc.updatedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;

