"use client";

import { DocumentData } from "firebase/firestore/lite";

import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useActivePage } from "@/hooks/useActivePage";

import ChatSection from "./ChatSection/ChatSection";
import UserDisplay from "./UserDisplay";
import FindSection from "./FindSection/FindSection";
import RequestSection from "./RequestSection/RequestSection";
import QuickLinks from "./QuickLinks";

interface ChatPageProps {
  users: DocumentData[] | undefined | null;
  chats: DocumentData[] | undefined;
  user: DocumentData | null | undefined;
}

const ChatPage: React.FC<ChatPageProps> = ({ users, chats, user }) => {
  const { onChange } = useActiveUserChat();
  const { currentPage } = useActivePage();

  return (
    <section
      className="w-full h-[100vh] mx-auto
    grid grid-cols-12 gap-x-8 p-4"
    >
      <div className="my-5 col-span-1 bg-gray-200/50 rounded-lg py-10">
        <QuickLinks />
      </div>
      <div className="my-5 col-span-3 bg-gray-200/50 rounded-lg p-4">
        <UserDisplay user={user} chats={chats} users={users} /> 
      </div>
      <div className="col-span-8 my-5 flex flex-col gap-y-8 bg-gray-200/50 rounded-lg p-4">
        {
          currentPage === "chat" ? 
          <ChatSection /> : currentPage === "requests" ? <RequestSection /> : <FindSection users={users} user={user} />
        }
      </div>
    </section>
  );
};

export default ChatPage;
