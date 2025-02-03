import { signIn } from "@/app/utils/databasefunctions";
import { motion } from 'framer-motion';
import { PiPencilSimpleFill } from "react-icons/pi";

const Hero = () => {
  return (
    <section 
      id="hero"
      className="
        relative 
        flex flex-col items-center justify-start
        gap-y-36 max-md:gap-y-24 
      "
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static shapes */}
        <motion.div
          animate={{
            y: [-10, 10],
            rotate: [-45, 45],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute left-[15%] top-[20%] w-8 h-8 rounded-lg bg-gradient-to-r from-[#00224b] to-[#004696] opacity-20 max-[1000px]:hidden"
        />
        <motion.div
          animate={{
            y: [-8, 8],
            rotate: [0, 180],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute right-[20%] top-[15%] w-6 h-6 rounded-full bg-gradient-to-r from-[#004696] to-[#00224b] opacity-30 max-[1000px]:hidden"
        />
        <motion.div
          animate={{
            y: [-12, 12],
            rotate: [-90, 90],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5
          }}
          className="absolute right-[35%] top-[30%] w-10 h-10 rounded-md bg-gradient-to-r from-[#00224b] to-[#004696] opacity-15 max-[1000px]:hidden"
        />
        <motion.div
          animate={{
            y: [-15, 15],
            rotate: [0, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.7,
            ease: "easeInOut"
          }}
          className="absolute left-[35%] top-[2.5%] w-6 h-6 rounded-full bg-gradient-to-r from-[#00224b] to-[#004696] opacity-20 max-[1000px]:hidden"
        />
      </div>

      {/* Main content container */}
      <div className="
        flex flex-col items-center justify-start 
        z-10 gap-y-6 mt-20 
        default-container
      ">
        {/* Hero heading */}
        <h3 className="
          font-title font-semibold 
          text-center 
          dynamic-heading
        ">
          Meet the<br />
          <span className="
            text-transparent 
            bg-clip-text bg-gradient-to-r from-[#00224b] to-[#004696]
          ">
            Chat App for Students
          </span>
        </h3>

        {/* Hero description */}
        <p className="
          text-center 
          dynamic-text 
          max-w-[800px] mb-4
        ">
          A platform to connect students with similar interests. 
          Chat with others, find new friends, and more!
        </p>

        {/* CTA button */}
        <button
          onClick={signIn}
          className="
            flex items-center justify-center 
            gap-x-3 py-3 px-8 
            font-medium text-white 
            rounded-xl 
            dark-gradient 
            hover:brightness-125 
            hover:scale-105
            active:scale-95
            transition-all duration-300
          "
        >
          <PiPencilSimpleFill />
          Sign Up
        </button>
      </div>

      {/* Hero image */}
      <img 
        src="/landing_page_display.png" 
        alt="Landing page display"
        className="
          rounded-lg 
          shadow-xl 
          max-w-[1300px] w-[calc(100%-25px)]
          z-10
        " 
      />
    </section>
  );
};

export default Hero;
