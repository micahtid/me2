"use client";

import { useData } from "@/providers/DataProvider";
import { DocumentData } from "firebase/firestore";
import { useRoomModal } from "@/hooks/useRoomModal";
import { deleteRoom, joinRoom, leaveRoom } from "@/app/utils/roomfunctions";
import { roomTags } from "@/app/data";

import { FaClock, FaLink } from "react-icons/fa";
import { IoEnter, IoExit } from "react-icons/io5";
import { MdDelete, MdModeEdit, MdStart } from "react-icons/md";

import RoomUserList from "./RoomUserList";

const iconStyles = `p-2 bg-black/80 rounded-full text-white`

interface RoomButtonProps {
  room: DocumentData;
  user: DocumentData | undefined | null;
}

const RoomButton: React.FC<RoomButtonProps> = ({ room, user }) => {
  const handleButtonClick = () => {
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
    <button onClick={handleButtonClick}
    className={iconStyles}>
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

  return (
    <div className="flex flex-col justify-start items-start gap-y-4
    w-full">
      {rooms?.map((room, index) => (
        <div key={index} className={`
        w-full bg-gray-100
        p-8 rounded-lg shadow-md
        flex flex-col gap-y-6
        ${(room.roomId === user?.uid || room.users.includes(user?.uid)) && "bg-primary/30"}
        `}>
          <div className="flex justify-between w-full items-start gap-x-4">
            <div className="">
              <h3 className="text-xl font-semibold">{room.description}</h3>
              <p className="text-gray-500 mb-2">Created {getHoursAgo(room.createdAt)} hours ago</p>
              <div className="text-gray-500">
                <RoomUserList display={`${room.users.length}/${room.limit} Users`}
                users={users}
                roomUserIds={room.users} />
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-2">
              {
                room.users.includes(user?.uid) && (
                  <a 
                  target="_blank"
                  href={room.startUrl}
                  className={iconStyles}>
                    <MdStart />
                  </a>
                )
              }
              {
                room.users.includes(user?.uid) && (
                  <a 
                  target="_blank"
                  href={room.joinUrl}
                  className={iconStyles}>
                    <FaLink />
                  </a>
                )
              }
              {
                room.roomId === user?.uid && (
                  <button className={iconStyles}
                  onClick={() => {
                    setActiveRoom(room);
                    setIsNewRoom(false);
                    onModalOpen();
                  }}>
                    <MdModeEdit />
                  </button>
                )
              }
              <RoomButton room={room} user={user} />
            </div>
          </div>
          <div className="flex flex-row justify-start items-center gap-x-2">
              {room.tags.map((tag: string, index: number) => (
                <div key={index} className="px-2 py-1 rounded-lg bg-secondary">
                  {roomTags.find((roomTag) => roomTag.value === tag)?.label || tag}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>  
  )
}

export default RoomsDisplay