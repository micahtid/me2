"use client";

import { useData } from "@/providers/DataProvider";
import { DocumentData } from "firebase/firestore";
import { useRoomModal } from "@/hooks/useRoomModal";
import { deleteRoom, joinRoom, leaveRoom } from "@/app/utils/roomfunctions";
import { roomTags } from "@/app/data";
import { FaLink } from "react-icons/fa";
import { IoEnter, IoExit } from "react-icons/io5";
import { MdDelete, MdModeEdit, MdStart } from "react-icons/md";

import RoomUserList from "./RoomUserList";
import { twMerge } from "tailwind-merge";

interface ToolTipProps {
  message: string;
  className?: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ message, className }) => {
  return (
    <div className={twMerge(`
    absolute left-1/2 transform -translate-x-1/2 -top-[40px]
    bg-black/80 text-nowrap py-1 px-2 rounded-lg
    transition-all duration-150`, className)}>
      {message}
    </div>
  )
}

const iconStyles = `p-2 bg-black/80 rounded-full text-white`;

interface RoomButtonProps {
  room: DocumentData;
  user: DocumentData | undefined | null;
  disabled?: boolean;
}

const RoomButton: React.FC<RoomButtonProps> = ({ room, user, disabled }) => {
  const handleButtonClick = () => {
    if (disabled) return;

    if (room.roomId === user?.uid) {
      deleteRoom(room.roomId);
    } else if (room.users.includes(user?.uid)) {
      leaveRoom(room.roomId, user?.uid);
    } else {
      if (room.users.length + 1 <= room.limit) {
        joinRoom(user?.uid, room.roomId);
      }
    }
  };

  const renderIcon = () => {
    if (room.roomId === user?.uid) {
      return <MdDelete />;
    } else if (room.users.includes(user?.uid)) {
      return <IoExit />;
    } else {
      return <IoEnter />;
    }
  };

  const getToolTipMessage = () => {
    if (room.roomId === user?.uid) {
      return "Delete Room";
    } else if (room.users.includes(user?.uid)) {
      return "Leave Room";
    } else {
      return "Join Room";
    }
  }

  return (
    <button 
    onClick={handleButtonClick} 
    className={twMerge(iconStyles, 'relative group')} 
    disabled={disabled}>
      <ToolTip message={getToolTipMessage()} className="opacity-0 group-hover:opacity-100" />
      {renderIcon()}
    </button>
  );
};

const RoomsDisplay = () => {
  const { rooms, user, users } = useData();
  const { onModalOpen, setActiveRoom, setIsNewRoom } = useRoomModal();

  const getHoursAgo = (createdAt: any) => {
    if (!createdAt) return "Unknown time";
    
    const createdDate = createdAt.toDate();
    const currentDate = new Date();
    const differenceInMs = currentDate.getTime() - createdDate.getTime();
    const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60)); 

    return differenceInHours;
  };

  const sortedRooms = rooms?.slice().sort((roomA, roomB) => {                                       // Move user's active room to the top of the list (!)
    const userInRoomA = roomA.roomId === user?.uid || roomA.users.includes(user?.uid);
    const userInRoomB = roomB.roomId === user?.uid || roomB.users.includes(user?.uid);
    
    return userInRoomB - userInRoomA;                                                               // Place user's room before other rooms (!)
  });

  const userInAnyRoom = sortedRooms?.some((room) => room.roomId === user?.uid || room.users.includes(user?.uid));     // Status if user is currently in any other rooms 

  return (
    <div className="flex flex-col gap-y-3 justify-start items-start w-full">
      {sortedRooms?.map((room, index) => (
        <div
          key={index}
          className={`w-full flex flex-col gap-y-6 rounded-lg shadow-sm ${
            (room.roomId === user?.uid || room.users.includes(user?.uid)) ? "bg-primary/30" : "bg-gray-200/[25%]"
          }`}
        >
          <div className="flex justify-between w-full items-start gap-x-4 pl-8 pr-16 pt-6">
            <div className="flex-grow">
              <div className="flex flex-row items-center gap-x-3 mb-2">
                <h3 className="text-xl font-semibold">{room.description}</h3>
                <p className="text-gray-400 text-sm">Created {getHoursAgo(room.createdAt)} hours ago</p>
              </div>
              <div className="text-gray-600">
                <RoomUserList display={`${room.users.length}/${room.limit} Users`} users={users} roomUserIds={room.users} />
              </div>
            </div>

            <div className="flex justify-center items-center gap-x-2 ml-auto">
              {room.roomId === user?.uid && (
                <a target="_blank" href={room.startUrl} className={twMerge(iconStyles, 'relative group')}>
                  <ToolTip message="Start Room" className="opacity-0 group-hover:opacity-100" />
                  <MdStart />
                </a>
              )}

              {room.users.includes(user?.uid) && room.roomId !== user?.uid && (
                <a target="_blank" href={room.joinUrl} className={twMerge(iconStyles, 'relative group')}>
                  <ToolTip message="Join Room" className="opacity-0 group-hover:opacity-100" />
                  <FaLink />
                </a>
              )}

              {room.roomId === user?.uid && (
                <button
                  className={twMerge(iconStyles, 'relative group')}
                  onClick={() => {
                    setActiveRoom(room);
                    setIsNewRoom(false);
                    onModalOpen();
                  }}
                >
                  <ToolTip message="Edit Room" className="opacity-0 group-hover:opacity-100" />
                  <MdModeEdit />
                </button>
              )}

              <RoomButton room={room} user={user} disabled={userInAnyRoom && !(room.roomId === user?.uid || room.users.includes(user?.uid))} />
            </div>
          </div>

          <div className="flex flex-row justify-start items-center gap-x-2 bg-secondary px-8 py-2 rounded-b-lg">
            {room.tags.map((tag: string, index: number) => (
              <div key={index} className="font-medium bg-white/50 px-2 py-1 rounded-lg">
                {roomTags.find((roomTag) => roomTag.value === tag)?.label || tag}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomsDisplay;
