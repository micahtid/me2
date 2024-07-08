"use client";

import RegisterUser from "./components/RegisterUser";
import ChatPage from "./components/ChatPage";

import ColorDrop from "./components/LandingPage/ColorDrop";
import NavBar from "./components/LandingPage/NavBar";
import Testimonies from "./components/LandingPage/Testimonies";
import Hero from "./components/LandingPage/Hero";
import AboutUs from "./components/LandingPage/AboutUs";
import Footer from "./components/LandingPage/Footer";

// Library Imports
import { useState, useEffect } from "react";

// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { signIn } from "./utils/databasefunctions";
import { checkUser } from "./utils/utilfunctions";

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
    return <Loader />;
  }

  // console.log(isUserLoaded, isUserRegistered)

  return (
    <div className="">
      <section>
        {isUserLoaded && isUserRegistered ? (
          <div className="">
            <div className="max-[500px]:hidden">
              <ChatPage />
            </div>
            <div className="hidden max-[500px]:inline">
              <p className="text-center p-4">Oops! Me2 isn't yet suited for smaller devices. Please login on a larger device or enlargen your window.</p>
            </div>
          </div>
        ) : isUserLoaded ? (
          <RegisterUser />
        ) : (
          <ColorDrop>
            <NavBar />
            <Hero />
            <AboutUs />
            <Testimonies />
            <Footer />
          </ColorDrop>
        )}
      </section>
    </div>
  );
};

export default Home;
