"use client"

import { useRoomModal } from "@/hooks/useRoomModal"

const RoomsSection = () => {
  const { onModalOpen } = useRoomModal();

  return (
    <div
    className='flex flex-col justify-start items-start gap-y-3
    max-lg:pb-6 overflow-y-auto no-scrollbar pb-5'>
        <h3 className="text-2xl mb-6 ml-2 font-semibold">Study Rooms</h3>
        <button className='px-4 py-2 rounded-lg bg-primary'
        onClick={onModalOpen}>Create Room</button>
    </div>
  )
}

export default RoomsSection