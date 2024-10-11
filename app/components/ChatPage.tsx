"use client";

import { useEffect } from "react";

// Own Function Imports
import { useActivePage } from "@/hooks/useActivePage";
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";

// Component Imports
import ChatSection from "./ChatSection/ChatSection";
import UserDisplay from "./UserDisplay";
import FindSection from "./FindSection/FindSection";
import RequestSection from "./RequestSection/RequestSection";
import QuickLinks from "./QuickLinks";
import RoomsSection from "./RoomsSection/RoomsSection";

const ChatPage = () => {
  const { currentPage } = useActivePage();
  const { activeUsers } = useData();
  const { onChange } = useActiveUserChat();

  useEffect(() => {
    onChange(null, "");
  }, [activeUsers]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "chat":
        return <ChatSection />;
      case "requests":
        return <RequestSection />;
      case "new people":
        return <FindSection />;
      default:
        return <RoomsSection />;
    }
  };

  return (
    <section className="w-full h-[100vh] mx-auto flex flex-row max-lg:flex-col">
      {/* Quick Links */}
      <div className="py-8 max-lg:py-0 bg-primary z-20 shadow-xl
      max-lg:shadow-md">
        <QuickLinks />
      </div>

      {/* User Display */}
      <div className="bg-[#F4F6FB] pt-6 z-10 shadow-xl
      max-lg:shadow-md max-lg:h-[450px]">
        <UserDisplay />
      </div>

      {/* Dynamic Content */}
      <div className="pt-6 flex-grow max-lg:my-2 bg-white z-0">
        {renderCurrentPage()}
      </div>

      {/* Spacer for Responsive Layout */}
      <div className="w-full p-1 hidden max-lg:inline" />
    </section>
  );
};

export default ChatPage;
