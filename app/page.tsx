"use client";

// Library Imports
import { useState, useEffect } from "react";

// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { signIn } from "./utils/databasefunctions";
import { checkUser } from "./utils/utilfunctions";

// Component Imports
import Button from "./components/Button";
import RegisterUser from "./components/RegisterUser";
import ChatPage from "./components/ChatPage";
import Loader from "./components/Loader";

const Home = () => {
  const [isUserLoaded, setIsUserLoaded] = useState<boolean | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean | null>(
    null
  );

  const { user, users } = useData();

  useEffect(() => {
    const registerStatus = checkUser(user?.uid, users);

    if (user !== undefined && users !== undefined) {
      setIsUserRegistered(registerStatus);
      setIsUserLoaded(Boolean(user));
    } else if (user === null) {
      setIsUserRegistered(false);
      setIsUserLoaded(false);
    }
  }, [user, users]);

  if (isUserLoaded === null || isUserRegistered === null) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      <section>
        {isUserLoaded && isUserRegistered ? (
          <ChatPage />
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
