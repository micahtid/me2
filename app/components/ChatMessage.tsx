import { DocumentData } from "firebase/firestore";
import { twMerge } from "tailwind-merge";
import { useData } from "@/providers/DataProvider";

// Types
interface ChatMessageProps {
  document: DocumentData;
  className?: string;
  profilePicture?: boolean;
  showTimestamp?: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  document, 
  className, 
  profilePicture,
  showTimestamp,
  timestamp 
}) => {
  // Hooks
  const { user, users } = useData();

  // Derived state
  const messageClass = document.uid === user?.uid ? "sent" : "received";
  const userWhoSentMessage = users?.find((u) => u.uid === document.uid);
  const pfp = userWhoSentMessage?.pfp || "";

  // Style classes
  const messageContainerClass = twMerge(
    `${messageClass === "sent" ? "justify-end" : "justify-start"} items-center w-full flex flex-row`,
    className
  );

  const profilePictureClass = twMerge(
    "w-[35px] h-[35px] rounded-full",
    messageClass === "sent" ? "order-2 ml-4" : "order-1 mr-4"
  );

  const messageTextClass = `
    ${messageClass === "sent" ? "bg-blue-400/50" : "bg-gray-500/10"}
    p-3 rounded-2xl max-w-[60%] 
    ${messageClass === "sent" ? "order-1" : "order-2"}
  `;

  return (
    <div className="flex flex-col">
      {/* Timestamp */}
      {showTimestamp && (
        <div className={`w-full flex ${messageClass === "sent" ? "justify-end" : "justify-start"} mb-1`}>
          <span className="text-xs text-gray-400 px-2">
            {timestamp}
          </span>
        </div>
      )}

      {/* Message Content */}
      <div className={messageContainerClass}>
        {/* Profile Picture */}
        {profilePicture && (
          <img
            src={pfp}
            alt="Profile"
            className={profilePictureClass}
          />
        )}

        {/* Message Text */}
        <p className={messageTextClass}>
          {document.text}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
