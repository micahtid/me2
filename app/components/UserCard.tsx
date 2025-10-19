import { MouseEventHandler } from "react";
import { DocumentData } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

interface UserCardProps {
    className?: string;
    statusClassName?: string;
    notificationCount?: number; 
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
    notificationCount = 0, 
    activeStatus, 
    activeStatusClassName 
}) => {
    return ( 
        <button
            onClick={onClick}
            className={twMerge(
                "flex flex-row justify-start items-center cursor-pointer px-5 py-3.5 w-full rounded-xl gap-x-5 transition-all duration-200 group",
                className
            )}
        >
            <div className="relative">
                {notificationCount > 0 && (
                    <div
                        className="
                            absolute top-[-5px] right-[-5px] z-10 w-[20px] h-[20px]
                            bg-red-500 text-white text-xs font-semibold flex justify-center items-center
                            rounded-full border-2 border-white
                        "
                    >
                        {(notificationCount > 9) ? "9+" : notificationCount}
                    </div>
                )}
                <div className="relative">
                    <img
                        src={user.pfp}
                        alt="profile-picture"
                        width={40}
                        className="rounded-full border-2 border-gray-200 group-hover:border-primary/40 transition-all duration-200"
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
