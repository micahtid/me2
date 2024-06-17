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

const ChatPage = () => {
  const { currentPage } = useActivePage();
  const { activeUsers } = useData();
  const { onChange } = useActiveUserChat();

  useEffect(() => {
    onChange(null, "")
  }, [activeUsers])
  
  return (
    <section
      className="w-full h-[100vh] mx-auto
    flex flex-row gap-x-8 p-4"
    >
      <div className="my-5 bg-primary rounded-lg py-10 shadow-md">
        <QuickLinks />
      </div>
      <div className="my-5 bg-primary rounded-lg px-6 pt-12 shadow-md">
        <UserDisplay /> 
      </div>
      <div className="my-5 flex flex-col gap-y-8 bg-gray-200/10 rounded-lg px-6 pt-12 flex-grow shadow-md">
        {
          currentPage === "chat" ? 
          <ChatSection /> : currentPage === "requests" ? <RequestSection /> : <FindSection />
        }
      </div>
    </section>
  );
};

export default ChatPage;
