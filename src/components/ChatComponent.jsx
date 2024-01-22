import React from 'react'
import ChatBubble from './ChatBubble'
import SendIcon from './icons/SendIcon'

export default function ChatComponent() {
  return (
 <div className='flex flex-col h-full w-full sm:w-1/2 '>
    <div className='flex-grow'>
        <ChatBubble/>
        <ChatBubble/>

    </div>

    <div className='flex flex-row gap-2 justify-between items-end p-7 w-full'>
        <input type="text" placeholder="Message chatbot" className="input input-bordered w-full" />
        <button className="btn btn-square btn-secondary">
            <SendIcon/>
        </button>
    </div>
</div>

  )
}
