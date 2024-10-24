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

  return (
    <button onClick={handleButtonClick} className={`${iconStyles} ${disabled && 'opacity-50 cursor-not-allowed'}`} disabled={disabled}>
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
          className={`w-full flex flex-col gap-y-6 ${
            (room.roomId === user?.uid || room.users.includes(user?.uid)) && "bg-primary/30"
          }`}
        >
          <div className="flex justify-between w-full items-start gap-x-4 px-8 pt-6">
            <div>
              <h3 className="text-xl font-semibold">{room.description}</h3>
              <p className="text-gray-400 mb-2">Created {getHoursAgo(room.createdAt)} hours ago</p>
              <div className="text-gray-600">
                <RoomUserList display={`${room.users.length}/${room.limit} Users`} users={users} roomUserIds={room.users} />
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-2">
              {room.roomId === user?.uid && (
                <a target="_blank" href={room.startUrl} className={iconStyles}>
                  <MdStart />
                </a>
              )}
              {room.users.includes(user?.uid) && room.roomId !== user?.uid && (
                <a target="_blank" href={room.joinUrl} className={iconStyles}>
                  <FaLink />
                </a>
              )}
              {room.roomId === user?.uid && (
                <button
                  className={iconStyles}
                  onClick={() => {
                    setActiveRoom(room);
                    setIsNewRoom(false);
                    onModalOpen();
                  }}
                >
                  <MdModeEdit />
                </button>
              )}
              <RoomButton room={room} user={user} disabled={userInAnyRoom && !(room.roomId === user?.uid || room.users.includes(user?.uid))} />
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-x-2 bg-secondary px-8 py-2">
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
