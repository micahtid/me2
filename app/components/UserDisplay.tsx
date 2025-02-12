import { useState, useEffect } from "react";

// Hook Imports
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { useActivePage } from "@/hooks/useActivePage";
import { useConfirmationModal } from "@/hooks/useConfirmationModal";

// Function Imports
import { getTimeLeft } from "../utils/utilfunctions";
import { deleteChat, checkNotificationStatus } from "../utils/chatfunctions";
import { removeUserFromUserChats } from "../utils/usersfunctions";

// Component Imports
import UserCard from "./UserCard";
import { IoIosClose } from "react-icons/io";

const FETCH_INTERVAL = 60000; // Fetch every 60 seconds

const UserDisplay = () => {
  const { onChange, currentUser, setChatComplete } = useActiveUserChat();
  const { onChange: changePage, currentPage } = useActivePage();
  const { user, activeUsers } = useData();
  const { onModalOpen, setDeleteData } = useConfirmationModal();

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({}); // Store 'time left' for each chat
  const [notifStatus, setNotifStatus] = useState<{ [key: string]: number }>({}); // Store notification counter for each chat

  const fetchTimeLeft = async (uid1: string, uid2: string) => {
    const chatId = generateChatId(uid1, uid2);
    const hoursLeft = await getTimeLeft(chatId);
    setTimeLeft((prev) => ({
      ...prev,
      [chatId]: Math.floor(hoursLeft ?? 100),
    }));
  };

  const generateChatId = (uid1: string, uid2: string) =>
    uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;

  // Display how much time is left on a chat (!)
  useEffect(() => {
    if (user && activeUsers) {
      activeUsers.forEach((u) => fetchTimeLeft(user.uid, u.uid));

      const interval = setInterval(() => {
        activeUsers.forEach((u) => fetchTimeLeft(user.uid, u.uid));
      }, FETCH_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [user, activeUsers]);

  useEffect(() => {
    if (user && activeUsers) {
      const chatIds = activeUsers.map((u) => generateChatId(user.uid, u.uid)); // Generate all ChatIds in which the user is currently part of (!)
      const unsubscribe = checkNotificationStatus(
        chatIds,
        user.uid,
        setNotifStatus,
      ); // Passing the ChatIds (used as keys) to set notification counter (!)
      return () => unsubscribe();
    }
  }, [user, activeUsers]);

  return (
    <div className="flex flex-col justify-start items-start gap-y-3 min-w-[350px] h-full overflow-y-auto no-scrollbar max-lg:pb-6">
      <h3 className="text-2xl mb-6 mt-4 ml-8 font-semibold tracking-tight">
        Chats
      </h3>
      {activeUsers?.map((u) => {
        if (!user) return null;

        const chatId = generateChatId(user.uid, u.uid);
        const hoursLeft =
          timeLeft[chatId] !== undefined
            ? `${timeLeft[chatId]} Hours`
            : "Loading...";
        const notificationCount = notifStatus[chatId] || 0;

        if (timeLeft[chatId] <= 0) {
          deleteChat(chatId);
          removeUserFromUserChats(user.uid, u.uid);
          removeUserFromUserChats(u.uid, user.uid);
        }

        return (
          <div
            key={u.uid}
            className={`
              flex flex-row justify-between items-center gap-x-2 w-full user-card 
              transition-all duration-200 hover:bg-black/5
              ${currentUser === u && currentPage === "chat" ? "bg-accent/50" : ""}
            `}
          >
            <UserCard
              onClick={() => {
                onChange(u, chatId);
                changePage("chat");
                setChatComplete(timeLeft[chatId] <= 12 && timeLeft[chatId] > 0);
              }}
              notificationCount={notificationCount}
              activeStatus
              activeStatusClassName={
                currentUser === u && currentPage === "chat"
                  ? "border-accent"
                  : "border-[#F4F6FB]"
              }
              className={u.uid === user.uid ? "hidden" : ""}
              statusClassName="bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-0.5 rounded-2xl -ml-1 mt-1"
              status={hoursLeft}
              user={u}
            />
            <button
              className="mr-2 p-2 rounded-full hover:bg-black/5 transition-colors duration-200"
              onClick={() => {
                setDeleteData({
                  uid1: user.uid,
                  uid2: u.uid,
                  userName: u.userName,
                });
                onModalOpen();
              }}
            >
              <IoIosClose
                size={30}
                className="text-black/60 hover:text-black transition-colors duration-200"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UserDisplay;
