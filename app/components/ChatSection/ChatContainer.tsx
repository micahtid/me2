"use client";

// Library Imports
import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";

// Own Function Imports
import { getChatData } from "@/app/utils/chatfunctions";
import { sortMessagesByDate } from "@/app/utils/utilfunctions";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";

// Component Imports
import ChatMessage from "../ChatMessage";
import DateDivider from "../DateDivider";

// Types
interface ChatContainerProps {
  sending: boolean;
  setSending: Function;
  targetRef: React.RefObject<HTMLDivElement>;
}

// Utility Functions
const isWithinFiveMinutes = (time1: Date, time2: Date): boolean => {
  return Math.abs(time1.getTime() - time2.getTime()) <= 5 * 60 * 1000;
};

const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true 
  });
};

const ChatContainer: React.FC<ChatContainerProps> = ({ sending, setSending, targetRef }) => {
  // Hooks
  const { currentChat } = useActiveUserChat();

  // State
  const [messages, setMessages] = useState<DocumentData[]>();
  const [dateMessages, setDateMessages] = useState<{date: Date | null, messages: DocumentData[]}[] | null>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effects
  useEffect(() => {
    const unsubscribe = getChatData(currentChat, setMessages, setIsLoaded);
    return () => unsubscribe();
  }, [currentChat]);

  useEffect(() => {
    setTimeout(() => {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    if (messages) {
      setDateMessages(sortMessagesByDate(messages));
    }
  }, [messages])

  // Render message with timestamp logic
  const renderMessage = (message: DocumentData, index: number, messagesArray: DocumentData[]) => {
    // Time calculations
    const currentMessageTime = message.createdAt ? message.createdAt.toDate() : new Date();
    const prevMessage = index > 0 ? messagesArray[index - 1] : null;
    const prevMessageTime = prevMessage?.createdAt ? prevMessage.createdAt.toDate() : null;
    
    // Timestamp visibility logic
    const showTimestamp = message.createdAt && (
      index === 0 || // First message of the day
      !!(prevMessage && ( // Double bang to ensure boolean
        prevMessage.uid !== message.uid || // Different user
        (prevMessageTime && !isWithinFiveMinutes(currentMessageTime, prevMessageTime)) // Or more than 5 minutes apart
      ))
    );

    return (
      <ChatMessage 
        key={index}
        document={message}
        showTimestamp={!!showTimestamp}
        timestamp={message.createdAt ? formatMessageTime(currentMessageTime) : undefined}
        className={`${(index + 1 === messages?.length && sending) ? "text-gray-400" : ""}`} 
      />
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        {isLoaded && (
          <div className="flex flex-col justify-center gap-y-1">
            {/* Messages grouped by date */}
            {dateMessages && messages && dateMessages.map((dateGroup, index) => (
              <div className="flex flex-col gap-y-2" key={index}>
                {/* Date header */}
                <DateDivider>
                  {dateGroup.date && dateGroup.date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </DateDivider>
                
                {/* Messages for this date */}
                {dateGroup.messages && dateGroup.messages.map((message, j) => 
                  renderMessage(message, j, dateGroup.messages)
                )}
              </div>
            ))}
            
            {/* Scroll anchor */}
            <div ref={targetRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
