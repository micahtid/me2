"use client";

// Own Function Imports
import { useActivePage } from "@/hooks/useActivePage";
import { useData } from "@/providers/DataProvider";

// Component Imports
import ChatSection from "./ChatSection/ChatSection";
import UserDisplay from "./UserDisplay";
import FindSection from "./FindSection/FindSection";
import RequestSection from "./RequestSection/RequestSection";
import QuickLinks from "./QuickLinks";

const ChatPage = () => {
  const { currentPage } = useActivePage();
  const { user, users, chats } = useData();

  return (
    <section
      className="w-full h-[100vh] mx-auto
    flex flex-row gap-x-8 p-4"
    >
      <div className="my-5 col-span-1 bg-gray-200/50 rounded-lg py-10">
        <QuickLinks />
      </div>
      <div className="my-5 col-span-3 bg-gray-200/50 rounded-lg p-4">
        <UserDisplay /> 
      </div>
      <div className="col-span-8 my-5 flex flex-col gap-y-8 bg-gray-200/50 rounded-lg p-4 flex-grow">
        {
          currentPage === "chat" ? 
          <ChatSection /> : currentPage === "requests" ? <RequestSection /> : <FindSection />
        }
      </div>
    </section>
  );
};

export default ChatPage;
