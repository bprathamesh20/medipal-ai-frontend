import React from 'react';
import PropTypes from 'prop-types';
import avatarImg from '../assets/chatbotImg.svg'

import { useUser } from '@clerk/clerk-react';


export default function ChatBubble({ role, content }) {
  const {user} = useUser()
  const UserImg = user.imageUrl
  return (
    <div className='flex flex-row w-full py-4 border-secondary  border-b gap-1 mx-2'>
      <div className="avatar">
        <div className="w-12 h-12 rounded-full">
          <img src={role === "assistant" ? avatarImg : UserImg} alt="Avatar" />
        </div>
      </div>

      <div className='flex flex-col gap-2 px-4 justify-start '>
        <h2 className='font-semibold text-white'>{role === "assistant" ? "Chatbot" : user.firstName}</h2>
        <p className='text-base'>{content}</p>
      </div>
    </div>
  );
}


ChatBubble.propTypes = {
  role: PropTypes.string.isRequired, // Role of the chat participant (e.g., "Chat Bot" or "User")
  content: PropTypes.string.isRequired, // Content of the chat message
};
