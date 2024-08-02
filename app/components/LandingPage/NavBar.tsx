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
        className="w-full px-8 py-4
    flex flex-row justify-between items-center
    max-lg:hidden"
      >
        <div>
          <img src="favicon.ico" width={35} className="" />
        </div>
        <div className="flex flex-row justify-between items-center gap-x-6">
          {navItems.map((item, index) => (
            <a key={index} className="flex flex-row gap-x-2 font-medium">
              {item.text}
              <div className="mt-[2px]">{item.icon}</div>
            </a>
          ))}
          <Button
            className="bg-[#C6E0FF] px-3 py-2 rounded-md
        font-medium text-black shadow-sm"
            onClick={signIn}
          >
            Sign Up
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
