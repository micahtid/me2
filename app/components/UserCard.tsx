import { MouseEventHandler } from "react";
import { DocumentData } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

interface UserCardProps {
    children?: React.ReactNode;
    className?: string;
    status: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    user: DocumentData;
}

const UserCard: React.FC<UserCardProps> = ({ children, status, onClick, user, className }) => {
  return ( 
    <button onClick={onClick} className={twMerge('flex flex-row justify-start items-center cursor-pointer px-2 py-3 border-b-2 border-gray-500/10 w-full rouned-lg gap-x-5', className)}>
        <img src={user.pfp} alt="" width={35} className="rounded-sm" />
        <div className="flex flex-col justify-center items-start mx-5">
            <h3 className="text-xl">{user.userName}</h3>
            <p className="text-sm text-gray-500/70">{status}</p>
        </div>
        <div className="flex flex-grow justify-end">
          {children}
        </div>
    </button>
  )
}

export default UserCard

