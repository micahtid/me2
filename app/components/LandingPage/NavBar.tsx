"use client";

/**
 * NavBar Component
 * 
 * A responsive navigation bar that includes:
 * - Logo
 * - Navigation links (desktop only)
 * - Login button
 * - Hamburger menu (mobile only)
 */

import { navItems } from "@/app/data";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import { signIn } from "@/app/utils/databasefunctions";
import NavModal from "./NavModal";

const NavBar = () => {
  // State for mobile menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full">
      {/* Desktop Navigation */}
      <div className="
        fixed top-0 z-50 left-1/2 transform -translate-x-1/2
        mt-8 max-xl:max-w-none max-xl:w-[95%]
        max-w-[1200px] w-full
        flex flex-row justify-between items-center
        rounded-lg px-8 py-4
        bg-white/70 backdrop-blur-sm
        border-[1px] border-black/[0.06]
        shadow-md
        max-lg:hidden
      ">
        {/* Logo Section */}
        <div>
          <img 
            src="favicon.ico" 
            width={35} 
            alt="Logo"
          />
        </div>

        {/* Navigation Links & Login Button */}
        <div className="flex flex-row justify-between items-center gap-x-6">
          {/* Nav Links */}
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.link} 
              className="font-medium text-black hover:text-black/50 transition-all duration-300"
            >
              {item.text}
            </a>
          ))}

          {/* Login Button */}
          <a
            // onClick={signIn}
            href="https://me2-register.vercel.app/"
            className="flex justify-center items-center gap-x-3 px-6 py-2
              bg-header rounded-xl font-medium text-white shadow-sm"
          >
            <FaUser />
            Log In
          </a>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="w-full flex justify-end p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 hidden max-lg:inline bg-white rounded-lg
            border-[1px] border-black/[0.06] shadow-md ease-in-out duration-500"
        >
          <RxHamburgerMenu size={20} />
        </button>
        <NavModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default NavBar;
