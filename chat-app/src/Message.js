import React from 'react';
import './index.css';

const Message = ({ role, content }) => {
  return (
    <div className={`message ${role}`}>
      <div className={`message-bubble ${role}`}>
        {content}
      </div>
    </div>
  );
};

export default Message;
