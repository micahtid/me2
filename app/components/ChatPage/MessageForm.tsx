"use client"

import { useState } from "react"

import { sendMessage } from "@/app/utils/databasefunctions"
import { useActiveChat } from "@/hooks/useActiveChat"

interface MessageFormProps {
    setSending: Function,
    targetRef: React.RefObject<HTMLDivElement>;
}

const MessageForm: React.FC<MessageFormProps> = ({ setSending, targetRef }) => {
  const { currentChat } = useActiveChat();
  const [formValue, setFormValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    sendMessage(e, currentChat, formValue, setFormValue, targetRef, setSending);
    setSending(true);
  };

  return (
    <form className="flex flex-row
    bg-gray-400/20 rounded-full p-1 mt-8" onSubmit={handleSubmit}>
          <input
          type="text"
          placeholder="Enter Message..."
          className="flex-grow outline-none bg-transparent ml-5"
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value)
          }}
          />
          <button type="submit" className="py-3 px-8 rounded-full bg-blue-700 text-white font-bold uppercase">Send</button>
      </form>
  )
}

export default MessageForm