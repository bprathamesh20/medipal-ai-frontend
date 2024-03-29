import { SignInButton } from '@clerk/clerk-react'
import React from 'react'
import heroImg from '../assets/hero-img.png'
import botImg from '../assets/chatbotImg.svg'

export default function LandingPage() {
  return (
    <section class="bg-black">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a href="#" class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span class="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span class="text-sm font-medium">Welcome to Medipal.ai – Your Health Companion</span> 
            <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </a>
        <img src={botImg} alt="" className='rounded-full w-24 mx-auto my-4' />
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Unlocking the Power of Medical Insights</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Upload your medical reports, receive instant analysis, and empower yourself with personalized insights for a healthier tomorrow.</p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 place-items-center">
            <SignInButton className="btn btn-primary btn-wide"/>
            
        </div>
        <div className='p-3 flex flex-col justify-center w-full items-center shadow-md'>
            <img src={heroImg} alt="hero-image" className='sm:w-3/4  w-full rounded-md border-secondary border-4' />

        </div>
       
    </div>
</section>
  )
}
