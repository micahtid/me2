"use client";

import Button from "./components/Button";
import RegisterUser from "./components/RegisterUser";
import ChatPage from "./components/ChatPage";
import NavBar from "./components/NavBar";
import AbstractRects from "./components/AbstractRects";
import TestimonySection from "./components/TestimonySection";

import PeopleHuggingIcon from "./components/Icons/PeopleHuggingIcon";
import ClockIcon from "./components/Icons/ClockIcon";
import LearnIcon from "./components/Icons/LearnIcon";
import FacebookIcon from "./components/Icons/FacebookIcon";
import InstagramIcon from "./components/Icons/InstagramIcon";
import XIcon from "./components/Icons/XIcon";

import { useData } from "@/providers/DataProvider";

import { PacmanLoader } from "react-spinners";
import { signIn } from "./utils/databasefunctions";
import { checkUser } from "./utils/utilfunctions";

import { useState, useEffect } from "react";
import "./globals.css"

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

  // if (isUserLoaded === null || isUserRegistered === null) {
  //   return (
  //   <div className="h-[100vh] w-full flex justify-center items-center">
  //     <PacmanLoader color="#36d7b7" />
  //   </div>
  //   )
  // }

  return (
    <div className="scroll-smooth ">
      <section>
        {isUserLoaded && isUserRegistered ? (
          <ChatPage />
        ) : isUserLoaded ? (
          <RegisterUser />
        ) : (
          <div className="flex flex-col justify-center items-center mt-[200px] ">
            <NavBar />
            <div className="flex md:flex-col lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col ">
              <div className="flex flex-col m-10 align-middle justify-center mt-[-5px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] sm:mr ">
                <p className="text-[60px] font-bold">
                  Introducing Me2
                </p>
                <p className="text-[20px] font-semibold mt-10">
                  The chat app for you. Meet your community. Find help, and enjoy chatting away!
                </p>
                <div className="flex justify-end mt-8">
                  <Button className="w-[200px] h-[55px] hover:bg-[#8DC1FF] ease-in-out duration-500" onClick={signIn}><p className="text-black font-semibold">Sign Up</p></Button>{" "}
                </div>
              </div>
              <div className="flex flex-row justify-self-center self-center mr-10 ml-10 ">
                <AbstractRects />
              </div>
            </div>

            <div className="flex flex-col justify-center content-center">
              <div className="flex justify-content-center align-middle place-self-center place-content-center">
                <p className="text-[60px] font-bold mt-[200px] mb-[40px]">Why choose us?</p>
              </div>
              <div className="flex flex-row gap-x-[15px] mb-[100px]">
                <div className="flex flex-col h-[325px] sm:w-[225px] md:w-[225px] lg:w-[300px] xl:w-[325px] 2xl:w-[335px] bg-[#C6E0FF] rounded-[10px] justify-center content-center place-content-center">
                  <PeopleHuggingIcon className="place-self-center mt-[-15px]"/>
                  <p className="place-self-center text-[20px] font-semibold mt-[20px]">
                    Find your people
                  </p>
                  <p className="place-self-center text-center text-[12px] font-medium max-w-[200px] mt-3">
                    Discover and make friends with the people with the same interests, same goals, and work out all your problems together!
                  </p>
                </div>
                <div className="flex flex-col h-[325px] sm:w-[225px] md:w-[225px] lg:w-[300px] xl:w-[325px] 2xl:w-[335px] bg-[#C6E0FF] rounded-[10px] justify-center content-center place-content-center">
                  <ClockIcon className="place-self-center mt-[-45px] ml-[30px]"/>
                  <p className="place-self-center text-[20px] font-semibold">
                    Quick answers
                  </p>
                  <p className="place-self-center text-center text-[12px] font-medium max-w-[200px] mt-3">
                    Discover and make friends with the people with the same interests, same goals, and work out all your problems together!
                  </p>
                </div>
                <div className="flex flex-col h-[325px] sm:w-[225px] md:w-[225px] lg:w-[300px] xl:w-[325px] 2xl:w-[335px] bg-[#C6E0FF] rounded-[10px] justify-center content-center place-content-center">
                  <LearnIcon className="place-self-center mt-[-35px]"/>
                  <p className="place-self-center text-[20px] font-semibold">
                    Learn lots
                  </p>
                  <p className="place-self-center text-center text-[12px] font-medium max-w-[200px] mt-3">
                    Access free notes, videos, and tutorials on anything you need from any subject you desire!
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[725px] w-full bg-[#ffe2b7] mt-[100px] mb-[100px]">
              <div className="flex flex-col align-middle text-center justify-center content-center mt-[50px]">
                <p className="text-[60px] font-bold mt-[20px]">
                  Testimonies
                </p>
                <TestimonySection className="flex justify-center mt-[-10px]"/>
              </div>
            </div>

            <div className="h-[350px] w-full bg-[#B2D5FF] mt-[300px] flex justify-items-center place-content-center align-middle flex-col">
              <p className="flex text-[20px] justify-center place-self-center text-center sm:w-[400px] md:w-[400px] lg:w-[455px] xl:w-[500px] 2xl:w-[525px] font-medium">
                Sign up here with your email to get updates on incoming features for Me2!
              </p>
              <div className="flex flex-row justify-center align-middle">
                <form>
                  <div className="flex justify-center">
                    <input type="text" 
                    placeholder='Enter your email here' 
                    className='input-field flex mt-[20px] sm:w-[400px] md:w-[400px] lg:w-[455px] xl:w-[500px] 2xl:w-[525px] h-[45px] rounded-lg mr-3 font-medium'/>
                  </div>
                </form>
                <div className="flex justify-end mt-[20px] sm:w-[110px] md:w-[120px] lg:w-[140px] xl:w-[165px] 2xl:w-[180px]">
                  <Button className="w-[165px] h-[45px] hover:bg-[#ffffff] ease-in-out duration-500" onClick={signIn}><p className="text-black font-semibold">Subscribe</p></Button>
                </div>
              </div>
              <p className="flex text-[15px] justify-center place-self-center text-center sm:w-[522px] md:w-[522px] lg:w-[577px] xl:w-[622px] 2xl:w-[647px] font-medium mt-[20px]">
                By signing up for this email, you are agreeing to news, offers, and information from Me2
              </p>
              <div className="flex flex-row gap-x-[18px] justify-center mt-[20px]">
                <p className="flex justify-center place-self-center">
                  Stay in touch
                </p>
                <FacebookIcon />
                <InstagramIcon className="mr-[2px]"/>
                <XIcon className="mt-[3px]"/>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
