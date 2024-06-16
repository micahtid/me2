// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useActivePage } from "@/hooks/useActivePage";
import { IoIosClose } from "react-icons/io";

// Own Function Imports
import { useConfirmationModal } from "@/hooks/useConfirmationModal";

// Component Imports
import UserCard from "./UserCard";

const UserDisplay = () => {
  const { onChange, currentUser } = useActiveUserChat();
  const { onChange: changePage, currentPage } = useActivePage();

  const { user, activeUsers } = useData();
  const { onModalOpen, setDeleteData } = useConfirmationModal();

  return (
    <div
      className="
    flex flex-col justify-start items-start gap-y-3 min-w-[350px]"
    >
      <h3 className="text-2xl mb-6 ml-2">Chats</h3>
      {activeUsers &&
        activeUsers.map((u, index) => (
          <div className={`flex flex-row justify-between items-center gap-x-2 w-full 
          bg-secondary rounded-lg px-4 py-2 border-2 border-white
          ${currentUser === u && currentPage === "chat" ? "bg-accent" : ""}`}>
            <UserCard
              onClick={() => {
                if (user) {
                  const chatid =
                    user.uid > u.uid ? user.uid + u.uid : u.uid + user.uid;

                  onChange(u, chatid);
                  changePage("chat");
                }
              }}
              className={`${user && u.uid == user.uid ? "hidden" : ""}`}
              status="24 Hours"
              user={u}
              key={index}
            />
            <button className="mr-2"
            onClick={() => {
              if (user) {
                const deleteData = {
                  uid1: user.uid,
                  uid2: u.uid,
                  userName: u.userName,
                }

                setDeleteData(deleteData);
                onModalOpen();
              }
            }}>
              <IoIosClose size={30} />
            </button>
          </div>
        ))}
    </div>
  );
};

export default UserDisplay;
