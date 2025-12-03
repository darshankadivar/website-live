import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/AuthSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        if (!form.name || !form.email || !form.password) {
            alert("Please fill all fields");
            return;
        }

        dispatch(registerUser(form));
        localStorage.setItem("isLoggedIn", "true");

        alert("Registered Successfully");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            {/* Card */}
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 border">

                {/* Title */}
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create an Account
                </h2>

                {/* Inputs */}
                <div className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-black outline-none"
                        onChange={handleChange}
                    />

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
                    onClick={handleRegister}
                    className="mt-6 w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg text-lg font-medium transition"
                >
                    Register
                </button>

                {/* Bottom Link */}
                <p className="text-center text-gray-600 mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-black font-medium underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}
