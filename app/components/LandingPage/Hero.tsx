import { signIn } from "@/app/utils/databasefunctions";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PiPencilSimpleFill } from "react-icons/pi";

const Hero = () => {
  // Initialize AOS (Animate On Scroll) library
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section 
      id="hero" 
      className="
        flex 
        flex-col 
        items-center 
        justify-start 
        gap-y-44 
        max-md:gap-y-24
      "
    >
      {/* Main content container */}
      <div className="
        flex 
        flex-col 
        justify-start 
        items-center 
        default-container 
        gap-y-6 
        mt-20 
        z-10
      ">
        {/* Hero heading */}
        <h3 className="font-title dynamic-heading text-center font-semibold">
          Meet the<br />
          <span className="
            text-transparent 
            bg-clip-text 
            bg-gradient-to-r 
            from-[#00224b] 
            to-[#004696]
          ">
            Chat App for Students
          </span>
        </h3>

        {/* Hero description */}
        <p className="text-center dynamic-text max-w-[800px] mb-4">
          A platform to connect students with similar interests and circumstances. 
          Chat with others, find new friends, and more!
        </p>

        {/* CTA button */}
        <button
          onClick={signIn}
          className="
            flex 
            justify-center 
            items-center 
            gap-x-3 
            py-3 
            px-8 
            rounded-xl 
            dark-gradient 
            text-white 
            font-medium 
            hover:brightness-125 
            transition-all 
            duration-300
          "
        >
          <PiPencilSimpleFill />
          Sign Up
        </button>
      </div>

      {/* Hero image with animation */}
      <img 
        src="/landing_page_display.png" 
        alt="Landing page display"
        data-aos="fade-up"
        data-aos-once="true"
        className="
          rounded-lg 
          shadow-xl 
          z-10 
          sm:px-4
        " 
      />
    </section>
  );
};

export default Hero;
