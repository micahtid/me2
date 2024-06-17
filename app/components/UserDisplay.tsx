// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useActivePage } from "@/hooks/useActivePage";
import { IoIosClose } from "react-icons/io";

// Own Function Imports
import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import { getTimeLeft } from "../utils/utilfunctions";
import { deleteChat } from "../utils/chatfunctions";

// Component Imports
import UserCard from "./UserCard";
import { useEffect, useState } from "react";

const UserDisplay = () => {
  const { onChange, currentUser, setChatComplete } = useActiveUserChat();
  const { onChange: changePage, currentPage } = useActivePage();
  const { user, activeUsers } = useData();
  const { onModalOpen, setDeleteData } = useConfirmationModal();

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchTimeLeft = async (uid1: string, uid2: string) => {
      const chatid = uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
      const hoursLeft = await getTimeLeft(chatid);

      setTimeLeft((prevTimeLeft) => ({
        ...prevTimeLeft, 
        [chatid]: Math.floor(hoursLeft ?? 0),
      }));
    };

    // Fetch the time left for each active user
    if (user && activeUsers) {
      activeUsers.forEach((u) => {
        fetchTimeLeft(user.uid, u.uid);
      });
    }
  }, [user, activeUsers]);

  return (
    <div className="flex flex-col justify-start items-start gap-y-3 min-w-[350px]">
      <h3 className="text-2xl mb-6 ml-2">Chats</h3>
      {activeUsers &&
        activeUsers.map((u, index) => {
          if (!user) return null;

          const chatid = user.uid > u.uid ? user.uid + u.uid : u.uid + user.uid;
          const hoursLeft = timeLeft[chatid] !== undefined ? `${timeLeft[chatid]} Hours` : "Loading...";

          // To-Do Run Code Here
          if (timeLeft[chatid] <= 0) {
            deleteChat(chatid);
            console.log("Delete the chat!")
          } else if (timeLeft[chatid] <= 12) {
            console.log("Only able to share socials!")
          } else {
            console.log("Continue chatting :)")
          }

          return (
            <div
              key={index}
              className={`flex flex-row justify-between items-center gap-x-2 w-full user-card-primary
                ${currentUser === u && currentPage === "chat" ? "bg-accent" : ""}`}
            >
              <UserCard
                onClick={() => {
                  if (user) {
                    onChange(u, chatid);
                    changePage("chat");

                    // To-Do Run Code Her
                    if (timeLeft[chatid] <= 12 && timeLeft[chatid] > 0) {
                      setChatComplete(true);
                    } else {
                      setChatComplete(false);
                    }
                  }
                }}
                className={`${user && u.uid === user.uid ? "hidden" : ""}`}
                status={hoursLeft}
                user={u}
              />
              <button
                className="mr-2"
                onClick={() => {
                  if (user) {
                    const deleteData = {
                      uid1: user.uid,
                      uid2: u.uid,
                      userName: u.userName,
                    };

                    setDeleteData(deleteData);
                    onModalOpen();
                  }
                }}
              >
                <IoIosClose size={30} />
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default UserDisplay;
