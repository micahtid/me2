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
  mobile: 28,
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
      icon: (
        <BsChatFill className="w-8 h-8 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />
      ),
      func: () => onChange("chat"),
    },
    {
      label: "Find",
      value: "new people",
      icon: (
        <HiUsers className="w-8 h-8 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />
      ),
      func: () => onChange("new people"),
    },
    {
      label: "Requests",
      value: "requests",
      icon: (
        <div className="relative">
          <IoNotifications
            className={`
              absolute -bottom-[2px] -right-[2px] 
              w-[18px] h-[18px] max-lg:w-4 max-lg:h-4 max-md:w-3 max-md:h-3
              text-yellow-400 rounded-full
              ${receivedRequests?.length === 0 ? "hidden" : ""}
              ${currentPage !== "requests" ? "bg-primary" : "bg-[#F4F6FB]"}
            `}
          />
          <IoMail className="w-8 h-8 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />
        </div>
      ),
      func: () => onChange("requests"),
    },
    {
      label: "Rooms",
      value: "rooms",
      icon: (
        <FaVideo className="w-8 h-8 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />
      ),
      func: () => onChange("rooms"),
    },
    {
      label: "Global Chat",
      value: "global",
      icon: (
        <AiOutlineGlobal className="w-8 h-8 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />
      ),
      func: () => onChange("global"),
    },
  ];

  return (
    <nav
      className="
      flex flex-col justify-between items-center gap-y-10 h-full
      max-lg:flex-row max-lg:justify-start max-lg:gap-x-4
      max-lg:overflow-x-scroll no-scrollbar max-lg:px-4
    "
    >
      <div
        className="
        flex flex-col justify-start items-center 
        max-lg:flex-row max-lg:gap-x-4
        w-[100px] max-lg:w-auto
      "
      >
        {/* Profile Picture */}
        <button
          onClick={() => onChange("settings")}
          className="
            mb-8 max-lg:mb-0 max-lg:mr-6 max-lg:w-[500px]
            flex justify-center items-center
            hover:scale-105 transition-transform duration-200
          "
        >
          <img
            src={user?.photoURL || ""}
            alt="profile-picture"
            className="
              w-[50px] h-[50px] 
              max-lg:w-[45px] max-lg:h-[45px] 
              max-md:w-[40px] max-md:h-[40px]
              rounded-full shadow-md ring-2 ring-black/5
            "
          />
        </button>

        {/* Navigation Links */}
        {links.map((link, index) => (
          <button
            key={index}
            onClick={link.func}
            className={`
              flex justify-center items-center gap-x-4
              px-4 py-4 w-full
              max-lg:gap-x-2 max-lg:px-6 max-lg:py-5
              max-md:px-4 max-md:py-4
              transition-all duration-300 
              hover:bg-[#f4f6fb]
              ${
                currentPage === link.value
                  ? "bg-[#f4f6fb] border-l-2 border-[#f4f6fb] max-lg:border-l-0 max-lg:border-b-2 shadow-sm"
                  : "max-lg:hover:translate-y-1"
              }
            `}
          >
            <div
              className={`
              p-2 rounded-lg
              ${currentPage === link.value ? "text-black" : "text-black/80"}
              transition-colors duration-200
            `}
            >
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
          px-4 gap-x-4 py-2
          max-lg:justify-start max-lg:ml-4
          hover:text-red-500 transition-colors duration-200
        "
      >
        <PiSignOutBold className="text-black/60 w-8 h-8 max-lg:w-7 max-lg:h-7 max-md:w-6 max-md:h-6" />
      </button>
    </nav>
  );
};

export default QuickLinks;
