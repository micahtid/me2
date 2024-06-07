import { DocumentData } from "firebase/firestore";

import { getUserAuth } from "../../utils/databasefunctions";
import { twMerge } from "tailwind-merge";

const auth = getUserAuth(false);

interface ChatMessageProps {
  document: DocumentData;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ document, className }) => {
  const messageClass =
    document.uid == auth.currentUser?.uid ? "sent" : "recieved";

  return (
    <div
      className={twMerge(`${messageClass == "sent" ? "justify-end" : "justify-start"}
      w-full flex flex-row`, className)}
    >
      <p className={`${messageClass == "sent" ? "bg-blue-400/50" : "bg-gray-500/10"}
      p-3 rounded-lg max-w-[60%]`}>
        {document.text}
      </p>
    </div>
  );
};

export default ChatMessage