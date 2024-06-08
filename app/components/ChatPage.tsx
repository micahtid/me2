"use client";

import { DocumentData } from "firebase/firestore/lite";
import { Auth } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useRef } from "react";

import { useActiveChat } from "@/hooks/useActiveChat";
import { useActiveUser } from "@/hooks/useActiveUser";
import { useActivePage } from "@/hooks/useActivePage";

import ChatSection from "./ChatSection/ChatSection";
import UserDisplay from "./UserDisplay";
import ChatNav from "./ChatNav";
import FindSection from "./FindSection/FindSection";
import RequestSection from "./RequestSection/RequestSection";

interface ChatPageProps {
  users: DocumentData[] | undefined;
  chats: DocumentData[] | undefined;
  auth: Auth;
}

const ChatPage: React.FC<ChatPageProps> = ({ users, chats, auth }) => {
  const { onChange: setActiveChat } = useActiveChat();
  const { onChange: setActiveUser } = useActiveUser();
  const { currentPage } = useActivePage();

  return (
    <section
      className="w-full max-w-[1500px] h-[100vh] mx-auto
    grid grid-cols-10 gap-x-8"
    >
      <div className="my-5 col-span-3">
        <UserDisplay auth={auth} chats={chats} users={users} setActiveChat={setActiveChat} setActiveUser={setActiveUser} /> 
      </div>
      <div className="col-span-7 my-5 flex flex-col gap-y-8">
        <ChatNav />
        {
          currentPage === "chat" ? 
          <ChatSection /> : currentPage === "requests" ? <RequestSection /> : <FindSection />
        }
      </div>
    </section>
  );
};

export default ChatPage;
