"use client";

import { useRoomModal } from "@/hooks/useRoomModal";
import { useData } from "@/providers/DataProvider";
import { useEffect, useState } from "react";
import RoomsDisplay from "./RoomsDisplay";

const RoomsSection = () => {
  const { onModalOpen, setActiveRoom, setIsNewRoom } = useRoomModal();
  const { rooms, user } = useData();

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (rooms && user) {
      if (rooms.some(room => room.roomId === user.uid)) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [rooms, user]); 

  return (
    <div className="h-full flex flex-col justify-start items-start gap-y-3 max-lg:pb-6 overflow-y-auto no-scrollbar pb-5 w-full">
      <h3 className="ml-8 text-2xl mb-2 font-semibold">Study Rooms</h3>
      <button
        className={`ml-8 py-2 text-black/80 font-medium px-4 mb-6 rounded-lg bg-primary
          ${disabled && 'bg-gray-500/30'}`}
        disabled={disabled}
        onClick={() => {
          setActiveRoom(null);
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
