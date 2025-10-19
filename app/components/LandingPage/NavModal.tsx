/**
 * NavModal Component
 * 
 * A mobile navigation modal that slides in from the right.
 * Includes:
 * - Close button
 * - Navigation links with hover effects
 * - Smooth sliding animation
 */

import { navItems } from "@/app/data";
import { IoMdClose } from "react-icons/io";

interface NavModalProps {
    isOpen: boolean;
    setIsOpen: Function;
}

const NavModal: React.FC<NavModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <nav
      className={`
        fixed top-0 right-0 h-[100vh] w-[300px]
        flex flex-col justify-start items-end p-8
        bg-white/90 backdrop-blur-md z-50
        shadow-xl border-l border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="mb-12 font-semibold text-xl text-gray-700
          transition-colors duration-200 hover:text-header"
        aria-label="Close mobile menu"
      >
        <IoMdClose />
      </button>

      {/* Navigation Links */}
      <div className="w-full flex flex-col gap-y-2 items-end">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="w-[200px] pt-4 text-right font-medium text-base
              border-t border-gray-300 text-gray-700
              hover:text-header hover:pr-4 transition-all duration-200"
          >
            {item.text}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavModal;