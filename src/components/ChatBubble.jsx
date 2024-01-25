import React from 'react';
import PropTypes from 'prop-types';

export default function ChatBubble({ img, role, content }) {
  return (
    <div className='flex flex-row w-full py-4 border-secondary  border-b gap-1 mx-2'>
      <div className="avatar">
        <div className="w-12 h-12 rounded-full">
          <img src={img} alt="Avatar" />
        </div>
      </div>

      <div className='flex flex-col gap-2 px-4 justify-start '>
        <h2 className='font-semibold text-white'>{role === "system" ? "Chatbot" : "User"}</h2>
        <p className='text-base'>{content}</p>
      </div>
    </div>
  );
}

// Define prop types for better development experience
ChatBubble.propTypes = {
  img: PropTypes.string.isRequired, // Path to the avatar image
  role: PropTypes.string.isRequired, // Role of the chat participant (e.g., "Chat Bot" or "User")
  content: PropTypes.string.isRequired, // Content of the chat message
};
