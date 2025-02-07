"use client";

// External dependencies
import { useState, useEffect } from "react";
import Lenis from "lenis";
// @ts-expect-error The package does not provide proper TypeScript declarations
import GridLines from '@mezh-hq/react-gridlines';

// Landing Page Components
import NavBar from "./components/LandingPage/NavBar";
import Hero from "./components/LandingPage/Hero";
import Tutorial from "./components/LandingPage/Tutorial";
import AboutUs from "./components/LandingPage/AboutUs";
import FAQ from "./components/LandingPage/FAQ";
import Testimonies from "./components/LandingPage/Testimonies";
import Footer from "./components/LandingPage/Footer";
import LoadIn from "./components/LandingPage/LoadIn";

// Core Components
import RegisterUser from "./components/RegisterUser";
import ChatPage from "./components/ChatPage";
import OopsScreen from "./components/OopsScreen";
import Loader from "./components/Loader";

// Hooks and Context
import { useIsTabActive } from "@/hooks/useIsTabActive";
import { useData } from "@/providers/DataProvider";

// Utilities
import { checkUser } from "./utils/utilfunctions";
import { setUserOnline } from "./utils/usersfunctions";

// Types
interface GradientOverlayProps {
  position: 'top' | 'bottom';
}

const GradientOverlay = ({ position }: GradientOverlayProps) => (
  <div 
    className={`
      absolute ${position}-0 left-0 w-full h-32
      ${position === 'top' 
        ? 'bg-gradient-to-t from-transparent to-white' 
        : 'bg-gradient-to-t from-white to-transparent'
      }
      pointer-events-none z-10
    `}
  />
);

const Home = () => {
  // Authentication and registration state
  const [isUserLoaded, setIsUserLoaded] = useState<boolean | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean | null>(null);
  
  const { user, users } = useData();
  const isTabActive = useIsTabActive();

  // Handle user authentication!
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

  // Handle online & offline status
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateOnlineStatus = async () => {
      if (user?.uid) {
        await setUserOnline(user.uid, isTabActive);
      }
    };

    // Debounce to prevent rapid status updates!
    timeoutId = setTimeout(updateOnlineStatus, 1000);

    return () => {
      clearTimeout(timeoutId);
      // Offline when unmounting...
      if (user?.uid) {
        setUserOnline(user.uid, false);
      }
    };
  }, [isTabActive, user]);

  // Initialize smooth scrolling!
  useEffect(() => {
    const lenis = new Lenis();
    
    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  // Show Loader while checking UserStatus
  if (isUserLoaded === null || isUserRegistered === null) {
    return <Loader />;
  }

  // Render content based on UserState
  const renderContent = () => {
    if (isUserLoaded && isUserRegistered) {
      return <ChatPage />;
    }

    if (isUserLoaded) {
      return <RegisterUser />;
    }

    return (
      <div className="overflow-x-hidden">
        <NavBar />
        <LoadIn>
          <GridLines cellWidth={120} strokeWidth={0.5}>
            <div className="relative">
              <GradientOverlay position="top" />
              <Hero />
              <GradientOverlay position="bottom" />
            </div>
          </GridLines>
        </LoadIn>
        <LoadIn className="my-[150px]"><AboutUs /></LoadIn>
        <LoadIn className="my-[150px]"><Tutorial /></LoadIn>
        <LoadIn className="my-[150px]"><FAQ /></LoadIn>
        <LoadIn className="mt-[250px] mb-[150px]"><Testimonies /></LoadIn>
        <Footer />
      </div>
    );
  };
  
  return (
    <div>
      <section className="max-[325px]:hidden">
        {renderContent()}
      </section>
      <div className="hidden max-[325px]:inline w-full">
        <OopsScreen 
          message="Oops! It looks like you're viewing on a small device!" 
          infoClassName="max-[500px]:w-[80%]"
        />
      </div>
    </div>
  );
};

export default Home;
