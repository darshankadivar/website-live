import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './Component/Navbar'
import Slider from './Component/Slider'
import Slider1 from './Component/Slider1'
import Video from './Component/Video'
import TrendingC from './Component/TrendingC'
import TShirt from './Component/TShirt'
import BestSeller from './Component/BestSeller'
import WRWrogn from './Component/WRWrogn'
import WrognWP from './Component/WrognWP'
import WStore from './Component/WStore'
import AllServices from './Component/AllServices'
import Footer from './Component/Footer'
import Login from './Component/Login/Login'
import SignUp from './Component/Login/SignUp'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
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