"use client";

// Library Imports
import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";

// Own Function Imports
import { getChatData } from "@/app/utils/chatfunctions";
import { sortMessagesByDate } from "@/app/utils/utilfunctions";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";

// Component Imports
import ChatMessage from "./ChatMessage";
import DateDivider from "./DateDivider";

interface ChatContainerProps {
  sending: boolean;
  setSending: Function;
  targetRef: React.RefObject<HTMLDivElement>;
}

// To Do: Add New Date Divisors

const ChatContainer: React.FC<ChatContainerProps> = ({ sending, setSending, targetRef }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<DocumentData[]>();
  const { currentChat } = useActiveUserChat();

  //////////////
  const [dateMessages, setDateMessages] = useState<{date: Date | null, messages: DocumentData[]}[] | null>([]);
  //////////////

  useEffect(() => {
    const unsubscribe = getChatData(currentChat, setMessages, setIsLoaded);
    return () => unsubscribe();
  }, [currentChat]);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (messages) {
      setDateMessages(sortMessagesByDate(messages));
    }
  }, [messages])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        {isLoaded && (
          <div className="flex flex-col justify-center gap-y-1">
            {dateMessages && messages && dateMessages.map((obj, i) => (
              <div 
              className="flex flex-col gap-y-2"
              key={i}>
                <DateDivider>
                  {obj.date && obj.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </DateDivider>
                {obj.messages && obj.messages.map((message, j) => (
                    <ChatMessage 
                    key={j}
                    document={message} className={`${(j + 1 === messages.length && sending) ? "text-gray-400" : ""}`} />
                ))}
              </div>
            ))}
            <div ref={targetRef}></div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ChatContainer;
