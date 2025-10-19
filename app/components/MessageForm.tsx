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
        bg-white
        rounded-2xl
        px-4 py-2.5
        border-2 border-gray-200
        transition-all duration-200
        focus-within:border-primary focus-within:bg-primary/5
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
            p-2.5
            bg-blue-500/80 text-white
            rounded-xl
            disabled:opacity-60
            disabled:cursor-not-allowed
            hover:bg-blue-500 hover:scale-110 transition-all duration-200
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