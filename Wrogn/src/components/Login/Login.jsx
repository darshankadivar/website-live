import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('wrognUsers')) || []
    const user = users.find(u => u.mobile === mobile && u.password === password)
    if (!users.length) {
      alert('No users found. Please sign up.')
      return
    }
    if (user) {
      navigate('/')
    } else {
      alert('Invalid')
    }
  }

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded flex">

        <div className="bg-black text-white p-6 w-80">
          <div className="flex items-center mb-4">
            <h1 className="font-bold">WROGN</h1>
          </div>

          <h2 className="mb-4">Hey Fam! Log in to join the Wrogn Tribe!</h2>

          <div className="space-y-2 cursor-pointer">
            <div className="border border-gray-600 rounded p-2 text-sm">Extra 5% OFF on prepaid payments</div>
            <div className="border border-gray-600 rounded p-2 text-sm">Free shipping for orders above ₹749</div>
            <div className="border border-gray-600 rounded p-2 text-sm">7-day stress-free return & exchange</div>
          </div>
        </div>

        <div className="p-6 w-80">
          <button className="float-right cursor-pointer" onClick={() => navigate('/')}> ❌ </button>

          <h3 className="font-bold mb-2">Unlock Superior Discounts</h3>
          <p className="text-gray-600 text-sm mb-3">Enter mobile number to login</p>

          <input type="text" placeholder="Enter Mobile Number" className="w-full border p-2 rounded mb-2" value={mobile} onChange={e => setMobile(e.target.value)} />

          <input type="password" placeholder="Enter Password" className="w-full border p-2 rounded mb-2" value={password} onChange={e => setPassword(e.target.value)} />

          <label className="flex items-center text-xs mb-2 cursor-pointer">
            <input type="checkbox" className="mr-1" />Notify me for updates & offers</label>

          <label className="flex items-start text-xs mb-3 cursor-pointer">
            <input type="checkbox" className="mr-1 mt-1" />I accept Privacy Policy and T&Cs.</label>

          <button className="w-full bg-pink-600 text-white p-2 rounded cursor-pointer" onClick={handleLogin}>Continue</button>

          <div className="text-center mt-3 cursor-pointer">
            <a href="#" className="text-gray-500 text-xs underline">Trouble logging in?</a>
          </div>
        </div>

      </div>
    </div>
  );
}