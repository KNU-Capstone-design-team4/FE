import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResizedImage from "./resize";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

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
  };

  const fetchContracts = async () => {
    if (!accessToken) return;

    try {
      const res = await axios.get(`${API}/api/contracts/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

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
        };
      });

      setDocuments(docs);
    } catch (err) {
      console.error("문서 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (accessToken) fetchContracts();
  }, [accessToken]);

  const handleCreateNew = async () => {
    if (!accessToken) return;

    try {
      const res = await axios.post(
        `${API}/api/contracts/`,
        { contract_type: "새 문서" },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setDocuments((prev) => [
        ...prev,
        {
          id: res.data.id,
          title: res.data.contract_type,
          updatedAt: res.data.updated_at || new Date().toISOString(),
        },
      ]);

      await fetchContracts();
      navigate(`/ChatInterface/${res.data.id}`);
    } catch (err) {
      console.error("문서 생성 실패", err);
    }
  };


  
  // ✅ 문서 삭제 핸들러
  const handleDeleteDocument = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation(); // 



    if (!accessToken) return;
    const confirmDelete = window.confirm("정말 이 문서를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/api/contracts/${docId}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      console.log("문서 삭제 완료");
    } catch (err) {
      console.error("문서 삭제 실패", err);
    }
  };

  return (
    <div 
      className="auth-container"
      style={{
        height: "calc(100vh - 61px)",
        backgroundColor: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        //paddingTop: "80px",
        //paddingBottom: "60px",
        overflow: "auto",
        //padding: "80px 0 60px",
        boxSizing: "border-box",
      }}
    >
      <div className="auth-box"
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
          boxSizing: "border-box",
          //overflowY: "auto",
          padding: "80px 0 60px",
          margin: 0,
        }}
      >
        <h1 className="auth-title"
          style={{
            margin: "0",
            marginBottom: "8px",
            fontSize: "32px",
            fontWeight: "700",
            fontFamily: "'Noto Sans KR', sans-serif",
            position: "static",
            backgroundColor: "transparent",
          }}
        >
          마이페이지</h1>
        <p 
          className="text-gray-600 mb-6"
          style={{ 
            //textAlign: "center", 
            marginTop: "10px",
            marginBottom: "40px", 
            color: "#666",
            fontSize: "16px",
            fontWeight: "400",
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
            justifyItems: "center",
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
            +
          </div>

          {/* 기존 문서 목록 */}
          {documents.map((doc) => (
            <div
              key={doc.id}
              style={{
                width: "160px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
                cursor: "pointer",
                position: "relative", 
              }}
              onClick={() => handleOpenDocument(doc.id.toString())}
            >
              <ResizedImage width={160} height={160} alt={doc.title} />

              {/* ✅ 휴지통 아이콘 (삭제 버튼) */}
              <FaTrash
                onClick={(e) => handleDeleteDocument(e, doc.id.toString())}
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "8px",
                  color: "#aaa",
                  //color: "red",
                  //fontSize: "20px",
                  //backgroundColor: "white",
                  //borderRadius: "50%",
                  //padding: "4px",
                  zIndex: 10,
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "transform 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff4d4f";
                  e.currentTarget.style.transform = "scale(1.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#aaa";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />

              <div style={{ padding: "8px" }}>
                <h2
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {doc.title}
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    marginTop: "4px",
                  }}
                >
                  최근 수정 {doc.updatedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
