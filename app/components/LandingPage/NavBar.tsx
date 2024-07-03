
"use client";

import { navItems } from "@/app/data";
import { RxHamburgerMenu } from "react-icons/rx";

import { useState } from "react";
import NavModal from "./NavModal";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <nav className='w-full'>
    <div className='w-full px-8 py-4
    flex flex-row justify-between items-center
    max-lg:hidden'>
      <div>Logo</div>
      <div className="flex flex-row justify-between items-center gap-x-6">
        {navItems.map((item, index) => (
          <a key={index}
          className='flex flex-row gap-x-2 font-medium'>
            {item.text}
            {item.icon}
          </a>
        ))}
        <a href="" className="bg-[#C6E0FF] px-4 py-2 rounded-lg
        font-medium">Donate</a>
      </div>
    </div>
    <div className="w-full
    flex justify-end p-4">
        <button className="p-3 bg-gray-100 rounded-lg shadow-md
        hidden max-lg:inline"
        onClick={() => setIsOpen(true)}
        >
          <RxHamburgerMenu size={20} />
        </button>
        <NavModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  </nav>
  );
};

export default NavBar;

{/* <div className='
flex items-center 
bg-[#C6E0FF]/80 rounded-[5px] backdrop-blur-sm shadow-md
w-[calc(100%-8rem)] mx-auto my-6 px-4'>
  <h3 className='w-full ml-10 text-2xl font-bold text-black'>ME2</h3>
  <ul className='hidden md:flex'>
    {navItems.map(item => (
      <li
        key={item.id}
        className='p-4 hover:bg-[white] rounded-xl m-2 cursor-pointer duration-300 hover:text-black
        flex flex-row justify-center items-center gap-x-4'
      >
        {item.text}
        {item.icon}
      </li>
    ))}
  </ul>

  <div onClick={handleNav} className='block md:hidden mr-10 cursor-pointer'>
    {nav ? <IoMdClose size={40} /> : <LuMenu size={40} />}
  </div>

  <ul
    className={
      nav
        ? 'fixed md:hidden left-0 top-0 w-[60%] h-full bg-[#acd1ff] ease-in-out duration-500'
        : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
    }
  >

    <h1 className='text-3xl font-bold text-black mt-10 ml-10 mb-5 cursor-pointer'>Me2</h1>

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
</div> */}