import { useState } from 'react';
import React from 'react'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">StudoChat</div>

        {/* Navigation links */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white">Home</a>
          <a href="#" className="text-white">About</a>
          <a href="#" className="text-white">Service</a>
          <a href="#" className="text-white">Communication</a>
        </div>

        {/* Hamburger menu */}
        <button
          className="md:hidden flex justify-center w-8 h-8 bg-blue-500 text-white rounded"
          type="button"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <div className="flex mt-[-50]">
            <Hamburger />
          </div>        
          </button>

        {/* Collapse menu */}
        <div className={`md:hidden ${isOpen? 'block' : 'hidden'}`}>
          <ul className="flex flex-col space-y-4">
            <li>
              <a href="#" className="text-white">Home</a>
            </li>
            <li>
              <a href="#" className="text-white">About</a>
            </li>
            <li>
              <a href="#" className="text-white">Service</a>
            </li>
            <li>
              <a href="#" className="text-white">Communication</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar