"use client"

// Library Imports
import { useState, useRef } from "react"

// Own Function Imports
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useUserModal } from "@/hooks/useUserModal";

// Component Imports
import ChatContainer from "./ChatContainer"
import MessageForm from "./MessageForm"
import SocialForm from "./SocialForm"

const ChatSection = () => {
  const { currentChat, currentUser, isChatComplete } = useActiveUserChat();
  const { onChangeCurrentUser, onModalOpen } = useUserModal();

  ////////
  const [sending, setSending] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  ///////

  if (!currentChat) {
    return (
      <div className="flex justify-center items-center h-full text-xl">
        Please select a chat!
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[100vh] w-full px-4 pb-4 overflow-hidden
    bg-white">
      {currentUser && (
        <button className="text-2xl font-medium text-left"
        onClick={() => {
          onChangeCurrentUser(currentUser);
          onModalOpen();
        }}>{currentUser.userName}</button>
      )}
      <div className="flex-1 overflow-y-auto no-scrollbar mb-4">
        <ChatContainer sending={sending} setSending={setSending} targetRef={dummy} />
      </div>
      <div className="flex-shrink-0">
        {isChatComplete ? (
          <SocialForm />
        ) : (
          <MessageForm setSending={setSending} targetRef={dummy} />
          // <SocialForm />
        )}
      </div>
    </div>
  )
}

export default ChatSection
