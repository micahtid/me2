"use client"

// Library Imports
import { useState, useRef } from "react"

// Component Imports
import ChatContainer from "./ChatContainer";
import MessageForm from "../MessageForm";

const GlobalSection = () => {
  ////////
  const [sending, setSending] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  ///////

  return (
    <div className="flex flex-col h-full w-full px-8 pb-4 overflow-hidden
    bg-white">
        <h3 className="text-2xl font-semibold mb-6">
            Global Chat
        </h3>
      <div className="flex-1 overflow-y-auto no-scrollbar mb-4">
        <ChatContainer sending={sending} setSending={setSending} targetRef={dummy} />
      </div>
      <div className="flex-shrink-0">
        <MessageForm setSending={setSending} targetRef={dummy} isGlobalChat />
      </div>
    </div>
  )
}

export default GlobalSection
