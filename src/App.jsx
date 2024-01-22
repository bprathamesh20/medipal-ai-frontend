import React from 'react'
import ChatComponent from './components/chatComponent'
import NavBar from './components/NavBar'


export default function App() {
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center'>
      <NavBar/>
     <ChatComponent/>
    </div>
  )
}

