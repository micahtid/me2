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

// Component Imports
import Button from "../Button";

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
    <div
      className="bg-primary p-4 mt-8 rounded-lg drop-shadow-sm
    flex flex-col justify-start items-start gap-y-4"
    >
      {socialStatus[user?.uid] && socialStatus[currentUser?.uid] ? (
        <p className="text-xs text-gray-500">
          Both users have agreed to share socials. <br />
          Please <span className="italic">store these socials</span> from{" "}
          <span className="underline">{currentUser?.userName}</span> if you'd
          like to stay in touch.
        </p>
      ) : (
        <p className="text-xs text-gray-500">
          * The chat has been open <span className="italic">for 24 hours</span>{" "}
          and is now <span className="underline">closed</span>. <br />
          Would you like to share socials? <span className="italic">Click to edit status!</span>
        </p>
      )}
      {socialStatus[user?.uid] && socialStatus[currentUser?.uid] ? (
        <div className="flex flex-col justify-start items-start gap-y-2 w-full">
          {
            currentUser?.discord && (
              <div className="social-card bg-[#7785CC]">
                <FaDiscord size={20} color="white" />
                <p className="text-white">{currentUser?.discord}</p>
              </div>
            )
          }
          {
            currentUser?.instagram && (
              <div className="social-card bg-[#E1306C]">
                <FaInstagram size={20} color="white" />
                <p className="text-white">{currentUser?.instagram}</p>
              </div>  
            )
          }
          {
            currentUser?.snap && (
              <div className="social-card bg-[#FFFC00]">
                <FaSnapchatGhost size={20} color="white" />
                <p className="text-white">{currentUser?.snap}</p>
              </div>
            )
          }
        </div>
      ) : (
        <div className="flex flex-row justify-start items-center gap-x-4">
          <button className="flex flex-col justify-center items-center gap-y-2"
          onClick={() => editSocialStatus(currentChat, user?.uid, !socialStatus[user?.uid])}
          >
            <div className="bg-gray-500/10 rounded-full p-2">{u1Icon}</div>
            <p className="text-xs text-gray-600">You</p>
          </button>
          <div className="flex flex-col justify-center items-center gap-y-2">
            <div className="bg-gray-500/10 rounded-full p-2">{u2Icon}</div>
            <p className="text-xs text-gray-600">{currentUser?.userName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialForm;
