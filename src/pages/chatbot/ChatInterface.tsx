import React, { useState } from 'react';
import './DocumentEditor.css';

// 메시지 타입 정의 (부모와 동일)
interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// 
// 👇 1. (수정) 부모로부터 받을 props 타입 정의
// 
interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean; // 👈 이 부분이 추가되었습니다.
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  // 
  // 👇 2. (수정) messages에 대한 useState는 제거하고, input 상태만 남깁니다.
  // 
  const [input, setInput] = useState('');

  const handleSendClick = () => {
    // 
    // 👇 3. (수정) 로딩 중이 아닐 때만 부모의 함수를 호출합니다.
    // 
    if (input.trim() === '' || isLoading) return;
    onSendMessage(input); // 부모의 핸들러 호출
    setInput(''); // 입력창 비우기
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>AI Chat</h3>
      </div>
      <div className="chat-messages">
        {/* 👇 4. (수정) props로 받은 messages를 렌더링합니다.
        */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <button 
          className="chat-attach-button" 
          disabled={isLoading} // 👈 5. (수정) 로딩 중 비활성화
        >
          +
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendClick()}
          placeholder={isLoading ? "AI가 응답을 준비 중입니다..." : "사례를 입력해 주세요. (15자 이상)"}
          disabled={isLoading} // 👈 6. (수정) 로딩 중 비활성화
        />
        <button 
          onClick={handleSendClick} 
          className="chat-send-button"
          disabled={isLoading} // 👈 7. (수정) 로딩 중 비활성화
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;