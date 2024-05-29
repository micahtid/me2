"use client";

import { useAuthState } from "react-firebase-hooks/auth";

import Button from "./components/Button";
import ChatContainer from "./components/ChatContainer";
import RegisterUser from "./components/RegisterUser";

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
  const users = getUsers(true);

  const router = useRouter();
  
  const registerStatus = checkUser(auth.currentUser?.uid, users);
  const [isRegistered, setIsRegistered] = useState(registerStatus);

  useEffect(() => {
    setIsRegistered(registerStatus);
  }, [registerStatus]);


  const [user] = useAuthState(auth);
  console.log("Registered - ", isRegistered, "Logged In - ", user)

  return (
    <div>
      <section>
        {user && isRegistered ? (
          <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="flex flex-col justify-center items-start gap-y-4 max-w-[800px] p-6 bg-gray-500/30 rounded-md shadow-sm">
              <ChatContainer />
              <Button onClick={signOut}>Sign Out</Button>
            </div>
          </div>
        ) : user ? (
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
