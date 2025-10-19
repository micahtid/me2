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
        mt-6 sm:mt-8 max-xl:max-w-none max-xl:w-[95%]
        max-w-[1200px] w-full
        flex flex-row justify-between items-center
        rounded-xl px-6 sm:px-8 py-3.5 sm:py-4
        bg-white/80 backdrop-blur-md
        border border-gray-200/80
        shadow-sm
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
        <div className="flex flex-row justify-between items-center gap-x-6 xl:gap-x-8">
          {/* Nav Links */}
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="font-medium text-gray-700 hover:text-header transition-colors duration-200"
            >
              {item.text}
            </a>
          ))}

          {/* Login Button */}
          <button
            onClick={signIn}
            // href="https://me2-register.vercel.app/"
            className="flex justify-center items-center gap-x-2.5 px-5 sm:px-6 py-2 sm:py-2.5
              bg-header rounded-xl font-semibold text-white text-sm
              hover:bg-[#004696] hover:opacity-95 transition-all duration-200"
          >
            <FaUser className="text-sm" />
            Log In
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="w-full flex justify-end p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 hidden max-lg:inline bg-white rounded-xl
            border border-gray-200 shadow-sm hover:bg-gray-50
            transition-all duration-200"
        >
          <RxHamburgerMenu size={20} />
        </button>
        <NavModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default NavBar;
