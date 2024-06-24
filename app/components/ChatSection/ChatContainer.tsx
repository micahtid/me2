"use client";

// Library Imports
import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";

// Own Function Imports
import { getChatData } from "@/app/utils/chatfunctions";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";

// Component Imports
import ChatMessage from "./ChatMessage";

interface ChatContainerProps {
  sending: boolean;
  setSending: Function;
  targetRef: React.RefObject<HTMLDivElement>;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ sending, setSending, targetRef }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<DocumentData[]>();
  const { currentChat } = useActiveUserChat();

  useEffect(() => {
    const unsubscribe = getChatData(
      currentChat,
      setMessages,
      setIsLoaded
    );
    return () => unsubscribe();
  }, [currentChat]);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        {isLoaded && (
          <div className="flex flex-col justify-center gap-y-7">
            {messages &&
              messages.map((msg, index) => (
                <ChatMessage key={index} document={msg} className={`${(index+1 === messages.length && sending) ? "text-gray-400" : ""}`} />
              ))}
            <div ref={targetRef}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
