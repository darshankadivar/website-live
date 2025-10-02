import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Slider from './components/Slider'
import Slider1 from './components/Slider1'
import Video from './components/Video'
import TrendingC from './components/TrendingC'
import TShirt from './components/TShirt'
import BestSeller from './components/BestSeller'
import WRWrogn from './components/WRWrogn'
import WrognWP from './components/WrognWP'
import WStore from './components/WStore'
import AllServices from './components/AllServices'
import Footer from './components/Footer'
import Login from './components/Login/Login'
import SignUp from './components/Login/SignUp'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={
            <>
              <Slider />
              <Slider1 />
              <Video />
              <TrendingC />
              <TShirt />
              <BestSeller />
              <WRWrogn />
              <WrognWP />
              <WStore />
              <AllServices />
              <Footer />
            </>
          } />
        </Routes>

      </div>
    </BrowserRouter>
  )
}