import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import SendIcon from './icons/SendIcon';
import FileUpload from './UploadFile';
import TrashIcon from './icons/TrashIcon';


const LOCAL_STORAGE_KEY = 'chatMessages';

export default function ChatComponent() {
  // State to manage chat messages

  const [messages, setMessages] = useState(() => {
    // Load messages from local storage or use a default message
    const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedMessages ? JSON.parse(storedMessages) : [
      { role: 'user', content: 'Please upload the report pdf to start the conversation 🤖' },
    ];
  });

  const [userInput, setUserInput] = useState('');
  const [pdfData, setpdfData] = useState('');
  const [waiting, setWait] = useState(false);
  const chatContainerRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the chat container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  useEffect(() => {
    // Save messages to local storage whenever the messages state changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !waiting) {
      e.preventDefault(); // Prevents the default behavior of the Enter key (e.g., submitting a form)
      sendMessage();
    }
  };



  const handleDataUpload = (message, extractedData) => {
    setMessages([...messages, { role: "assistant", content: message }])
    setpdfData(extractedData)
  };
  // State for the user input


  const sendDataToServer = async () => {
    // Replace this with your actual messages
    let updatedMessages = messages.slice(1);
  
    try {
      const response = await fetch('https://medipal-backend.onrender.com/get-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedMessages, pdfData }),
        signal: abortControllerRef.current.signal,
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log('Server response:', data.message);
      return data.message;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted:', error.message);
      } else {
        console.error('Error sending data to server:', error.message);
      }
    }
  };
  
  // Function to handle sending a message
  const sendMessage = async () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, { role: 'user', content: userInput.trim() }]);
      setUserInput('');
      setWait(true);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (waiting) {
        // cancel ongoing requests
        abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();
  
        try {
          // Assuming sendDataToServer returns the new message
          const newMessage = await sendDataToServer();
          // Append the new message to the existing messages
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'assistant', content: newMessage },
          ]);
        } finally {
          setWait(false);
        }
      }
    };
  
    fetchData(); // Call the fetchData function when waiting changes
  }, [waiting]);
  
  const clearChat = () => {
    // Cancel any ongoing requests when clearing the chat
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    
    setMessages([{ role: 'user', content: 'Please upload the report pdf to start the conversation 🤖' }]);
    window.location.reload();
  };

  return (
    <div className='flex flex-col h-full w-full sm:w-1/2  overflow-y-hidden'>
      <div className='flex-grow overflow-y-auto overflow-x-hidden' ref={chatContainerRef}>
        {/* Display chat messages */}
        {messages.map((message, index) => (
          <ChatBubble key={index} role={message.role} content={message.content} />
        ))}
      </div>


      <FileUpload onDataUpload={handleDataUpload} />
      <div className='flex flex-row gap-2 justify-between items-end p-7 w-full'>
        <button type="submit" className="btn btn-square btn-secondary" onClick={clearChat}><TrashIcon /></button>

        {/* Input field for user message */}
        
        <input
          type='text'
          placeholder={waiting ? 'Please Wait' : 'Message chatbot'}
          className='input input-bordered w-full'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Button to send message */}
        <span>
          {
            waiting ? <span className="loading loading-spinner loading-lg"></span>:
              <button className='btn btn-square btn-secondary' onClick={sendMessage}>
                <SendIcon />
              </button>
          }
        </span>

      </div>
    </div>
  );
}
