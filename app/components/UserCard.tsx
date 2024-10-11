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
    activeStatus?: boolean;
    activeStatusClassName?: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
    status, 
    onClick, 
    user, 
    className, 
    statusClassName, 
    notification, 
    activeStatus, 
    activeStatusClassName 
}) => {
    return ( 
        <button 
            onClick={onClick} 
            className={twMerge(
                "flex flex-row justify-start items-center cursor-pointer px-2 py-3 w-full rounded-lg gap-x-5",
                className
            )}
        >
            <div className="relative">
                <IoNotifications 
                    className={`
                        absolute top-[1px] -right-[1px] z-10 w-[15px] h-[15px] 
                        text-yellow-300 bg-yellow-200 rounded-full 
                        ${notification ? "" : "hidden"}
                    `}
                />
                <div className="relative">
                    <img 
                        src={user.pfp} 
                        alt="profile-picture" 
                        width={40} 
                        className="rounded-full shadow-lg" 
                    />
                    <div 
                        className={twMerge(
                            `w-[15px] h-[15px] rounded-full absolute -bottom-[1px] -right-[1px] border-2 
                            ${user.online ? "bg-green-300" : "bg-gray-300"} 
                            ${activeStatus ? "" : "hidden"}`,
                            activeStatusClassName
                        )}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-start mx-5">
                <h3 className="text-xl font-medium">{user.userName}</h3>
                <p className={twMerge("text-sm text-gray-500/70", statusClassName)}>
                    {status}
                </p>
            </div>
        </button>
    );
}

export default UserCard;
