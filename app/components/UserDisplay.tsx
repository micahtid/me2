import { signOut, createChat } from "@/app/utils/databasefunctions";
import { checkChat } from "@/app/utils/filterfunctions";

import UserCard from "./UserCard";

import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useActivePage } from "@/hooks/useActivePage";

import { DocumentData } from "firebase/firestore";

interface UserDisplayProps {
  users: DocumentData[] | undefined | null;
  user: DocumentData | null | undefined;
  chats: DocumentData[] | undefined;
}

const UserDisplay: React.FC<UserDisplayProps> = ({
  users,
  user,
  chats
}) => {

  const { onChange } = useActiveUserChat();
  const { onChange: changePage } = useActivePage();

  return (
    <div
      className="
    flex flex-col justify-start items-start gap-y-3"
    >
      {users &&
        users.map((u, index) => (
          <UserCard
            onClick={() => {
              if (user) {
                const chatid =
                  user.uid > u.uid
                    ? user.uid + u.uid
                    : u.uid + user.uid;

                // if (!checkChat(chatid, chats)) {
                //   createChat(chatid, user.uid, u.uid, true);
                // }

                onChange(u, chatid);
                changePage('chat');
              }
            }}
            className={`${user && u.uid == user.uid ? "hidden" : ""}`}
            status="24 Hours"
            user={u}
            key={index}
          />
        ))}
    </div>
  );
};

export default UserDisplay;
