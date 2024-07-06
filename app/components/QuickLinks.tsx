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
        { label: "chat", icon: <BsChatFill size={30} />, func: () => { onChange("chat") } },
        { label: "new people", icon: <HiUsers size={30} />, func: () => { onChange("new people") } },
        { label: "requests", icon: (
            <div className="relative">
                <IoNotifications className={`absolute -bottom-[2px] -right-[2px] text-yellow-300/80
                rounded-full
                    ${receivedRequests?.length === 0 ? "hidden" : ""}
                    ${currentPage !== "requests" ? 'bg-primary' : 'bg-white'}`}
                size={16} />
                <IoMail size={30} className="" />
            </div>
        ), func: () => { onChange("requests") } },
    ];

    return (
        <nav className='flex flex-col justify-between items-center gap-y-10 px-6 h-full
        max-lg:flex-row max-lg:justify-start max-lg:gap-x-4'>
            <div className="flex flex-col justify-start items-center gap-y-5
            max-lg:flex-row max-lg:gap-x-4">
                <button onClick={() => router.replace('./settings')}
                    className="max-lg:mr-8">
                    <img src={user?.photoURL} alt="profile-picture" width={50} className="rounded-full" />
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
            <button className="flex
            max-lg:ml-2" onClick={() => signOut()}>
                <PiSignOutBold size={30} />
            </button>
        </nav>
    );
}

export default QuickLinks;
