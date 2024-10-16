"use client";

import RegisterUser from "./components/RegisterUser";
import ChatPage from "./components/ChatPage";

import NavBar from "./components/LandingPage/NavBar";
import Hero from "./components/LandingPage/Hero";
import Tutorial from "./components/LandingPage/Tutorial";
import AboutUs from "./components/LandingPage/AboutUs";
import Testimonies from "./components/LandingPage/Testimonies";
import Footer from "./components/LandingPage/Footer";

import OopsScreen from "./components/OopsScreen";

// Library Imports
import { useState, useEffect } from "react";

// Own Function Imports
import { useData } from "@/providers/DataProvider";
import { signIn } from "./utils/databasefunctions";
import { checkUser } from "./utils/utilfunctions";
import { setUserOnline } from "./utils/usersfunctions";

import Loader from "./components/Loader";
import useIsTabActive from "../hooks/useActiveTab";

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

  ////////////////////////////////////
  const status = useIsTabActive();
  
  useEffect(() => {
    if (user?.uid) {
      setUserOnline(user?.uid, status);
    }
  }, [status, user])
  ////////////////////////////////////

  if (isUserLoaded === null || isUserRegistered === null) {
    return <Loader />;
  }
  
  return (
    <div className="">
      <section className="max-[325px]:hidden">
        {isUserLoaded && isUserRegistered ? (
            <ChatPage />
        ) : isUserLoaded ? (
          <RegisterUser />
        ) : (
          <div className="overflow-x-hidden bg-[#FAFAFA]">
            <NavBar />
            <div className="mt-36 mb-32 max-lg:mt-28">
              <Hero />
            </div>
            <div className="mb-52 mt-72">
              <Tutorial />
            </div>
            <div className="my-48">
              <AboutUs />
            </div>
            <div className="my-56">
              <Testimonies />
            </div>
            <Footer />
          </div>
        )}
      </section>
      <div className="hidden max-[325px]:inline w-full">
        <OopsScreen message="Oops! It looks like you're viewing on a small device!" infoClassName="max-[500px]:w-[80%]"/>
      </div>
    </div>
  );
};

export default Home;
