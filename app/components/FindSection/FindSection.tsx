"use client";

// Library Imports
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { IoPersonAddSharp } from "react-icons/io5";

// Own Function Imports
import { createRequest } from "@/app/utils/requestfunctions";
import { useData } from "@/providers/DataProvider";
import { useUserModal } from "@/hooks/useUserModal";
import { getCompatibility } from "@/app/utils/utilfunctions";

// Component Imports
import UserCard from "../UserCard";

const FindSection = () => {
  const { onChangeCurrentUser, onModalOpen } = useUserModal();
  const { user, users, sentRequests, receivedRequests, activeUsers } =
    useData();

  const [filteredUsers, setFilteredUsers] = useState<DocumentData[]>([]);
  const [userData, setUserData] = useState<DocumentData | undefined>(undefined);

  useEffect(() => {
    if (user && users) {
      setUserData(users?.find((u) => u.uid === user?.uid));
    }
  }, [users]);

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
    max-lg:pb-6"
    >
      <h3 className="text-2xl mb-6 ml-2 font-medium">Find People</h3>
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

            if (compatibility < 0.65) {
              return;
            }

            return (
              <div
                key={index}
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
                px-6 py-1 rounded-xl -ml-1 mt-1"
                  status={`Compatibility ${Math.round(compatibility * 100)}%`}
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
                  <IoPersonAddSharp size={20} />
                </button>
              </div>
            );
          }
        })}
    </div>
  );
};

export default FindSection;
