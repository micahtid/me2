"use client";

// Library Imports
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { IoPersonAddSharp } from "react-icons/io5";

// Own Function Imports
import { createRequest } from "@/app/utils/requestfunctions";
import { useData } from "@/providers/DataProvider";
import { useUserModal } from "@/hooks/useUserModal";
import { getCompatibility, shuffleArray } from "@/app/utils/utilfunctions";

import { FaDice } from "react-icons/fa";

// Component Imports
import UserCard from "../UserCard";

// To Do: Increase Efficiency Of Switching Display Users
// To Do: Clean Up Code; A Lot of UseEffect(s)

const FindSection = () => {
  const { onChangeCurrentUser, onModalOpen } = useUserModal();
  const { user, users, sentRequests, receivedRequests, activeUsers } =
    useData();

  const [filteredUsers, setFilteredUsers] = useState<DocumentData[]>([]);
  const [userData, setUserData] = useState<DocumentData | undefined>(undefined);

  ////////
  const [section, setSection] = useState("filtered");
  ////////

  useEffect(() => {
    if (user && users) {
      setUserData(users?.find((u) => u.uid === user?.uid));
    }
  }, [users, user]);

  useEffect(() => {
    if (users && activeUsers) {
      // Filter users to exclude those in activeUsers
      const filtered = users.filter((u) => {
        return !activeUsers.some((activeUser) => activeUser.uid === u.uid);
      });

      setFilteredUsers(filtered);
    }
  }, [users, activeUsers]);

  return (
    <div
      className="
    flex flex-col justify-start items-start gap-y-3
    max-lg:pb-6 overflow-y-auto no-scrollbar pb-5"
    >
      <h3 className="text-2xl mb-6 ml-2 font-semibold">Find People</h3>
      <div className="w-full flex flex-row justify-between items-center gap-x-2 mb-5">
        <div className="flex flex-row gap-x-2 mt-[-5px]">
          <button
            onClick={() => setSection("filtered")}
            className={`bg-gray-100 rounded-lg p-2 text-black/20 text-md font-medium hover:text-black/70 ease-in-out duration-500
              ${section === "filtered" ? "text-black/80" : ""}`}
          >
            Filtered Users
          </button>
          <button
            onClick={() => setSection("all")}
            className={`bg-gray-100 rounded-lg p-2 text-black/20 text-md font-medium hover:text-black/70 ease-in-out duration-500
              ${section === "all" ? "text-black/80" : ""}`}
          >
            All Users
          </button>
        </div>
        <button className="mr-2
        bg-gray-200 rounded-lg p-2
        flex justify-center items-center"
        onClick={() => {
          const shuffledArr = shuffleArray([...filteredUsers]);
          setFilteredUsers(shuffledArr);
        }}>
          <FaDice size={30} className="text-black" />
        </button>
      </div>
      {filteredUsers &&
        filteredUsers.map((u, index) => {
          if (sentRequests && receivedRequests && userData) {
        
            const requests = [...sentRequests, ...receivedRequests];

            const compatibility = getCompatibility(userData, u);
            const isDisabled =
              !requests ||
              !user ||
              requests.some(
                (request) =>
                  request.ids.includes(user.uid) && request.ids.includes(u.uid)
              );

            if (compatibility < 0.65 && section === "filtered") {
              return;
            }

            return (
              <div
                key={index} // Use a unique key
                className={`flex flex-row justify-start items-center w-full
                user-card-accent bg-primary border-primary ${user && u.uid === user.uid ? "hidden" : ""}`}
              >
                <UserCard
                  onClick={() => {
                    onChangeCurrentUser(u);
                    onModalOpen();
                  }}
                  className="flex-grow"
                  statusClassName="bg-white text-black
                px-6 py-1 rounded-[20px] -ml-1 mt-1"
                  status={`Compatibility: ${Math.round(compatibility * 100)}%`}
                  user={u}
                ></UserCard>
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
        })}
    </div>
  );
};

export default FindSection;
