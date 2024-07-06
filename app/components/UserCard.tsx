import { MouseEventHandler } from "react";
import { DocumentData } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

import { IoNotifications } from "react-icons/io5";

interface UserCardProps {
    className?: string;
    statusClassName?: string;
    notification?: boolean;
    status: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    user: DocumentData;
}

const UserCard: React.FC<UserCardProps> = ({ status, onClick, user, className, statusClassName, notification }) => {
  return ( 
    <button onClick={onClick} className={twMerge(
      'flex flex-row justify-start items-center cursor-pointer px-2 py-3 w-full rounded-lg gap-x-5'
      , className)}>
        <div className="relative">
          <IoNotifications className={`absolute -bottom-[3px] -right-[3px]
          text-yellow-300 bg-yellow-200 rounded-full
          ${notification ? "" : "hidden"}`} />
          <img src={user.pfp} alt="profile-picture" width={40} className="rounded-full" />
        </div>
        <div className="flex flex-col justify-center items-start mx-5">
            <h3 className="text-xl">{user.userName}</h3>
            <p className={twMerge("text-sm text-gray-500/70", statusClassName)}>{status}</p>
        </div>
    </button>
  )
}

export default UserCard

