"use client";

import { useAuthState } from "react-firebase-hooks/auth";

import Button from "./components/Button";
import RegisterUser from "./components/RegisterUser";
import { useActiveChat } from "@/hooks/useActiveChat";

import { checkChat } from "./utils/filterfunctions";
import { createChat, getChats } from "./utils/databasefunctions";

import { DocumentData } from "firebase/firestore";

import { PacmanLoader } from "react-spinners";
import ChatPage from "./components/ChatPage";

// CHAT ID = USER1ID + USER2ID

import {
  getUserAuth,
  initializeFirebase,
  getUsers,
  signIn,
  signOut,
} from "./utils/databasefunctions";
import { checkUser } from "./utils/filterfunctions";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const app = initializeFirebase();
  const auth = getUserAuth(true);

  const chats = getChats(true);

  const { onChange } = useActiveChat();

  const [isUserLoaded, setIsUserLoaded] = useState<boolean | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean | null>(
    null
  );

  const [users, setUsers] = useState<DocumentData[]>();

  useEffect(() => {
    const unsubscribe = getUsers(setUsers);
    return () => unsubscribe();
  }, []);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const registerStatus = checkUser(auth.currentUser?.uid, users);

    if (users && users) {
      setIsUserRegistered(registerStatus);
      setIsUserLoaded(Boolean(user));
    }

  }, [user, users]);

  // if (isUserLoaded === null || isUserRegistered === null) {
  //   return (
  //   <div className="h-[100vh] w-full flex justify-center items-center">
  //     <PacmanLoader color="#36d7b7" />
  //   </div>
  //   )
  // }


  return (
    <div>
      <section>
        {isUserLoaded && isUserRegistered ? (
          <ChatPage auth={auth} chats={chats} users={users} />
        ) : isUserLoaded ? (
            <RegisterUser />
        ) : (
          <div className="flex justify-center items-center h-[100vh]">
            <Button onClick={signIn}>Sign Up</Button>{" "}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
