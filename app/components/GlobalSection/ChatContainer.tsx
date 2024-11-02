"use client";

// Library Imports
import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";

// Own Function Imports
import { getChatData } from "@/app/utils/chatfunctions";
import { sortMessagesByDate } from "@/app/utils/utilfunctions";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useData } from "@/providers/DataProvider";

// Component Imports
import ChatMessage from "../ChatMessage";
import DateDivider from "../DateDivider";

interface ChatContainerProps {
  sending: boolean;
  setSending: Function;
  targetRef: React.RefObject<HTMLDivElement>;
}

// To Do: Add New Date Divisors

const ChatContainer: React.FC<ChatContainerProps> = ({ sending, setSending, targetRef }) => {
  const { globalChat } = useData();
  console.log(globalChat)

  //////////////
  const [dateMessages, setDateMessages] = useState<{date: Date | null, messages: DocumentData[]}[] | null>([]);
  //////////////

  useEffect(() => {
    setTimeout(() => {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [globalChat]);

  useEffect(() => {
    if (globalChat) {
      setDateMessages(sortMessagesByDate(globalChat));
    }
  }, [globalChat])

  return (
    <div className="h-full flex flex-col justify-center gap-y-1">
        {dateMessages && globalChat && dateMessages.map((obj, i) => (
            <div 
            className="flex flex-col gap-y-2"
            key={i}>
                <DateDivider>
                    {obj.date && obj.date.toLocaleDateString('en-US', {month: 'long', day: 'numeric'})}
                </DateDivider>
                {obj.messages && obj.messages.map((message, j) => (
                    <ChatMessage 
                    key={j}
                    document={message} className={`${(j + 1 === globalChat.length && sending) ? "text-gray-400" : ""}`}>

                    </ChatMessage>
                ))}
            </div>
        ))}
        <div className="" ref={targetRef}></div>
    </div>
  );
};


export default ChatContainer;
