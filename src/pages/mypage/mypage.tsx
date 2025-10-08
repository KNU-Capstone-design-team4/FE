import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ResizedImage from "./resize";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface Document {
  id: number;
  title: string;
  updatedAt: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleOpenDocument = (docId: string) => {
    navigate(`/ChatInterface/${docId}`); //App.tsx에 라우팅 구현, 문서 클릭하면 챗봇으로 감
  }

  //마이페이지 예시, 실제 배포할 때는 로그인 페이지에서 처리해야함
  useEffect(() => {
    const loginTestAccount = async () => {
    try {
      const res = await axios.post(
          `${API}/api/users/login`,
          {
            email: "aa11@example.com",
            password: "aa1111",
          }
      );
      console.log("로그인 성공:", res.data);
      setAccessToken(res.data.access_token);
    } catch (err) {
      console.error("로그인 실패", err);
    }
  };
  
  loginTestAccount();
}, []);

  useEffect(() => {
    const fetchContracts = async () => {
      if(!accessToken) return; //토큰 없으면 요청 X

      try {
        const res = await axios.get(`${API}/api/contracts/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            withCredentials: true,
          },
        });
         const docs: Document[] = res.data.map((c: any) => ({
          id: c.id,
          title: c.contract_type,        // 예: 서버에서 contract_type 가져오기
          updatedAt: c.updated_at || "", // 서버에서 updated_at 필드 사용
        }));
        setDocuments(docs);
      } catch (err) {
        console.error("문서 불러오기 실패", err);
      } 
    };

    fetchContracts();
  }, [accessToken]);

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
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleOpenDocument(doc.id.toString())}
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
