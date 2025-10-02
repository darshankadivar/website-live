import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SignIn from './component/SignIn';
import Register from './component/Register';
import HomePage from './component/HomePage';

function App() {
  const isAuth = JSON.parse(localStorage.getItem("auth"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/homepage" element={isAuth ? <HomePage /> : <Navigate to="/signin" />}/>
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
