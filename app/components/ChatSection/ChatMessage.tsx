
import { DocumentData } from "firebase/firestore";
import { twMerge } from "tailwind-merge";
import { useData } from "@/providers/DataProvider";

interface ChatMessageProps {
  document: DocumentData;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ document, className }) => {
  const { user } = useData();

  const messageClass =
    document.uid == user?.uid ? "sent" : "recieved";

  return (
    <div
      className={twMerge(`${messageClass == "sent" ? "justify-end" : "justify-start"}
      w-full flex flex-row`, className)}
    >
      <p className={`${messageClass == "sent" ? "bg-blue-400/50" : "bg-gray-500/10"}
      p-3 rounded-2xl max-w-[60%]`}>
        {document.text}
      </p>
    </div>
  );
};

export default ChatMessage