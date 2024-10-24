"use client";

import { DocumentData } from "firebase/firestore";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

interface RoomUserListProps {
  roomUserIds: string[];
  users: DocumentData[] | undefined | null;
  display: string;
}

const RoomUserList: React.FC<RoomUserListProps> = ({ roomUserIds, users, display }) => {
  return (
    <div className="flex flex-col justify-start items-start gap-y-1">
      <div className="flex flex-row justify-start items-center gap-x-4 gap-y-2 flex-wrap max-w-[350px]">
        <p>{display}</p>
        {roomUserIds.map((id, index) => {
          const user = users?.find((user) => user.uid === id);
          return (
            <div key={index} className="flex justify-start items-center gap-x-2">
              <img src={user?.pfp} className="w-[20px] h-[20px] rounded-full" alt="User profile" />
              <p>{user ? user.userName : "Unknown User"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomUserList;
