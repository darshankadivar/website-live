import { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await axios.get(
      `http://localhost:5000/admins?email=${email}&password=${password}`
    );

    if (res.data.length > 0) {
      setIsLoggedIn(true); // ✅ login success
    } else {
      setError("Invalid Email or Password!");
    }
  };

  return (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 overflow-hidden">
    {/* Glassmorphism Card */}
    <div className="w-[90%] sm:w-[400px] bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/30">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">
        Admin Login
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-sm text-red-200 bg-red-600/30 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 placeholder-gray-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 placeholder-gray-500"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all"
        >
          Login
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-white/80 text-sm mt-4 sm:mt-6">
        © {new Date().getFullYear()} Admin Panel
      </p>
    </div>
  </div>
);
}
