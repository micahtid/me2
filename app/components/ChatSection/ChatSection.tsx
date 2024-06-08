"use client"

import { useState, useRef } from "react"

import ChatContainer from "./ChatContainer"
import MessageForm from "../MessageForm"

import { useActiveChat } from "@/hooks/useActiveChat"
import { useActiveUser } from "@/hooks/useActiveUser"

const ChatSection = ({  }) => {
  const { onChange: setActiveChat, currentChat } = useActiveChat();
  const { onChange: setActiveUser, currentUser } = useActiveUser();

  ////////
  const [sending, setSending] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  ///////

  return (
    <div
    className="
  flex flex-col justify-center gap-y-8"
  >
    {currentUser && (
      <div className="flex flex-row justify-start items-center gap-x-6">
        <img src={currentUser.pfp} width={45} className="rounded-sm" alt="" />
        <h3 className="text-2xl font-semibold">{currentUser.userName}</h3>
      </div>
    )}
    <div className="h-[65vh] overflow-y-scroll px-2">
      <ChatContainer sending={sending} setSending={setSending} targetRef={dummy} currentChat={currentChat} />
    </div>
    <MessageForm setSending={setSending} targetRef={dummy} />
  </div>
  )
}

export default ChatSection