import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentViewer from './DocumentViewer';
import ChatInterface from './ChatInterface';
import './DocumentEditor.css';
import apiClient from '../../api/api';

// (Message, FilledData 인터페이스는 동일)
interface Message {
  sender: 'user' | 'ai';
  text: string;
}
interface FilledData {
  [key: string]: string;
}

const DocumentEditorPage: React.FC = () => {
  const { contractId } = useParams<{ contractId: string }>();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [documentTemplate, setDocumentTemplate] = useState<string | null>(null);
  const [filledData, setFilledData] = useState<FilledData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

useEffect(() => {
    if (!contractId) {
      // contractId가 없으면 로딩 중단 (신규 챗봇 생성 로직 필요 - 3번 항목 참고)
      setIsPageLoading(false); 
      return;
    }

    const fetchContractDetails = async () => {
      setIsPageLoading(true);
      try {
        const response = await apiClient.get(`/api/contracts/${contractId}`);
        
        // 
        // 👇 [유지] 'chat_history' 키를 사용합니다.
        // 
        const { templateHtml, chat_history, content } = response.data;
        
        setDocumentTemplate(templateHtml);
        
        // 
        // 👇 [유지] 'chat_history' 데이터 포맷을 변환합니다.
        // 
        const rawHistory = chat_history || [];
        const formattedHistory: Message[] = rawHistory.map((msg: any) => ({
          sender: msg.sender === 'bot' ? 'ai' : 'user', // 'bot'을 'ai'로 변경
          text: msg.message // 'message'를 'text'로 변경
        }));
        setMessages(formattedHistory); 
        
        // 
        // 👇 [유지] 'content'를 사용합니다.
        // 
        setFilledData(content || {}); 

      } catch (error) {
        console.error("계약 정보 로드 실패:", error);
        setMessages([{ sender: 'ai', text: '문서 정보를 불러오는 데 실패했습니다.' }]);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchContractDetails();
  }, [contractId]);

  
const handleSendMessage = async (inputText: string) => {
    if (isLoading || !contractId) return;

    setIsLoading(true);

    const userMessage: Message = { sender: 'user', text: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await apiClient.post(`/api/contracts/${contractId}/chat`, {
        message: inputText,
      });

      // 👇 [유지] 백엔드의 ChatResponse 스키마에 맞게 구조 분해
      const { reply, updated_field, full_contract_data } = response.data;

      // 👇 [유지] aiMessage 대신 reply 사용
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: reply }
      ]);

      // 👇 [유지] 백엔드가 보낸 전체 데이터로 state를 덮어쓰기
      if (full_contract_data) {
        setFilledData(full_contract_data);
      } 
      // 만약 full_contract_data가 없다면(RAG 답변 등), updated_field로 부분 업데이트
      else if (updated_field) {
        setFilledData((prevData) => ({
          ...prevData,
          [updated_field.field_id]: updated_field.value,
        }));
      }

    } catch (error) {
      console.error('API 통신 오류:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 👇 [추가] onBlur 이벤트를 처리할 자동 저장 함수 (이미지 참고)
  const handleFieldUpdate = async (fieldId: string, value: string) => {
    // 현재 React state의 값과 동일하면 API 요청을 보내지 않음 (최적화)
    if (filledData[fieldId] === value) {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Auto-save failed: Not logged in");
      alert("로그인이 필요합니다.");
      return;
    }

    // 이미지에서 설명한 payload 형식
    const payload = {
      content: {
        [fieldId]: value,
      },
    };

    try {
      //  PATCH 요청 전송
      await apiClient.patch(
        `/api/contracts/${contractId}/content`, 
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // 토큰 필수
          },
        }
      );
      
      console.log(`[Auto-Save] ${fieldId} = ${value}`);

      // API 저장이 성공하면, React의 로컬 state도 업데이트
      setFilledData((prevData) => ({
        ...prevData,
        [fieldId]: value,
      }));

    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };


  if (isPageLoading) {
    return <div className="editor-container">페이지 로딩 중...</div>;
  }

  return (
    <div className="editor-container">
      {/* 👇 [수정] 자동 저장 함수를 prop으로 전달 */}
      <DocumentViewer
        template={documentTemplate}
        data={filledData}
        onFieldUpdate={handleFieldUpdate} 
      />
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading} 
      />
    </div>
  );
};

export default DocumentEditorPage;