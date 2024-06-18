"use client"

// Library Imports
import { useState, useRef } from "react"

// Own Function Imports
import { useActiveUserChat } from "@/hooks/useActiveUserChat"

// Component Imports
import ChatContainer from "./ChatContainer"
import MessageForm from "./MessageForm"
import SocialForm from "./SocialForm"

const ChatSection = () => {
  const { currentChat, currentUser, isChatComplete } = useActiveUserChat();

  ////////
  const [sending, setSending] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  ///////

  if (!currentChat) {
    return (
      <div className="flex justify-center items-center h-full">
        Please select a chat!
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[100vh] w-full p-4 overflow-hidden">
      {currentUser && (
        <div className="flex flex-row justify-start items-center gap-x-6 mb-4">
          <img src={currentUser.pfp} width={45} className="rounded-full" alt="profile-pic" />
          <h3 className="text-2xl">{currentUser.userName}</h3>
        </div>
      )}
      <div className="flex-1 overflow-y-auto mb-4">
        <ChatContainer sending={sending} setSending={setSending} targetRef={dummy} />
      </div>
      <div className="flex-shrink-0">
        {isChatComplete ? (
          <SocialForm />
        ) : (
          // <MessageForm setSending={setSending} targetRef={dummy} />
          <SocialForm />
        )}
      </div>
    </div>
  )
}

export default ChatSection
