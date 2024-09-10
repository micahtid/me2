"use client";

import { navItems } from "@/app/data";
import { RxHamburgerMenu } from "react-icons/rx";

import { useState } from "react";
import NavModal from "./NavModal";

import { signIn } from "@/app/utils/databasefunctions";
import Button from "../Button";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full">
      <div
        className="max-lg:hidden
      max-w-[1200px] w-full rounded-lg
      px-8 py-4 bg-gray-600/20 backdrop-blur-[5px]
      flex flex-row justify-between items-center
      mt-20 max-xl:max-w-none max-xl:w-[95%]
       fixed top-0 z-50 left-1/2 transform -translate-x-1/2"
      >
        <div>
          <img src="favicon.ico" width={35} className="" />
        </div>
        <div className="flex flex-row justify-between items-center gap-x-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex flex-row gap-x-2 font-medium text-black"
            >
              {item.text}
              <div className="mt-[2px]">{item.icon}</div>
            </a>
          ))}
          <Button
            className="bg-white rounded-md px-4 py-2
        font-medium text-black shadow-lg"
            onClick={signIn}
          >
            Log In
          </Button>
        </div>
      </div>
      <div
        className="w-full
    flex justify-end p-4"
      >
        <button
          className="p-3 bg-white rounded-lg shadow-lg
        hidden max-lg:inline ease-in-out duration-500"
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
