"use client";

import UserCard from "../UserCard";
import { DocumentData } from "firebase/firestore";
import { createRequest } from "@/app/utils/databasefunctions";
import { useData } from "@/providers/DataProvider";

import { useUserModal } from "@/hooks/useUserModal";
import { IoPersonAddSharp } from "react-icons/io5";

const FindSection = () => {
  const { onChangeCurrentUser, onModalOpen } = useUserModal();
  const { user, users, sentRequests, receivedRequests } = useData();
  return (
    <div
      className="
    flex flex-col justify-start items-start gap-y-3"
    >
      {users &&
        users.map((u, index) => {
          if (sentRequests && receivedRequests) {
            const requests = [...sentRequests, ...receivedRequests]

            const isDisabled =
            !requests ||
            !user ||
            requests.some(
              (request) =>
                request.ids.includes(user.uid) &&
                request.ids.includes(u.uid)
            );

          return (
            <div
              key={index}
              className={`flex flex-row justify-start items-center w-full ${
                user && u.uid === user.uid ? "hidden" : ""
              }`}
            >
              <UserCard
                onClick={() => {
                  onChangeCurrentUser(u);
                  onModalOpen();
                }}
                className={`flex-grow`}
                status="Compatibility 80%"
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
