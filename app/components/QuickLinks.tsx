"use client";

// Library Imports
import { useRouter } from "next/navigation";
import { BsChatFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { IoMail, IoNotifications } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";

// Own Function Imports
import { signOut } from "../utils/databasefunctions";
import { useData } from "@/providers/DataProvider";
import { useActivePage } from "@/hooks/useActivePage";

const QuickLinks: React.FC = () => {
    const router = useRouter();
    const { onChange, currentPage } = useActivePage();
    const { user, receivedRequests } = useData();

    const links = [
        { label: "Chats", value: "chat", icon: <BsChatFill size={32} />, func: () => onChange("chat") },
        { label: "Find", value: "new people", icon: <HiUsers size={32} />, func: () => onChange("new people") },
        { 
            label: "Requests",
            value: "requests", 
            icon: (
                <div className="relative">
                    <IoNotifications
                        size={18}
                        className={`
                            absolute -bottom-[2px] -right-[2px] 
                            text-yellow-300/80 rounded-full
                            ${receivedRequests?.length === 0 ? "hidden" : ""}
                            ${currentPage !== "requests" ? "bg-primary" : "bg-[#9EB3CC]"}
                        `}
                    />
                    <IoMail size={32} />
                </div>
            ), 
            func: () => onChange("requests") 
        },
        { label: "Rooms", value: "rooms", icon: <FaVideo size={32} />, func: () => onChange("rooms") }
    ];

    return (
        <nav className="
            flex flex-col justify-between items-center gap-y-10 h-full
            max-lg:flex-row max-lg:justify-start max-lg:gap-x-4
            max-lg:overflow-x-scroll no-scrollbar max-lg:px-4
        ">
            <div className="
                flex flex-col justify-start items-center
                max-lg:flex-row max-lg:gap-x-4
                w-[100px] max-lg:w-auto
            ">
                <button 
                    onClick={() => router.replace('./settings')} 
                    className="
                        mb-10 max-lg:mb-0 max-lg:mr-6
                        flex justify-center items-center
                    "
                >
                    <img 
                        src={user?.photoURL || ""} 
                        alt="profile-picture" 
                        width={50} 
                        className="rounded-full max-lg:w-[50px] max-lg:h-[50px]" 
                    />
                </button>
                {links.map((link, index) => (
                    <button 
                        key={index} 
                        onClick={link.func}
                        className={`
                            flex justify-center items-center gap-x-4 px-4 py-6 w-full
                            max-lg:gap-x-2 max-lg:px-6 max-lg:py-4
                            ${currentPage === link.value && "bg-black/20 border-l-2 border-black max-lg:border-l-0 max-lg:border-b-2"}
                        `}
                    >
                        <div className="p-2 rounded-lg text-black/80">
                            {link.icon}
                        </div>
                    </button>
                ))}
            </div>
            <button 
                onClick={signOut}
                className="
                    flex justify-center items-center w-full px-4 gap-x-4
                    max-lg:justify-start
                "
            >
                <div className="text-black/80">
                    <PiSignOutBold size={32} />
                </div>
            </button>
        </nav>
    );
}

export default QuickLinks;
