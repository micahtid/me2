"use client";

import { DocumentData } from "firebase/firestore/lite";

import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useActivePage } from "@/hooks/useActivePage";

import ChatSection from "./ChatSection/ChatSection";
import UserDisplay from "./UserDisplay";
import ChatNav from "./ChatNav";
import FindSection from "./FindSection/FindSection";
import RequestSection from "./RequestSection/RequestSection";

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
      className="w-full max-w-[1500px] h-[100vh] mx-auto
    grid grid-cols-10 gap-x-8"
    >
      <div className="my-5 col-span-3">
        <UserDisplay user={user} chats={chats} users={users} /> 
      </div>
      <div className="col-span-7 my-5 flex flex-col gap-y-8">
        <ChatNav />
        {
          currentPage === "chat" ? 
          <ChatSection /> : currentPage === "requests" ? <RequestSection /> : <FindSection users={users} user={user} />
        }
      </div>
    </section>
  );
};

export default ChatPage;
