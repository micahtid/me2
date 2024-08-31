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

const RoomUserList: React.FC<RoomUserListProps> = ({
  roomUserIds,
  users,
  display,
}) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="flex flex-col justify-start items-start gap-y-1">
      <div className="flex justify-start items-center gap-x-2">
        <button onClick={() => setIsShown(!isShown)}>
          {isShown ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>
        <p>{display}</p>
      </div>
      <div
        className={`${
          isShown ? "flex flex-col justify-start items-start gap-y-1" : "hidden"
        }`}
      >
        {roomUserIds.map((id, index) => {
          const user = users?.find((user) => user.uid === id);
          return <div key={index}
          className="ml-6 flex justify-start items-center gap-x-3">
            <FaUser />
            <p>{user ? user.userName : "Unknown User"}</p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default RoomUserList;
