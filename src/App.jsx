import React from 'react'

import {
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import ChatPage from './pages/ChatPage';
import LandingPage from './pages/LandingPage';
import { SignOutButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"

const router = createHashRouter([
  {
    path: "/login",
    element: <LandingPage/>,
  },
  {
    path: "/",
    element: <ChatPage/>,
  },
  {
    path:"*",
    element:<ChatPage/>,
    },
]);


export default function App() {
  return (
    <>
      <SignedOut>
         <LandingPage/>
      </SignedOut>
      <SignedIn>
        <div className='flex flex-col h-screen w-screen justify-center items-center'>
            <RouterProvider router={router} />
        </div>
      </SignedIn>
    </>
  )
}

