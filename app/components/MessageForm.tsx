"use client"

import { useState } from "react"
import { sendMessage } from "@/app/utils/chatfunctions";
import { sendGlobalChatMessage } from "../utils/globalchatfunctions";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { IoSend } from "react-icons/io5";

interface MessageFormProps {
    setSending: Function;
    targetRef: React.RefObject<HTMLDivElement>;
    isGlobalChat: boolean;
}

const MessageForm: React.FC<MessageFormProps> = ({ setSending, targetRef, isGlobalChat }) => {
  const { currentChat } = useActiveUserChat();
  const [formValue, setFormValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValue) {
      if (isGlobalChat) {
        sendGlobalChatMessage(e, formValue, setFormValue, setSending)
      } else {  
        sendMessage(e, currentChat, formValue, setFormValue, setSending);
      }
      setSending(true);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full mt-6"
    >
      <div className="
        w-full
        flex items-center
        bg-black/[2.5%]
        rounded-2xl
        shadow-sm
        px-4 py-2.5
        border border-black/20
        transition duration-200
      ">
        <input
          type="text"
          placeholder="Type your message..."
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="
            flex-1
            bg-transparent
            outline-none
            placeholder:text-gray-400
          "
        />
        <button 
          type="submit"
          className="
            p-2
            bg-blue-500/80 text-white
            rounded-lg
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
          disabled={!formValue}
        >
          <IoSend size={18} />
        </button>
      </div>
    </form>
  )
}

export default MessageForm