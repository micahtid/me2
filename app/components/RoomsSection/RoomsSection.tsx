"use client";

import { useRoomModal } from "@/hooks/useRoomModal";
import { useData } from "@/providers/DataProvider";
import { useEffect, useState } from "react";
import RoomsDisplay from "./RoomsDisplay";

const RoomsSection = () => {
  const { onModalOpen, setActiveRoom, setIsNewRoom, isUpdated, setIsUpdated } = useRoomModal();
  const { rooms, user } = useData();

  const [disabled, setDisabled] = useState(false);                                // Prevent user from being in more than one room (!)

  useEffect(() => {
    if (rooms && user) {
      const isInOrOwnsRoom = rooms.some(
        (room) => room.roomId === user.uid || room.users.includes(user.uid)       // Check if the user's ID is in any existing rooms/is the RoomID (creator)
      );
      setDisabled(isInOrOwnsRoom);                                         
    }
  }, [rooms, user]);

  return (
    <div className="h-full flex flex-col justify-start items-start gap-y-3 max-lg:pb-6 overflow-y-auto no-scrollbar pb-5 w-full">
      <h3 className="ml-8 text-2xl mb-2 font-semibold">Study Rooms</h3>
      <button
        className={`ml-8 py-2 text-black/80 font-medium px-4 mb-6 rounded-lg bg-primary
          ${disabled && 'opacity-50'}`}
        disabled={disabled}
        onClick={() => {
          setActiveRoom(null);
          setIsUpdated(!isUpdated);
          setIsNewRoom(true);
          onModalOpen();
        }}
      >
        Create Room
      </button>
      <RoomsDisplay />
    </div>
  );
};

export default RoomsSection;
