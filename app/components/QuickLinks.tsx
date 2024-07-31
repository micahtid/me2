"use client";

// Library Imports
import { useRouter } from "next/navigation";
import { BsChatFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";

// Own Function Imports
import { signOut } from "../utils/databasefunctions";
import { useData } from "@/providers/DataProvider";
import { useActivePage } from "@/hooks/useActivePage";

const QuickLinks = () => {
    const router = useRouter();
    const { onChange, currentPage } = useActivePage();
    const { user, receivedRequests } = useData();

    const links = [
        { label: "chat", icon: <BsChatFill size={32} />, func: () => { onChange("chat") } },
        { label: "new people", icon: <HiUsers size={32} />, func: () => { onChange("new people") } },
        { label: "requests", icon: (
            <div className="relative">
                <IoNotifications className={`absolute -bottom-[2px] -right-[2px] text-yellow-300/80
                rounded-full
                    ${receivedRequests?.length === 0 ? "hidden" : ""}
                    ${currentPage !== "requests" ? 'bg-primary' : 'bg-white'}`}
                size={18} />
                <IoMail size={32} className="" />
            </div>
        ), func: () => { onChange("requests") } },
    ];

    return (
        <nav className='flex flex-col justify-between items-center gap-y-10 px-6 h-full
        max-lg:flex-row max-lg:justify-start max-lg:gap-x-4'>
            <div className="flex flex-col justify-start items-center gap-y-5
            max-lg:flex-row max-lg:gap-x-4 w-[70px]">
                <button onClick={() => router.replace('./settings')}
                    className="max-lg:mr-8 mb-[15px]">
                    <img src={user?.photoURL} alt="profile-picture" width={65} className="rounded-full max-lg:min-w-[65px] max-lg:mr-[-20px] max-lg:mb-[-15px]" />
                </button>
                {links.map((link, index) => (
                    <button
                        key={index}
                        className="flex flex-col justify-center items-center"
                        onClick={link.func}
                    >
                        <div className={`${currentPage === link.label ? 'bg-white' : ''}
                        transition-all duration-300 p-2 rounded-lg text-black/90 hover:bg-white/80 ease-in-out`}>
                            {link.icon}
                        </div>
                    </button>
                ))}
            </div>
            <button className="flex
            max-lg:ml-auto flex-row hover:bg-white p-3 ease-in-out duration-500 rounded-full max-lg:mr-[40px]" onClick={() => signOut()}>
                <PiSignOutBold size={32} />
            </button>
        </nav>
    );
}

export default QuickLinks;
