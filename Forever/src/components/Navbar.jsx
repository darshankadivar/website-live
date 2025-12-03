import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../redux/AuthSlice'
import Order from '../pages/Order'
import { clearCart } from '../redux/CartSlice'

export default function Navbar() {

  const cartQuantity = useSelector((state) => state.cart.totalQuantity)
  const { isLoggedIn } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const goToSearch = () => {
    navigate("/collection?search=open")
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium z-50'>
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt="" />
      </Link>

      <ul className=' hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
        </NavLink>
      </ul>

    
      <div className='flex items-center gap-6'>
        <img onClick={goToSearch} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        <div className='group relative'>
          <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>

              {isLoggedIn ? (
                <>
                  <p
                    className='cursor-pointer hover:text-black'
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </p>

                  <Link to='/my-orders' className='cursor-pointer hover:text-black'>
                    View Order
                  </Link>

                  <p
                    className='cursor-pointer hover:text-black'
                    onClick={() => {dispatch(logoutUser())
                      dispatch(clearCart())
                    }}
                  >
                    Logout
                  </p>
                </>
              ) : (
                <>
                  <p
                    className='cursor-pointer hover:text-black'
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </p>

                  <p
                    className='cursor-pointer hover:text-black'
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </p>
                </>
              )}

            </div>
          </div>
        </div>

       
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{cartQuantity}</p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
        <div className=' flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className=' flex items-center gap-4 p-3'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

          {isLoggedIn ? (
            <>
              <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/orders'>MY ORDERS</NavLink>
              <p
                onClick={() => {
                  dispatch(logoutUser());
                  setVisible(false);
                }}
                className='py-2 pl-6 border cursor-pointer'
              >
                LOGOUT
              </p>
            </>
          ) : (
            <>
              <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/login'>LOGIN</NavLink>
              <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/register'>REGISTER</NavLink>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
