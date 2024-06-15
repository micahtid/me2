
// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useActivePage } from "@/hooks/useActivePage";

// Component Imports
import UserCard from "./UserCard";

const UserDisplay = () => {

  const { onChange } = useActiveUserChat();
  const { onChange: changePage } = useActivePage();

  const { user, activeUsers } = useData();

  return (
    <div
      className="
    flex flex-col justify-start items-start gap-y-3"
    >
      {activeUsers &&
        activeUsers.map((u, index) => (
          <UserCard
            onClick={() => {
              if (user) {
                const chatid =
                  user.uid > u.uid
                    ? user.uid + u.uid
                    : u.uid + user.uid;

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
