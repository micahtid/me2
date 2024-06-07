"use client";

import { DocumentData } from "firebase/firestore/lite";
import { Auth } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useRef } from "react";

import { useActiveChat } from "@/hooks/useActiveChat";
import { useActiveUser } from "@/hooks/useActiveUser";

import MessageForm from "./MessageForm";
import ChatContainer from "./ChatContainer";
import UserDisplay from "./UserDisplay";

interface ChatPageProps {
  users: DocumentData[] | undefined;
  chats: DocumentData[] | undefined;
  auth: Auth;
}

const ChatPage: React.FC<ChatPageProps> = ({ users, chats, auth }) => {
  const { onChange: setActiveChat, currentChat } = useActiveChat();
  const { onChange: setActiveUser, currentUser } = useActiveUser();

  ////////
  const [sending, setSending] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  ///////

  return (
    <section
      className="w-full max-w-[1500px] h-[100vh] mx-auto
    grid grid-cols-10 gap-4"
    >
      <div className="my-5 col-span-3">
        <UserDisplay auth={auth} chats={chats} users={users} setActiveChat={setActiveChat} setActiveUser={setActiveUser} /> 
      </div>
      <div
        className="col-span-7 my-5
      flex flex-col justify-center gap-y-8"
      >
        {currentUser && (
          <h3 className="text-2xl font-semibold">{currentUser.userName}</h3>
        )}
        <div className="h-[75vh] overflow-y-scroll px-2">
          <ChatContainer sending={sending} setSending={setSending} targetRef={dummy} currentChat={currentChat} />
        </div>
        <MessageForm setSending={setSending} targetRef={dummy} />
      </div>
    </section>
  );
};

export default ChatPage;
