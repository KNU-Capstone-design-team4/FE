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
    // (이하 handleSendMessage 로직은 이전과 동일)
    if (isLoading || !contractId) return;

    setIsLoading(true);

    const userMessage: Message = { sender: 'user', text: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await apiClient.post(`/api/contracts/${contractId}/chat`, {
        message: inputText,
      });

      const { aiMessage, updatedData } = response.data;

      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiMessage }
      ]);

      if (updatedData) {
        setFilledData((prevData) => ({
          ...prevData,
          ...updatedData,
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