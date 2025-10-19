"use client";

// Library Imports
import { useRouter } from "next/navigation";
import { BsChatFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { HiUsers } from "react-icons/hi";
import { IoMail, IoNotifications } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";

// Own Function Imports
import { signOut } from "../utils/databasefunctions";
import { useData } from "@/providers/DataProvider";
import { useActivePage } from "@/hooks/useActivePage";

// Constants
const ICON_SIZES = {
  base: 32,
  notification: 18,
  mobile: 28
};

interface QuickLink {
  label: string;
  value: string;
  icon: JSX.Element;
  func: () => void;
}

const QuickLinks: React.FC = () => {
  const router = useRouter();
  const { onChange, currentPage } = useActivePage();
  const { user, receivedRequests } = useData();

  const links: QuickLink[] = [
    {
      label: "Chats",
      value: "chat",
      icon: <BsChatFill className="w-5 h-5 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />,
      func: () => onChange("chat")
    },
    {
      label: "Find",
      value: "new people",
      icon: <HiUsers className="w-5 h-5 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />,
      func: () => onChange("new people")
    },
    {
      label: "Requests",
      value: "requests",
      icon: (
        <div className="relative">
          <IoNotifications
            className={`
              absolute -bottom-[1px] -right-[1px]
              w-[14px] h-[14px] max-lg:w-4 max-lg:h-4 max-md:w-3 max-md:h-3
              text-yellow-300/80 rounded-full
              ${receivedRequests?.length === 0 ? "hidden" : ""}
              ${currentPage !== "requests" ? "bg-primary" : "bg-[#9EB3CC]"}
            `}
          />
          <IoMail className="w-5 h-5 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />
        </div>
      ),
      func: () => onChange("requests")
    },
    {
      label: "Rooms",
      value: "rooms",
      icon: <FaVideo className="w-5 h-5 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />,
      func: () => onChange("rooms")
    },
    {
      label: "Global Chat",
      value: "global",
      icon: <AiOutlineGlobal className="w-5 h-5 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />,
      func: () => onChange("global")
    }
  ];

  return (
    <nav className="
      flex flex-col justify-between items-center gap-y-10 h-full
      max-lg:flex-row max-lg:justify-start max-lg:gap-x-4
      max-lg:overflow-x-scroll no-scrollbar max-lg:px-4
    ">
      <div className="
        flex flex-col justify-start items-center gap-y-3
        max-lg:flex-row max-lg:gap-x-4
        w-[64px] max-lg:w-auto
      ">
        {/* Profile Picture */}
        <button
          onClick={() => router.replace('./settings')}
          className="
            mb-6 max-lg:mb-0 max-lg:mr-6 max-lg:w-[500px]
            flex justify-center items-center
            hover:scale-105 transition-transform duration-200
          "
        >
          <img
            src={user?.photoURL || ""}
            alt="profile-picture"
            className="
              w-[36px] h-[36px]
              max-lg:w-[45px] max-lg:h-[45px]
              max-md:w-[40px] max-md:h-[40px]
              rounded-full border border-gray-200
            "
          />
        </button>

        {/* Navigation Links */}
        {links.map((link, index) => (
          <button
            key={index}
            onClick={link.func}
            className={`
              flex justify-center items-center
              py-2.5 w-full
              max-lg:gap-x-2 max-lg:px-6 max-lg:py-4
              max-md:px-4 max-md:py-3
              transition-all duration-200
              hover:bg-black/5
              ${currentPage === link.value ?
                "bg-black/5 border-l-2 border-header max-lg:border-l-0 max-lg:border-b-2" :
                "max-lg:hover:translate-y-1"}
            `}
          >
            <div className={`
              ${currentPage === link.value ? 'text-header' : 'text-black/50'}
              transition-colors duration-200
            `}>
              {link.icon}
            </div>
          </button>
        ))}
      </div>

      {/* Sign Out Button */}
      <button
        onClick={signOut}
        className="
          flex justify-center items-center w-full
          py-2
          max-lg:justify-start max-lg:ml-4
          hover:text-red-500 transition-colors duration-200
        "
      >
        <PiSignOutBold className="text-black/50 w-5 h-5 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />
      </button>
    </nav>
  );
};

export default QuickLinks;
