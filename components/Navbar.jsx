import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiShoppingCartFill } from "react-icons/ri";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  return (
    <div className='bg-gray-600 flex justify-around items-center'>
      <NavLink to='/'>
        <img className='h-15 w-30 mt-2 mb-2 mr-50' src="https://codehelp-shopping-cart.netlify.app/logo.png" alt="" />
      </NavLink>
      <div className='flex gap-x-6 items-center font-medium text-slate-100 mr-5 space-x-6'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to="/cart" className="relative">
          <RiShoppingCartFill className="text-2xl" />
          {
            cart.length > 0 &&
            <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
          }
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar