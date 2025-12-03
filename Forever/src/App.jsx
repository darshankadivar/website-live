import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import { ToastContainer, toast } from 'react-toastify';
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Order from './pages/Order'
import Register from './pages/Register'
import Myorder from './pages/Myorder'

export default function App() {
  return (
    <BrowserRouter>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/collection' element={<Collection />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/product/:productId' element={<Product/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/place-order' element={<PlaceOrder/>}></Route>
          <Route path='/my-orders' element={<Myorder/>}></Route>
          <Route path='/order/:id' element={<Order/>}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
