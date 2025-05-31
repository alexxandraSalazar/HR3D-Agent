import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Feature'
import Team from './components/Team'
import Footer from './components/Footer'

export const HomePage = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <Features/>
    <Team/>
    <Footer/>
    
    </>
  )
}
