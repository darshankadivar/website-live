import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

export default function Hero() {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-white overflow-hidden border border-gray-400">

      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-10 sm:py-0 text-[#414141] animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <p className="w-10 md:w-14 h-0.5 bg-[#414141]"></p>
          <p className="font-medium text-sm md:text-base tracking-wider">OUR BESTSELLERS</p>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">Latest Arrivals</h1>

        <div className="flex items-center max-w-[200px]  mt-2 transition-all transform hover:translate-x-3">
          <button className="uppercase px-2 py-2  text-[#414141] rounded-sm text-sm md:text-base">
            Shop Now
          </button>
          <p className="w-10 md:w-14 h-0.5 bg-[#414141]"></p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-1/2 flex justify-center items-center  animate-fadeInUp">
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-full h-full object-cover drop-shadow-xl"/>
      </div>

    </div>
  )
}
