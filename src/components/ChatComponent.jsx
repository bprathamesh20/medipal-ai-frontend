import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import SendIcon from './icons/SendIcon';
import avatarImg from '../assets/chatbotImg.svg';
import FileUpload from './UploadFile';

export default function ChatComponent() {
  // State to manage chat messages
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Please upload the report pdf to start the conversation 🤖' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [pdfData, setpdfData] =useState('')

  const handleDataUpload = (message, extractedData) => {
    setMessages([...messages, {role: "assistant", content:message}])
    setpdfData(extractedData)
  };
  // State for the user input


const sendDataToServer = async () => {
   // Replace this with your actual messages
  let updatedMessages = messages.slice(1)

  try {
    const response = await fetch('http://localhost:3000/get-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedMessages, pdfData }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    console.log('Server response:', data.message);
    return data.message
  } catch (error) {
    console.error('Error sending data to server:', error.message);
  }
};

// Call the function to send data to the server


// Function to handle sending a message
const sendMessage = async () => {
  if (userInput.trim() !== '') {
    // Add the user's message to the messages state
    setMessages([...messages, { role: 'user', content: userInput.trim() }]);
    setUserInput('');
  
    // Assuming sendDataToServer returns the new message
    const newMessage = await sendDataToServer();
  
    // Append the new message to the existing messages
    setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: newMessage }]);
  }
  
  };

  return (
    <div className='flex flex-col h-full w-full sm:w-1/2  overflow-y-hidden'>
      <div className='flex-grow overflow-y-auto '>
        {/* Display chat messages */}
        {messages.map((message, index) => (
          <ChatBubble key={index} role={message.role} content={message.content} />
        ))}
      </div>

      
      <FileUpload onDataUpload={handleDataUpload}/>
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

