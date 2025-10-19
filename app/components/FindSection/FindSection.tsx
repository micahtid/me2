"use client";

// Library Imports
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaDice } from "react-icons/fa";

// Own Function Imports
import { createRequest } from "@/app/utils/requestfunctions";
import { useData } from "@/providers/DataProvider";
import { useUserModal } from "@/hooks/useUserModal";
import { getCompatibility, shuffleArray } from "@/app/utils/utilfunctions";

// Component Imports
import UserCard from "../UserCard";

// To Do: Increase Efficiency Of Switching Display Users
// To Do: Clean Up Code; A Lot of UseEffect(s)

const FindSection = () => {
    const { onChangeCurrentUser, onModalOpen } = useUserModal();
    const { user, users, sentRequests, receivedRequests, activeUsers } = useData();

    const [filteredUsers, setFilteredUsers] = useState<DocumentData[]>([]);
    const [userData, setUserData] = useState<DocumentData | undefined>(undefined);
    const [section, setSection] = useState("filtered");

    useEffect(() => {
        if (user && users) {
            setUserData(users.find((u) => u.uid === user.uid));
        }
    }, [users, user]);

    useEffect(() => {
        if (users && activeUsers) {
            // Filter users to exclude those in activeUsers
            const filtered = users.filter((u) => 
                !activeUsers.some((activeUser) => activeUser.uid === u.uid)
            );
            setFilteredUsers(filtered);
        }
    }, [users, activeUsers]);

    return (
        <div className="h-full flex flex-col justify-start items-start gap-y-3 max-lg:pb-6 overflow-y-auto no-scrollbar pb-5">
            <h3 className="text-2xl mb-6 ml-8 font-semibold">Find People</h3>
            <div className="w-full flex flex-row justify-between items-center gap-x-2 mb-5 px-8">
                <div className="flex flex-row gap-x-2 mt-[-5px]">
                    <button
                        onClick={() => setSection("filtered")}
                        className={`section-tab ${section === "filtered" ? "section-tab-active" : "section-tab-inactive"}`}
                    >
                        Filtered Users
                    </button>
                    <button
                        onClick={() => setSection("all")}
                        className={`section-tab ${section === "all" ? "section-tab-active" : "section-tab-inactive"}`}
                    >
                        All Users
                    </button>
                </div>
                <button
                    className="mr-2 bg-white border border-gray-200 rounded-lg p-2 flex justify-center items-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                    onClick={() => {
                        const shuffledArr = shuffleArray([...filteredUsers]);
                        setFilteredUsers(shuffledArr);
                    }}
                >
                    <FaDice size={20} className="text-gray-600 group-hover:text-header transition-colors duration-200" />
                </button>
            </div>
            {filteredUsers && filteredUsers.map((u, index) => {
                if (sentRequests && receivedRequests && userData) {
                    const requests = [...sentRequests, ...receivedRequests];
                    const compatibility = getCompatibility(userData, u);
                    const isDisabled = 
                        !requests ||
                        !user ||
                        requests.some((request) =>
                            request.ids.includes(user.uid) && request.ids.includes(u.uid)
                        );

                    if (compatibility < 0.65 && section === "filtered") {
                        return null;
                    }

                    return (
                        <div 
                            key={index}
                            className={`flex flex-row justify-start items-center w-full
                                user-card ${user && u.uid === user.uid ? "hidden" : ""}`}
                        >
                            <UserCard
                                onClick={() => {
                                    onChangeCurrentUser(u);
                                    onModalOpen();
                                }}
                                className="flex-grow"
                                statusClassName="bg-primary text-black/70 font-medium text-xs px-3 py-1 rounded-lg -ml-1 mt-1 border border-secondary/40"
                                status={`Compatibility: ${Math.round(compatibility * 100)}%`}
                                user={u}
                            />
                            <button
                                disabled={isDisabled}
                                className={`mr-8 ${isDisabled ? "text-gray-400" : ""}`}
                                onClick={() => {
                                    if (user) {
                                        const chatid = 
                                            user.uid > u.uid ? user.uid + u.uid : u.uid + user.uid;
                                        createRequest(chatid, user.uid, u.uid);
                                    }
                                }}
                            >
                                <IoPersonAddSharp size={22} />
                            </button>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default FindSection;