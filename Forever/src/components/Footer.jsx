import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

export default function Footer() {
  return (
    <footer className="w-full bg-white  pt-14 text-gray-600">

      <div className="flex flex-col md:flex-row justify-between border-b border-gray-300 pb-10">

        <div className="md:w-1/2 lg:w-1/3">
          <img src={assets.logo} className="w-32" alt="logo" />

          <p className="mt-5 text-sm leading-relaxed">
            Discover a curated collection of trend-forward essentials crafted 
            with premium materials and attention to detail. Designed for comfort, 
            style, and everyday confidence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:justify-end sm:gap-20 gap-10">

          <div>
            <h2 className="font-bold mb-4 uppercase text-gray-800 text-base">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a className="hover:text-black transition" href="#">Home</a></li>
              <li><a className="hover:text-black transition" href="#">About us</a></li>
              <li><a className="hover:text-black transition" href="#">Contact us</a></li>
              <li><a className="hover:text-black transition" href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold uppercase mb-4 text-gray-800 text-base">Get in touch</h2>
            <ul className="text-sm space-y-2">
              <li className="hover:text-black transition">+1-212-456-7890</li>
              <li className="hover:text-black transition">contact@example.com</li>
            </ul>
          </div>

        </div>
      </div>

      <p className="pt-6 text-center text-xs md:text-sm pb-6 tracking-wide text-gray-500">
        © 2025 Forever. All Rights Reserved.
      </p>
    </footer>
  )
}
