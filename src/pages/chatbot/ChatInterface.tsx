import React, { useState } from 'react';
import './DocumentEditor.css';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: '안녕하세요! LAWBOT입니다. 어떤 도움이 필요하신가요?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // 사용자 메시지 추가
    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // AI 응답 시뮬레이션 (나중에 실제 AI 로직으로 대체)
    setTimeout(() => {
      const aiResponse: Message = {
        sender: 'ai',
        text: `"${input}" 항목에 대해 처리중입니다...`,
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>AI Chat</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatInterface;