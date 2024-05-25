import { DocumentData } from "firebase/firestore";

import { getUserAuth } from "../databasefunctions";

const auth = getUserAuth();

interface ChatMessageProps {
  document: DocumentData;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ document }) => {
  const messageClass =
    document.uid == auth.currentUser?.uid ? "sent" : "recieved";

  return (
    <div
      className={`${messageClass == "sent" ? "text-blue-500" : "text-red-500"}`}
    >
      {document.text}
    </div>
  );
};

export default ChatMessage