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

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});              // Store 'time left' for each chat
  const [notifStatus, setNotifStatus] = useState<{ [key: string]: number }>({});        // Store notification counter for each chat

  const fetchTimeLeft = async (uid1: string, uid2: string) => {
    const chatId = generateChatId(uid1, uid2);
    const hoursLeft = await getTimeLeft(chatId);
    setTimeLeft((prev) => ({ ...prev, [chatId]: Math.floor(hoursLeft ?? 100) }));
  };

  const generateChatId = (uid1: string, uid2: string) => (uid1 > uid2 ? uid1 + uid2 : uid2 + uid1);

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
      const chatIds = activeUsers.map((u) => generateChatId(user.uid, u.uid));                  // Generate all ChatIds in which the user is currently part of (!)
      const unsubscribe = checkNotificationStatus(chatIds, user.uid, setNotifStatus);           // Passing the ChatIds (used as keys) to set notification counter (!)
      return () => unsubscribe();
    }
  }, [user, activeUsers]);

  return (
    <div className="flex flex-col justify-start items-start gap-y-3 min-w-[350px] h-full overflow-y-auto no-scrollbar max-lg:pb-6">
      <h3 className="text-2xl mb-6 ml-8 font-semibold tracking-tight">Chats</h3>
      {activeUsers?.map((u) => {
        if (!user) return null;

        const chatId = generateChatId(user.uid, u.uid);
        const hoursLeft = timeLeft[chatId] !== undefined ? `${timeLeft[chatId]} Hours` : "Loading...";
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
              ${currentUser === u && currentPage === "chat" ? "bg-accent shadow-sm" : ""}
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
              activeStatusClassName={currentUser === u && currentPage === "chat" ? "border-accent" : "border-[#F4F6FB]"}
              className={u.uid === user.uid ? "hidden" : ""}
              statusClassName="bg-white border border-gray-200 text-gray-700 font-medium text-xs px-3 py-1 rounded-lg -ml-1 mt-1"
              status={hoursLeft}
              user={u}
            />
            <button
              className="mr-3 p-1.5 rounded-lg hover:bg-red-50 transition-all duration-200 group"
              onClick={() => {
                setDeleteData({ uid1: user.uid, uid2: u.uid, userName: u.userName });
                onModalOpen();
              }}
            >
              <IoIosClose size={24} className="text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UserDisplay;
