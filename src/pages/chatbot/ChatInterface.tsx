import React, { useState, useEffect, useRef } from 'react'; // 👈 1. useEffect와 useRef를 import
import './DocumentEditor.css';

// 메시지 타입 정의 (부모와 동일)
interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// (props 인터페이스는 동일)
interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  
  // 👇 2. 스크롤할 메시지 컨테이너와 포커스할 입력창을 위한 ref 생성
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendClick = () => {
    if (input.trim() === '' || isLoading) return;
    onSendMessage(input); // 부모의 핸들러 호출
    setInput(''); // 입력창 비우기
    // (포커스 로직은 아래 useEffect 훅으로 이동)
  };

  // 👇 3. [자동 스크롤] messages 배열(채팅 내역)이 변경될 때마다 실행
  useEffect(() => {
    if (messagesContainerRef.current) {
      // 메시지 컨테이너의 scrollTop 위치를 scrollHeight(총 높이)로 설정하여 맨 아래로 스크롤
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]); // messages 배열이 업데이트될 때마다 이 효과를 실행

  // 👇 4. [자동 포커스] isLoading 상태가 변경될 때 (특히 응답이 와서 false가 될 때) 실행
  useEffect(() => {
    // 로딩이 끝났고(isLoading === false) inputRef가 존재할 때
    if (!isLoading && inputRef.current) {
      // 입력창에 포커스를 줍니다.
      inputRef.current.focus();
    }
  }, [isLoading]); // isLoading 상태가 변경될 때마다 이 효과를 실행

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>AI Chat</h3>
      </div>
      {/* 👇 5. chat-messages div에 messagesContainerRef 연결 */}
      <div className="chat-messages" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <button 
          className="chat-attach-button" 
          disabled={isLoading} 
        >
          +
        </button>
        {/* 👇 6. input 태그에 inputRef 연결 */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendClick()}
          placeholder={isLoading ? "AI가 응답을 준비 중입니다..." : "질문에 대답해주세요"}
          disabled={isLoading}
        />
        <button 
          onClick={handleSendClick} 
          className="chat-send-button"
          disabled={isLoading}
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;