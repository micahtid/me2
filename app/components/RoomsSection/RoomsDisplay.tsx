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
      return <MdDelete size={20} />;
    } else if (room.users.includes(user?.uid)) {
      return <IoExit size={20} />;
    } else {
      return <IoEnter size={20} />;
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
    className={twMerge(
      'p-2.5 bg-black/80 hover:bg-black rounded-xl text-white transition-all duration-200 hover:scale-110',
      'relative group mr-6',
      'flex items-center justify-center',
      disabled && 'opacity-50 cursor-not-allowed hover:bg-black/80 hover:scale-100'
    )}
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
          className={`
            w-full flex flex-col gap-y-4
            rounded-2xl border-2 transition-all duration-200
            ${room.roomId === user?.uid || room.users.includes(user?.uid)
              ? "bg-primary/50 border-secondary/40"
              : "bg-white border-gray-200 hover:border-primary/30"
            }
          `}
        >
          <div className="flex justify-between w-full items-start gap-x-4 px-8 pt-6">
            <div className="flex-grow">
              <div className="flex flex-row items-center gap-x-3 mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{room.description}</h3>
                <span className="
                  px-3 py-1.5
                  bg-white border border-gray-200 rounded-lg
                  text-sm font-semibold text-gray-600
                ">
                  {getHoursAgo(room.createdAt)}h ago
                </span>
              </div>
              <div className="text-gray-600">
                <RoomUserList 
                  display={`${room.users.length}/${room.limit} Users`} 
                  users={users} 
                  roomUserIds={room.users} 
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-x-2 ml-auto mr-6">
              {room.roomId === user?.uid && (
                <a
                  target="_blank"
                  href={room.startUrl}
                  className={twMerge(
                    'p-2.5 bg-black/80 hover:bg-black rounded-xl text-white transition-all duration-200 hover:scale-110',
                    'relative group flex items-center justify-center'
                  )}
                >
                  <ToolTip message="Start Room" className="opacity-0 group-hover:opacity-100" />
                  <MdStart size={20} />
                </a>
              )}

              {room.users.includes(user?.uid) && room.roomId !== user?.uid && (
                <a
                  target="_blank"
                  href={room.joinUrl}
                  className={twMerge(
                    'p-2.5 bg-black/80 hover:bg-black rounded-xl text-white transition-all duration-200 hover:scale-110',
                    'relative group flex items-center justify-center'
                  )}
                >
                  <ToolTip message="Join Room" className="opacity-0 group-hover:opacity-100" />
                  <FaLink size={20} />
                </a>
              )}

              {room.roomId === user?.uid && (
                <button
                  className={twMerge(
                    'p-2.5 bg-black/80 hover:bg-black rounded-xl text-white transition-all duration-200 hover:scale-110',
                    'relative group flex items-center justify-center'
                  )}
                  onClick={() => {
                    setActiveRoom(room);
                    setIsNewRoom(false);
                    onModalOpen();
                  }}
                >
                  <ToolTip message="Edit Room" className="opacity-0 group-hover:opacity-100" />
                  <MdModeEdit size={20} />
                </button>
              )}

              <RoomButton room={room} user={user} disabled={userInAnyRoom && !(room.roomId === user?.uid || room.users.includes(user?.uid))} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 px-8 pb-6">
            {room.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="
                  px-3 py-1.5
                  bg-white border border-gray-200 rounded-lg
                  text-sm font-semibold text-gray-700
                  hover:border-primary/40 hover:bg-primary/5 transition-all duration-200
                "
              >
                {roomTags.find((roomTag) => roomTag.value === tag)?.label || tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomsDisplay;
