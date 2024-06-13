"use client";

import { useState, useEffect } from "react";

import { useData } from "@/providers/DataProvider";
import { DocumentData } from "firebase/firestore";
import UserCard from "../UserCard";
import { getUser } from "@/app/utils/databasefunctions";

import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const getRequestHook = (
  requests: DocumentData[] | null | undefined,
  status: string,
  setUsers: Function
) => {
  const userData: DocumentData | null[] = [];
  const index = status === "sent" ? 0 : status === "received" ? 1 : -1;

  if (requests) {
    requests.forEach((request) => {
      const user = getUser(request.ids[index]);
      user.then((u) => {
        userData.push(u);
      })
    });
    setUsers(userData);
  }
};

const RequestSection = () => {
  // Section is either "sent" or "received"
  const [section, setSection] = useState("sent");
  const [requestList, setRequestList] = useState<
    DocumentData[] | null | undefined
  >([]);

  const { sentRequests, receivedRequests, user } = useData();

  //////
  const [sentRequestUsers, setSentRequestUsers] = useState<DocumentData[]>([]);
  const [receivedRequestUsers, setReceivedRequestUsers] = useState<DocumentData[]>([]);

  useEffect(() => {
    getRequestHook(sentRequests, "sent", setSentRequestUsers);
    getRequestHook(receivedRequests, "received", setReceivedRequestUsers);
  }, [sentRequests, receivedRequests]);
  ////

  useEffect(() => {
    if (section === "sent") {
      setRequestList(sentRequestUsers);
    } else {
      setRequestList(receivedRequestUsers);
    }
  }, [section]);

  return (
    <div>
      <div className="w-full flex flex-row justify-start items-center gap-x-2">
        <button
          onClick={() => setSection("sent")}
          className={`bg-gray-200 rounded-lg p-2 ${
            section === "sent" ? "bg-blue-500/50" : ""
          }`}
        >
          Sent
        </button>
        <button
          onClick={() => setSection("received")}
          className={`bg-gray-200 rounded-lg p-2 ${
            section === "received" ? "bg-blue-500/50" : ""
          }`}
        >
          Recieved
        </button>
      </div>
      <div>
        {requestList?.map((request, index) => (
          <div
              key={index}
              className="flex flex-row justify-start items-center w-full"
            >
              <UserCard
                onClick={() => {
                  console.log("Here")
                }}
                className={`flex-grow`}
                status="Compatibility 80%"
                user={request}
              ></UserCard>
              <button
                className="mr-8"
                onClick={() => {
                  // If section === "sent"
                  // Remove the sent request
                  
                  // If section === "received"
                  // Change chat_data activeState from "request" to "active"
                }}
              >
                {
                  section === "sent" ? (
                    <IoCloseCircleSharp size={20} />
                  ) : (
                    <FaCheckCircle size={20} />
                  ) 
                }
              </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default RequestSection;
