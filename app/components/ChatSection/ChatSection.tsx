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
import OopsScreen from "../OopsScreen";

const ChatSection = () => {
  const { currentChat, currentUser, isChatComplete } = useActiveUserChat();
  const { onChangeCurrentUser, onModalOpen } = useUserModal();

  ////////
  const [sending, setSending] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  ///////

  if (!currentChat) {
    return (
      <OopsScreen message="Uh oh! It's pretty quite here.." />
    )
  }

  return (
    <div className="flex flex-col h-full w-full px-8 pb-4 overflow-hidden
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
