import React, { useState } from 'react';
import { sendMessageToAI } from './API';
import Message from './Message';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 메세지 보내기
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    // 백엔드에서 메세지 전송 처리
    try {
      const aiResponse = await sendMessageToAI(input);
      const aiMessage = { role: "ai", content: aiResponse.answer };
      setInput("");
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("채팅 전송 에러:", error);
    }

    setInput("");
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
