import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ResizedImage from "./resize";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // ✅ 휴지통 아이콘

const API = import.meta.env.VITE_API_URL;

interface Document {
  id: string;
  title: string;
  updatedAt: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [accessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  // 👇 [추가] 드롭다운 메뉴 상태 및 Ref
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // 👇 [추가] 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 👇 [수정] 문서 선택 및 생성 핸들러
  const handleSelectDocument = async (docType: string) => {
    if (!accessToken) return;
    setShowDropdown(false); // 메뉴 닫기

    try {
      const res = await axios.post(
        `${API}/api/contracts/`,
        { contract_type: docType },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setDocuments((prev) => [
        ...prev,
        {
          id: res.data.id,
          title: docType,
          updatedAt: res.data.updated_at || new Date().toISOString(),
        },
      ]);

      await fetchContracts();
      navigate(`/ChatInterface/${res.data.id}`);
    } catch (err) {
      console.error("문서 생성 실패", err);
      alert("문서 생성 중 오류가 발생했습니다.");
    }
  };

  // ✅ 문서 삭제 핸들러
  const handleDeleteDocument = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation(); 

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
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <div className="auth-box"
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
          boxSizing: "border-box",
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
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "24px",
            justifyItems: "center",
            margin: "0 auto",
            width: "100%",
            maxWidth: "calc(5 * 160px + 4 *24px)"
          }}
        >
          {/* 👇 [수정] 새 문서 버튼 및 드롭다운 */}
          <div
            ref={dropdownRef}
            style={{ position: "relative", width: "160px", height: "260px" }}
          >
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                width: "100%",
                height: "100%",
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
              }}
            >
              +
            </div>

            {/* 드롭다운 메뉴 */}
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  marginTop: "8px",
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 50,
                  overflow: "hidden",
                  border: "1px solid #eee",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {["근로계약서", "통합신청서", "위임장", "임대차계약서"].map((type) => (
                  <div
                    key={type}
                    onClick={() => handleSelectDocument(type)}
                    style={{
                      padding: "12px",
                      fontSize: "14px",
                      color: "#333",
                      cursor: "pointer",
                      borderBottom: "1px solid #f0f0f0",
                      textAlign: "center",
                      fontWeight: "500",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
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

              {/* 휴지통 아이콘 */}
              <FaTrash
                onClick={(e) => handleDeleteDocument(e, doc.id.toString())}
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "8px",
                  color: "#aaa",
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