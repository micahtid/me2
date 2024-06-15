"use client";


// Library Imports
import { useRouter } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { BsChatFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { IoMail } from "react-icons/io5";

// Own Function Imports
import { signOut } from "../utils/databasefunctions";
import { toTitleCase } from "../utils/utilfunctions";
import { useActivePage } from "@/hooks/useActivePage";

const QuickLinks = () => {
    const router = useRouter();
    const {onChange, currentPage} = useActivePage();

    const links = [
        {label: "settings", icon: <IoMdSettings size={35} />, func: () => {router.replace('./settings')}},
        {label: "chat", icon: <BsChatFill size={35} />, func: () => {onChange("chat")}},
        {label: "new people", icon: <HiUsers size={35} />, func: () => {onChange("new people")}},
        {label: "requests", icon: <IoMail size={35} />, func: () => {onChange("requests")}},
        {label: "sign out", icon: <PiSignOutBold size={35} />, func: () => {signOut()}}
    ]

  return (
    <nav className='flex flex-col justify-start items-center gap-y-8'>
        {links.map((link) => (
            <button className="flex flex-col justify-center items-center"
            onClick={link.func}>
                <div className={`${currentPage === link.label ? 'text-blue-800/50' : ''}
                tranisiton transition-all duration-75`}>
                    {link.icon}
                </div>
                <p className={`${currentPage === link.label ? 'text-blue-800/50' : ''}
                tranisiton transition-all duration-75`}>
                    {toTitleCase(link.label)}
                </p>
            </button>
        ))}
    </nav>
  )
}

export default QuickLinks