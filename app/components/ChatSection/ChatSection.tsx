"use client"

// Library Imports
import { useState, useRef } from "react"

// Own Function Imports
import { useActiveUserChat } from "@/hooks/useActiveUserChat"

// Component Imports
import ChatContainer from "./ChatContainer"
import MessageForm from "./MessageForm"

const ChatSection = () => {
  const { currentChat, currentUser } = useActiveUserChat();

  ////////
  const [sending, setSending] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  ///////

  if (!currentChat) {
    return(
      <div className="flex justify-center items-center h-full">
        Please select a chat!
      </div>
    )
  }

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
    <div className="h-[68vh] overflow-y-scroll px-2">
      <ChatContainer sending={sending} setSending={setSending} targetRef={dummy}  />
    </div>
    <MessageForm setSending={setSending} targetRef={dummy} />
  </div>
  )
}

export default ChatSection