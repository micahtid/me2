"use client";

// React Imports
import { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

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
  const [u1Display, setU1Display] = useState<string>("");
  const [u2Display, setU2Display] = useState<string>("");

  // To-Do Use GetChatProperty Here
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
      setU1Display(
        socialStatus[user.uid] === null
          ? "Waiting ⏱️"
          : socialStatus[user.uid]
          ? "Agree ✅"
          : "Disagree ❌"
      );
      setU2Display(
        socialStatus[currentUser.uid] === null
          ? "Waiting ⏱️"
          : socialStatus[currentUser.uid]
          ? "Agree ✅"
          : "Disagree ❌"
      );
    }
  }, [socialStatus]);

  return (
    <div
      className="bg-primary p-4 mt-8 rounded-lg drop-shadow-sm
    flex flex-col justify-start items-start gap-y-4"
    >
      <p className="text-xs text-gray-500">
        The chat has been open <span className="italic">for 24 hours</span> and
        is now <span className="underline">closed</span>. <br />
        Would you like to share socials?
      </p>
      <div className="">
        <p>
          <span className="font-semibold">You</span> : {u1Display}
        </p>
        <p>
          <span className="font-semibold">{currentUser?.userName}</span> :{" "}
          {u2Display}
        </p>
      </div>
      {socialStatus[user?.uid] && socialStatus[currentUser?.uid] ? (
        <div>
          {currentUser?.discord && (
            <p>Discord <span className="font-semibold">{currentUser?.discord}</span></p>
          )}
          {currentUser?.instagram && (
            <p>Instagram <span className="font-semibold">{currentUser?.instagram}</span></p>
          )}
          {currentUser?.snap && (
            <p>Snap <span className="font-semibold">{currentUser?.snap}</span></p>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-start items-center gap-x-4">
          <Button
            onClick={() => {
              editSocialStatus(currentChat, user?.uid, true);
            }}
          >
            <FaCircleCheck />
          </Button>
          <Button
            onClick={() => {
              editSocialStatus(currentChat, user?.uid, false);
            }}
          >
            <IoIosCloseCircle />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SocialForm;
