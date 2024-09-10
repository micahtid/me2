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
import { setUserOnline } from "./utils/usersfunctions";

import Loader from "./components/Loader";
import useIsTabActive from "../hooks/useActiveTab";

const Home = () => {
  const [isUserLoaded, setIsUserLoaded] = useState<boolean | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean | null>(
    null,
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

  const status = useIsTabActive();

  useEffect(() => {
    if (user?.uid) {
      setUserOnline(user?.uid, status);
    }
  }, [status, user]);

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
          <ColorDrop>
            <NavBar />
            <div className="mx-10 mt-36 mb-32 max-lg:mt-28">
              <Hero />
            </div>
            <div className="my-48">
              <AboutUs />
            </div>
            <div className="my-56">
              <Testimonies />
            </div>
            <Footer />
          </ColorDrop>
        )}
      </section>
      <div className="hidden max-[325px]:inline">
        <p className="p-2">
          Oops! Me2 isn't yet suited for smaller devices. Please login on a
          larger device or enlargen your window.
        </p>
        <img src="/roller-skating.svg" className="mt-5" />
      </div>
    </div>
  );
};

export default Home;
