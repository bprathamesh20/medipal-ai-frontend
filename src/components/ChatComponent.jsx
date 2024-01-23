import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import SendIcon from './icons/SendIcon';
import avatarImg from '../assets/chatbotImg.svg';
import FileUpload from './UploadFile';

export default function ChatComponent() {
  // State to manage chat messages
  const [messages, setMessages] = useState([
    { role: 'Chat Bot', content: 'loremmmmsi asoijdfoaijsd oasjdfkjaoisjd foa osidjfasodijf' },
    { role: 'Chat Bot', content: 'loremmmmsi asoijdfoaijsd oasjdfkjaoisjd foa osidjfasodijf' },
  ]);

  // State for the user input
  const [userInput, setUserInput] = useState('');

  // Function to handle sending a message
  const sendMessage = () => {
    if (userInput.trim() !== '') {
      // Add the user's message to the messages state
      setMessages([...messages, { role: 'User', content: userInput.trim() }]);
      // Clear the input field
      setUserInput('');
    }
  };

  return (
    <div className='flex flex-col h-full w-full sm:w-1/2 '>
      <div className='flex-grow'>
        {/* Display chat messages */}
        {messages.map((message, index) => (
          <ChatBubble key={index} img={avatarImg} role={message.role} content={message.content} />
        ))}
      </div>

      
<FileUpload/>
      <div className='flex flex-row gap-2 justify-between items-end p-7 w-full'>
      
        {/* Input field for user message */}
        <input
          type='text'
          placeholder='Message chatbot'
          className='input input-bordered w-full'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        {/* Button to send message */}
        <button className='btn btn-square btn-secondary' onClick={sendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

