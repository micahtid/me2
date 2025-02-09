"use client";

// React Imports
import { useState, useEffect } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";

import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";

// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { editSocialStatus } from "@/app/utils/chatfunctions";

interface SocialStatus {
  [key: string]: boolean | null;
}

const SocialForm = () => {
  const { user, users } = useData();
  const { currentChat, currentUser } = useActiveUserChat();

  const [socialStatus, setSocialStatus] = useState<SocialStatus>({});
  const [u1Icon, setU1Icon] = useState<JSX.Element | null>(null);
  const [u2Icon, setU2Icon] = useState<JSX.Element | null>(null);

  // To Do --> Edit getChatProperty and Apply Here
  useEffect(() => {
    if (!currentChat) return;

    const firestore = getFirestore();
    const q = query(
      collection(firestore, "chat_data"),
      where("chatid", "==", currentChat)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const chatDoc = querySnapshot.docs[0];
        const chatData = chatDoc.data();
        setSocialStatus(chatData.socialStatus || {});
      }
    });

    return () => unsubscribe();
  }, [currentChat]);

  useEffect(() => {
    if (socialStatus && user && currentUser) {
      const getStatusIcon = (status: boolean | null) => {
        if (status === null) {
          return <MdOutlineTimer size={40} color="#FF964F" />;
        }
        return status ? <IoMdCheckmarkCircle size={40} color="#80EF80" /> : <IoMdCloseCircle size={40} color="#FF6961" />;
      };

      setU1Icon(getStatusIcon(socialStatus[user.uid]));
      setU2Icon(getStatusIcon(socialStatus[currentUser.uid]));
    }
  }, [socialStatus]);

  // console.log(socialStatus)

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 mt-8 rounded-xl shadow-md border border-gray-100
    flex flex-col justify-start items-start gap-y-4">
      {socialStatus[user?.uid] && socialStatus[currentUser?.uid] ? (
        <p className="text-sm text-gray-600 leading-relaxed">
          Both users have agreed to share socials.{" "}
          <span className="font-medium text-black/60">Please save these details</span> from{" "}
          <span className="font-semibold text-black/60">{currentUser?.userName}</span>{" "}
          if you'd like to stay in touch.
        </p>
      ) : (
        <p className="text-sm text-gray-600 leading-relaxed">
          The chat has been open for{" "}
          <span className="font-medium text-black/80 underline">24 hours</span>{" "}
          and is now closed. Would you like to share socials?{" "}
          <span className="font-medium text-black/80 underline animate-pulse">Click to update your preference!</span>
        </p>
      )}
      {socialStatus[user?.uid] && socialStatus[currentUser?.uid] ? (
        <div className="flex flex-col justify-start items-start gap-y-3 w-full">
          {currentUser?.discord && (
            <div className="group w-full p-3 bg-gradient-to-r from-[#7785CC] to-[#5865F2] rounded-lg 
            flex items-center gap-x-3 cursor-pointer">
              <div className="p-2 bg-white/10 rounded-lg">
                <FaDiscord size={24} className="text-white" />
              </div>
              <p className="text-white font-medium">{currentUser?.discord}</p>
            </div>
          )}
          {currentUser?.instagram && (
            <div className="group w-full p-3 bg-gradient-to-r from-[#E1306C] to-[#F77737] rounded-lg 
            flex items-center gap-x-3 cursor-pointer">
              <div className="p-2 bg-white/10 rounded-lg">
                <FaInstagram size={24} className="text-white" />
              </div>
              <p className="text-white font-medium">{currentUser?.instagram}</p>
            </div>
          )}
          {currentUser?.snap && (
            <div className="group w-full p-3 bg-gradient-to-r from-[#FFFC00] to-[#FFE600] rounded-lg 
            flex items-center gap-x-3 cursor-pointer">
              <div className="p-2 bg-black/10 rounded-lg">
                <FaSnapchatGhost size={24} className="text-black" />
              </div>
              <p className="text-black font-medium">{currentUser?.snap}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-start items-center gap-x-6 w-full p-2">
          <button 
            className="flex flex-col justify-center items-center gap-y-3"
            onClick={() => editSocialStatus(currentChat, user?.uid, !socialStatus[user?.uid])}
          >
            <div className="bg-gray-100 rounded-full p-3 shadow-md">{u1Icon}</div>
            <p className="text-sm font-medium text-gray-700">You</p>
          </button>
          <div className="h-[80px] w-[2px] bg-gray-200 rounded-full"></div>
          <div className="flex flex-col justify-center items-center gap-y-3">
            <div className="bg-gray-100 rounded-full p-3 shadow-md">{u2Icon}</div>
            <p className="text-sm font-medium text-gray-700">{currentUser?.userName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialForm;
