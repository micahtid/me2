import { DocumentData } from "firebase/firestore";
import { twMerge } from "tailwind-merge";
import { useData } from "@/providers/DataProvider";

interface ChatMessageProps {
  document: DocumentData;
  className?: string;
  profilePicture?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ document, className, profilePicture }) => {
  const { user, users } = useData();

  const messageClass = document.uid === user?.uid ? "sent" : "received";
  const userWhoSentMessage = users?.find((u) => u.uid === document.uid);
  const pfp = userWhoSentMessage ? userWhoSentMessage.pfp : "";

  return (
    <div
      className={twMerge(
        `${messageClass === "sent" ? "justify-end" : "justify-start"} items-center w-full flex flex-row`,
        className
      )}
    >
      {profilePicture && (
        <img
          src={pfp}
          alt="Profile"
          className={twMerge(
            `w-[35px] h-[35px] rounded-full`,
            messageClass === "sent" ? "order-2 ml-4" : "order-1 mr-4"
          )}
        />
      )}

      <p
        className={`${messageClass === "sent" ? "bg-blue-400/50" : "bg-gray-500/10"}
        p-3 rounded-2xl max-w-[60%] ${messageClass === "sent" ? "order-1" : "order-2"}`}
      >
        {document.text}
      </p>
    </div>
  );
};

export default ChatMessage;
