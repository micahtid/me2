import { MouseEventHandler } from "react";
import { DocumentData } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

interface UserCardProps {
    className?: string;
    status: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    user: DocumentData;
}

const UserCard: React.FC<UserCardProps> = ({ status, onClick, user, className }) => {
  return ( 
    <button onClick={onClick} className={twMerge(
      'flex flex-row justify-start items-center cursor-pointer px-2 py-3 w-full rounded-lg gap-x-5'
      , className)}>
        <img src={user.pfp} alt="" width={40} className="rounded-full" />
        <div className="flex flex-col justify-center items-start mx-5">
            <h3 className="text-xl">{user.userName}</h3>
            <p className="text-sm text-gray-500/70">{status}</p>
        </div>
    </button>
  )
}

export default UserCard

