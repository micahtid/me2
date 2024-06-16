"use client";

// Library Imports
import { useRouter } from "next/navigation";
import { BsChatFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { IoMail } from "react-icons/io5";

// Own Function Imports
import { getUser } from "../utils/usersfunctions";
import { signOut } from "../utils/databasefunctions";
import { useData } from "@/providers/DataProvider";
import { useActivePage } from "@/hooks/useActivePage";

const QuickLinks = () => {
    const router = useRouter();
    const { onChange, currentPage } = useActivePage();
    const { user } = useData();

    const links = [
        { label: "chat", icon: <BsChatFill size={30} />, func: () => { onChange("chat") } },
        { label: "new people", icon: <HiUsers size={30} />, func: () => { onChange("new people") } },
        { label: "requests", icon: <IoMail size={30} />, func: () => { onChange("requests") } },
    ];

    return (
        <nav className='flex flex-col justify-between items-center gap-y-10 px-6 h-full'>
            <div className="flex flex-col justify-start items-center gap-y-5">
                <button onClick={() => router.replace('./settings')}>
                    <img src={user?.photoURL} width={50} className="rounded-full" alt="User" />
                </button>
                {links.map((link, index) => (
                    <button
                        key={index}
                        className="flex flex-col justify-center items-center"
                        onClick={link.func}
                    >
                        <div className={`${currentPage === link.label ? 'bg-white' : ''}
                        transition-all duration-75 p-2 rounded-lg`}>
                            {link.icon}
                        </div>
                    </button>
                ))}
            </div>
            <button className="flex" onClick={() => signOut()}>
                <PiSignOutBold size={30} />
            </button>
        </nav>
    );
}

export default QuickLinks;
