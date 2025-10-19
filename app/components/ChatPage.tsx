"use client";

import { useEffect, useState, useCallback } from "react";
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
  const [userDisplayWidth, setUserDisplayWidth] = useState(400); // Default width of 400px!
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    onChange(null, "");
    console.log(activeUsers)
  }, [JSON.stringify(activeUsers?.map((item) => item.activeUsers))]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const newWidth = e.clientX - 64; // 64 is the QuickLinks width
    // Constrain width between 200px and a reasonable maximum
    const constrainedWidth = Math.max(200, Math.min(newWidth, window.innerWidth - 600));
    setUserDisplayWidth(constrainedWidth);
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove]);

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
        <div className="w-[64px] py-6 bg-primary z-20 border-r border-gray-200 flex-shrink-0">
          <QuickLinks />
        </div>

        {/* User List */}
        <div 
          style={{ width: userDisplayWidth }} 
          className="bg-[#F4F6FB] pt-6 z-10 shadow-xl flex-shrink-0 overflow-hidden relative"
        >
          <UserDisplay />
          {/* Resize Handle */}
          <div
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500/20 active:bg-blue-500/40"
            onMouseDown={handleMouseDown}
          />
        </div>

        {/* Main Content */}
        <div className="pt-6 flex-grow bg-white z-0 min-w-[500px]">
          {renderCurrentPage()}
        </div>
      </div>

      {/* Tablet and Mobile Layout */}
      <div className="lg:hidden flex flex-col items-center justify-center w-full h-full">
        <OopsScreen
          message="Screen Too Small!"
          divClassName="h-min"
        />
        <button
          className="
            px-5 py-2.5 mt-6
            bg-[#00224b] text-white font-semibold text-sm
            rounded-xl
            hover:bg-[#004696] hover:opacity-95 transition-all duration-200
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