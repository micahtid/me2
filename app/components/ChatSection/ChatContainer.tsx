"use client";

import { useState, useEffect } from "react";

import { getChatData } from "../../utils/databasefunctions";
import ChatMessage from "./ChatMessage";

import {
  initializeFirebase,
  getUserAuth,
  getFireStore,
} from "../../utils/databasefunctions";
import { DocumentData } from "firebase/firestore";

interface ChatContainerProps {
  sending: boolean;
  setSending: Function;
  targetRef: React.RefObject<HTMLDivElement>;
  currentChat: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ sending, setSending, targetRef, currentChat }) => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);
  const firestore = getFireStore(true);

  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<DocumentData[]>();

  useEffect(() => {
    const unsubscribe = getChatData(
      firestore,
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
          <div className="flex flex-col justify-center gap-y-4">
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
