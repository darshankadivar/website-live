import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/AuthSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {

    if (!savedUser) {
      alert("User not registered!");
      return;
    }

    if (savedUser.email === form.email && savedUser.password === form.password) {
      dispatch(loginUser(savedUser));
      localStorage.setItem("isLoggedIn", "true");
      alert("Logged In Successfully");
      navigate("/");
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">

      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 border">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        {/* Inputs */}
        <div className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-black outline-none"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-black outline-none"
            onChange={handleChange}
          />

        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg text-lg font-medium transition"
        >
          Login
        </button>

        {/* Bottom Link */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-medium underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
