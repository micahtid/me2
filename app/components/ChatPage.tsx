"use client";

import { useEffect } from "react";
import { signOut } from "../utils/databasefunctions";

// Hooks
import { useActivePage } from "@/hooks/useActivePage";
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";

// Components - Main Sections
import ChatSection from "./ChatSection/ChatSection";
import UserDisplay from "./UserDisplay";
import FindSection from "./FindSection/FindSection";
import RequestSection from "./RequestSection/RequestSection";
import QuickLinks from "./QuickLinks";
import RoomsSection from "./RoomsSection/RoomsSection";
import GlobalSection from "./GlobalSection/GlobalSection";
import OopsScreen from "./OopsScreen";

const ChatPage = () => {
  const { currentPage } = useActivePage();
  const { activeUsers } = useData();
  const { onChange } = useActiveUserChat();

  useEffect(() => {
    onChange(null, "");
    console.log(activeUsers)
  }, [JSON.stringify(activeUsers?.map((item) => item.activeUsers))]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "chat":
        return <ChatSection />;
      case "requests":
        return <RequestSection />;
      case "new people":
        return <FindSection />;
      case "rooms":
        return <RoomsSection />;
      default:
        return <GlobalSection />;
    }
  };

  return (
    <section className="w-full h-[100vh] overflow-hidden">
      {/* Desktop Layout */}
      <div className="w-full h-full hidden lg:flex flex-row">
        {/* Navigation */}
        <div className="py-8 bg-primary z-20 shadow-xl">
          <QuickLinks />
        </div>

        {/* User List */}
        <div className="bg-[#F4F6FB] pt-6 z-10 shadow-xl">
          <UserDisplay />
        </div>

        {/* Main Content */}
        <div className="pt-6 flex-grow bg-white z-0">
          {renderCurrentPage()}
        </div>
      </div>

      {/* Tablet and Mobile Layout */}
      <div className="lg:hidden flex flex-col items-center justify-center w-full h-full">
        <OopsScreen 
          message="Me2 is designed for larger screens. Please use a desktop browser." 
          divClassName="h-min"
        />
        <button
          className="
            px-6 py-2 mt-6
            bg-header text-white font-medium 
            rounded-lg shadow-xl
            hover:bg-header/90 transition-colors duration-200
          "
          onClick={signOut}
        >
          Return
        </button>
      </div>
    </section>
  );
};

export default ChatPage;