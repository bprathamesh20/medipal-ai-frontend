import React from 'react'
import avatarImg from '../assets/chatbotImg.svg'

export default function ChatBubble() {
  return (
    <div className='flex flex-row w-full py-4 border-secondary border-b gap-1 mx-2'>
        <div className="avatar">
            <div className="w-12 h-12 rounded-full">
                <img src={avatarImg} alt="Tailwind-CSS-Avatar-component" />
            </div>
        </div>
        
        <div className='flex flex-col gap-2 px-4 justify-start '>
            <h2 className='font-semibold text-white'>Chat Bot</h2>
            <p className='text-base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae architecto nemo, quasi expedita nulla et modi eum, voluptas quia pariatur enim! Nihil quam delectus beatae amet esse illo, enim rerum.</p>
        </div>
        
    </div>
  )
}