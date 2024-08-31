"use client"

import { useRoomModal } from "@/hooks/useRoomModal"
import { useData } from "@/providers/DataProvider";
import { useEffect } from "react";

import RoomsDisplay from "./RoomsDisplay";

const RoomsSection = () => {
  const { onModalOpen, setActiveRoom, setIsNewRoom } = useRoomModal();
  const { rooms } = useData();

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  return (
    <div
    className='flex flex-col justify-start items-start gap-y-3
    max-lg:pb-6 overflow-y-auto no-scrollbar pb-5 w-full'>
        <h3 className="text-2xl mb-6 ml-2 font-semibold">Study Rooms</h3>
        <RoomsDisplay />
        <button className='px-4 py-2 rounded-lg bg-primary'
        onClick={() => {
          setActiveRoom(null);
          setIsNewRoom(true);
          onModalOpen();
        }}>Create Room</button>
    </div>
  )
}

export default RoomsSection