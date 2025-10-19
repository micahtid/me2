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
        className={`
          ml-8 mb-4 px-3 py-2
          bg-primary border border-secondary/40
          text-header font-medium text-sm
          rounded-lg
          transition-all duration-200
          flex items-center gap-x-2
          hover:bg-primary/80 hover:border-secondary
          ${disabled && 'opacity-50 cursor-not-allowed hover:bg-primary hover:border-secondary/40'}
        `}
        disabled={disabled}
        onClick={() => {
          setActiveRoom(null);
          setIsUpdated(!isUpdated);
          setIsNewRoom(true);
          onModalOpen();
        }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6V18M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Create Room
      </button>
      <RoomsDisplay />
    </div>
  );
};

export default RoomsSection;
