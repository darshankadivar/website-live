import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./app/Store";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [darkMode,setDarkMOde]= useState(false) 

  return (
    <Provider store={store}>
        <BrowserRouter>
           {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} admin={admin} darkMode={darkMode} setDarkMOde={setDarkMOde} />}
            <Routes>
              {!isLoggedIn ? (
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setAdmin={setAdmin} />} />
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
            </Routes>
        </BrowserRouter>
    </Provider>
  );
}
