import React, { useState } from 'react';
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

import HomeIcon from './Icons/HomeIcon';
import AboutIcon from './Icons/AboutIcon';
import HelpIcon from './Icons/HelpIcon';
import DonateIcon from './Icons/DonateIcon';


const NavBar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home', icon: <HomeIcon className="ml-3 mt-[1px]"/> },
    { id: 2, text: 'About', icon: <AboutIcon className="ml-3 mt-[3px]"/> },
    { id: 3, text: 'Help', icon: <HelpIcon className="ml-3 mt-[2px]"/> },
    { id: 4, text: 'Donate', icon: <DonateIcon className="ml-3 mt-[2px]"/> },
  ];

  return (
    <div className='bg-[#C6E0FF] z-10 fixed top-0 flex-no-wrap flex w-full items-center h-[75px] px-4 text-black bg-opacity-[90%]'>
      {/* Logo */}
      <h1 className='w-full ml-10 text-2xl font-bold text-black'>Me2</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[white] rounded-xl m-2 cursor-pointer duration-300 hover:text-black flex flex-row align-middle'
          >
            {item.text}
            {item.icon}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden mr-10 cursor-pointer'>
        {nav ? <IoMdClose size={40} /> : <LuMenu size={40} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full bg-[#acd1ff] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='text-3xl font-bold text-black mt-10 ml-10 mb-5 cursor-pointer'>Me2</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='w-1/2 p-4 rounded-xl hover:bg-white hover:w-1/2 duration-300 hover:text-black cursor-pointer ml-6 flex flex-row'
          >
            {item.text}
            {item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;