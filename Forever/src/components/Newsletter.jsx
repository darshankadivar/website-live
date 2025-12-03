import React, { useState } from 'react'

export default function Newsletter() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    setMessage("You’ve successfully subscribed!");
    setTimeout(() => setMessage(""), 3000);

    setEmail("")
  };

  return (
    <div className="w-full py-16 px-6  mt-10">

      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Subscribe now & get <span className="text-red-500">20% OFF</span>
        </h2>

        <p className="mt-3 text-gray-600 text-sm md:text-base">
          Subscribe to get exclusive discounts and early access to new collections.
        </p>

        <form onSubmit={submitHandler} className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <input value={email}  type="email" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)} className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-black text-gray-700"/>

          <button type="submit" className="px-6 py-3 bg-black text-white rounded-lg   hover:bg-gray-800 transition-all">
            SUBSCRIBE
          </button>
        </form>

       
        {message && (
          <p className="mt-4 text-green-600 font-medium animate-fadeIn">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}
