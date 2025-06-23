import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Feature'
import Team from './components/Team'
import Footer from './components/Footer'
import { useRef } from 'react'

function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const HomePage = () => {
  const sessionIdRef = useRef(generateSessionId());

  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <Features sessionId={sessionIdRef.current}/>
    <Team/>
    <Footer/>
    
    </>
  )
}
