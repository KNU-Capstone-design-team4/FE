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
    if (!contractId) return;

    const fetchContractDetails = async () => {
      setIsPageLoading(true);
      try {
        const response = await apiClient.get(`/api/contracts/${contractId}`);
        
        const { templateHtml, chatHistory, data } = response.data;
        
        setDocumentTemplate(templateHtml);
        
        // 
        // 👇 (수정됨) chatHistory가 undefined일 경우 빈 배열([])을 사용합니다.
        // 
        setMessages(chatHistory || []); 
        
        // 👇 (수정됨) data가 undefined일 경우 빈 객체({})를 사용합니다.
        setFilledData(data || {}); 

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

      // 👇 [수정] 백엔드의 ChatResponse 스키마에 맞게 구조 분해
      const { reply, updated_field, full_contract_data } = response.data;

      // 👇 [수정] aiMessage 대신 reply 사용
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: reply }
      ]);

      // 👇 [수정] 백엔드가 보낸 전체 데이터로 state를 덮어쓰기
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

  if (isPageLoading) {
    return <div className="editor-container">페이지 로딩 중...</div>;
  }

  return (
    <div className="editor-container">
      <DocumentViewer
        template={documentTemplate}
        data={filledData}
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