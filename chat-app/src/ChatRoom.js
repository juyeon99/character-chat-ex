import React, { useState, useEffect } from 'react';
import { sendMessageToAI } from './API';
import Message from './Message';

const ChatRoom = ({ userId, conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 마운트 될 때 기존 채팅 히스토리 가져오기
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        // const response = await fetch(`http://localhost:8000/chat_history/${conversationId}`);
        const response = await fetch(`http://localhost:8000/chat_history/1`);
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchChatHistory();
  }, [conversationId]);

  // 메세지 보낸 후 채팅 히스토리 업데이트
  const sendMessage = async () => {
    if (input.trim() === "") return;

    // 유저 질문 채팅방에 set
    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // 백엔드에서 메세지 전송 처리
      const aiResponse = await sendMessageToAI(input);
      const aiMessage = { role: "ai", content: aiResponse.answer };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>캐릭터 채팅</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="캐릭터에게 메세지를 보내보세요!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
