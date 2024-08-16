import { navItems } from "@/app/data";
import { IoMdClose } from "react-icons/io";

interface NavModalProps {
    isOpen: boolean;
    setIsOpen: Function;
}

const NavModal: React.FC<NavModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <nav className={`h-[100vh] bg-black/10
    backdrop-blur-[10px] z-50
    fixed top-0 right-0 pl-20 pr-4 pt-12
    flex flex-col justify-start items-end gap-y-4
    ${isOpen ? "" : "hidden"}`}>
        <button onClick={() => setIsOpen(false)}
            className="mb-12 font-semibold text-xl">
                <IoMdClose />
            </button>
        {navItems.map((item, index) => (
            <a 
            href={item.link}
            className="flex flex-row justify-center items-center gap-x-2"
            key={index}>
                {item.text}
                {item.icon}
            </a>
        ))}
    </nav>
  )
}

export default NavModal;