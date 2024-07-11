import { navItems } from "@/app/data";

interface NavModalProps {
    isOpen: boolean;
    setIsOpen: Function;
}

const NavModal: React.FC<NavModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <nav className={`h-[100vh] bg-[#8DC1FF]/50
    backdrop-blur-[10px]
    fixed top-0 right-0 pl-20 pr-4 pt-12
    flex flex-col justify-start items-end gap-y-2
    ${isOpen ? "" : "hidden"}`}>
        <button onClick={() => setIsOpen(false)}
            className="mb-12 font-semibold text-[20px]">Close</button>
        {navItems.map((item, index) => (
            <a className="flex flex-row justify-center items-center gap-x-2"
            key={index}>
                {item.text}
                {item.icon}
            </a>
        ))}
    </nav>
  )
}

export default NavModal;