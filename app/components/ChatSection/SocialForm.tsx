"use client";

import { useState, useEffect } from "react";
import { useData } from "@/providers/DataProvider";
import { useActiveUserChat } from "@/hooks/useActiveUserChat";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
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
    const q = query(collection(firestore, "chat_data"), where("chatid", "==", currentChat));

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
      setU1Display(socialStatus[user.uid] === null ? "Waiting ⏱️" : socialStatus[user.uid] ? "Agree ✅" : "Disagree ❌");
      setU2Display(socialStatus[currentUser.uid] === null ? "Waiting ⏱️" : socialStatus[currentUser.uid] ? "Agree ✅" : "Disagree ❌");
    }
  }, [socialStatus]);

  return (
    <div className="bg-primary">
      <p>The chat has been open for 24 hours and is now closed. Would you like to share socials?</p>
      <p><span className="font-bold">You</span> : {u1Display}</p>
      <p><span className="font-bold">{currentUser?.userName}</span> : {u2Display}</p>
      <div className='flex flex-row justify-start items-center gap-x-4'>
        <Button onClick={() => {}}>Share Socials</Button>
        <Button onClick={() => {}}>Close Chat</Button>
      </div>
    </div>
  );
};

export default SocialForm;
