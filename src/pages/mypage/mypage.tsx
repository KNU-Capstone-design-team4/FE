import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ResizedImage from "./resize";
import apiClient from "../../api/api"; // apiClient 사용 (올바름)

// (API, Document 인터페이스는 동일)
const API = import.meta.env.VITE_API_URL;
interface Document {
  id: string;
  title: string;
  updatedAt: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const handleOpenDocument = (docId: string) => {
    navigate(`/ChatInterface/${docId}`);
  }


  const fetchContracts = async () => {
    if (!accessToken) return;

    try {
      // 
      // 👇 [수정] URL 마지막의 슬래시('/')를 제거합니다.
      // 
      const res = await apiClient.get(`/api/contracts`);
      
      const docs: Document[] = res.data.map((c: any) => {
        const localDate = new Date(c.updated_at);
        const formatted = localDate.toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          id: c.id,
          title: c.contract_type,
          updatedAt: formatted,
        }
      });
      setDocuments(docs);
    } catch (err) {
      console.error("문서 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (accessToken) 
      fetchContracts();
  }, [accessToken]);
    

  const handleCreateNew = async () => {
    if (!accessToken) return;
    
    try {
      // 
      // 👇 [수정] 여기도 일관성을 위해 슬래시('/')를 제거합니다.
      // 
      const res = await apiClient.post(
        `/api/contracts`,
        { contract_type: "근로계약서" }, 
      );

      setDocuments((prev) => [ 
        ...prev, { 
          id: res.data.id, 
          title: "근로계약서", 
          updatedAt: res.data.updated_at || new Date().toISOString(), 
        }, 
      ]);
      
      await fetchContracts();
      navigate(`/ChatInterface/${res.data.id}`);
    } catch (err) {
      console.error("문서 생성 실패", err)
    }
  
  };

  return (
    <div 
      className="auth-container"
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "block",
        //flexDirection: "column",
        //alignItems: "center",
        paddingTop: "80px",
        paddingBottom: "60px",
        //overflowY: "visible",
        //padding: "80px 0 60px",
      }}
    >
      <div className="auth-box"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 className="auth-title"
          style={{
            position: "sticky",
            textAlign: "center",
            marginTop: "0",
            marginBottom: "8px"
          }}
        >
          마이페이지</h1>
        <p 
          className="text-gray-600 mb-6"
          style={{ 
            textAlign: "center", 
            marginTop: "10px",
            marginBottom: "40px", 
            color: "#666" 
          }}
        >당신의 문서를 관리하고 열람하세요!
        </p>
      
        <div
          style={{
            display: "grid",
           // gridTemplateColumns: "repeat(5, 160px)",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            //flexDirection: "row",
            gap: "24px",
            //flexWrap: "wrap",
            justifyContent: "center",
            //alignItems: "start",
            margin: "0 auto",
            width: "100%",
            maxWidth: "calc(5 * 160px + 4 *24px)"
          }}
        >
          {/* 새 문서 버튼 */}
          <div
            onClick={handleCreateNew}
            style={{
              width: "160px",
              height: "260px",
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "48px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              //textAlign: "center",
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