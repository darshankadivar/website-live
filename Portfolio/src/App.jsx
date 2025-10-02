import React from 'react'
import Navbar from './Components/Navbar'
import HeroSection from './Components/HeroSection'
import Skills from './Components/Skills'
import Projects from './Components/Projects'
import Contact from './Components/Contact'
import ScrollToTop from './Components/ScrollToTop'
import Education from './Components/Education'

// import './index.css'

export default function App() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Skills/>
      <Education/>
      <Projects/>
      <Contact/>
      <ScrollToTop/>
    </div>
  )
}
