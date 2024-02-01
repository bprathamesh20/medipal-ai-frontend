import { SignOutButton } from '@clerk/clerk-react'
import React from 'react'
import avatarImg from '../assets/chatbotImg.svg'


export default function NavBar() {
  return (
    <div className="navbar bg-base-100 border-b border-secondary">
  <div className="navbar-start">

  <div className="avatar">
  <div className="w-8 rounded-full">
    <img src={avatarImg} alt="Tailwind-CSS-Avatar-component" />
  </div>
</div>
      
    
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl" onClick={() => navigate('/')}>medipal.ai</a>
  </div>
  <div className="navbar-end">
  <SignOutButton afterSignOutUrl="/" className="btn btn-secondary btn-sm" />
  </div>
</div>

  )
}
