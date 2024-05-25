"use client";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import Button from "./components/Button";
import ChatContainer from "./components/ChatContainer";
import { getUserAuth, signIn, signOut  } from "./databasefunctions";


const auth = getUserAuth(false);

const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <section>
        {user ? (
          <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="flex flex-col justify-center items-start gap-y-4 max-w-[800px] 
            p-6 bg-gray-500/30 rounded-md shadow-sm">
              <ChatContainer />
              <Button onClick={signOut}>Sign Out</Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[100vh]">
            <Button onClick={signIn}>Sign In</Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

