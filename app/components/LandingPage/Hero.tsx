import { signIn } from "@/app/utils/databasefunctions";
import { PiPencilSimpleFill } from "react-icons/pi";

const Blobs = () => {
  return (
    <div className="absolute inset-0">
      {/* Top blob */}
      <svg 
        className="absolute left-[20%] -top-[25%] w-[60%]"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#00224b"
          opacity="0.55"
          d="M52.1,-22.1C61.5,-2.2,58.6,23.1,44.8,36.9C31,50.7,6.4,53,-15.7,46.5C-37.8,40,-57.3,24.7,-58.8,7.1C-60.3,-10.5,-43.7,-30.5,-25.9,-45.1C-8.1,-59.7,10.9,-69,25.1,-57.7C39.3,-46.4,48.8,-14.5,52.1,-22.1Z"
          transform="translate(100 100)"
        />
      </svg>
      
      {/* Right blob */}
      <svg 
        className="absolute -right-[15%] -top-[10%] w-[55%]"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#00224b"
          opacity="0.75"
          d="M44.3,-57.1C55.9,-47.3,62.9,-31.6,67.1,-14.2C71.3,3.2,72.8,22.3,65.5,36.7C58.3,51.1,42.3,60.8,25.2,65.7C8,70.5,-10.4,70.5,-27.4,65.1C-44.4,59.7,-60,48.9,-69.7,33C-79.3,17,-83,-4.1,-76.9,-21.3C-70.8,-38.5,-54.9,-51.8,-39,-59.4C-23.1,-67,-7.2,-68.9,7.5,-67.8C22.2,-66.7,35.9,-62.6,44.3,-57.1Z"
          transform="translate(100 100)"
        />
      </svg>
      
      {/* Left blob */}
      <svg 
        className="absolute -bottom-[23.5%] -left-[14.5%] w-[50%]"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#00224b"
          opacity="0.90"
          d="M38.5,-47.1C52.9,-40.1,69.4,-31.6,71.9,-19.9C74.4,-8.2,62.8,6.7,54.4,21.5C46,36.3,40.7,51,30.1,57.1C19.5,63.2,3.7,60.7,-12.8,57.1C-29.3,53.5,-46.5,48.8,-54.9,37.5C-63.3,26.2,-62.9,8.3,-59.1,-7.7C-55.3,-23.7,-48.1,-37.8,-37.1,-45.5C-26.1,-53.3,-11.3,-54.7,0.8,-55.7C12.9,-56.7,25.8,-57.3,38.5,-47.1Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

const Hero = () => {
  return (
    <section 
      id="hero"
      className="
        relative 
        w-full
        default-container
        grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr]
        gap-y-12 lg:gap-x-12
        items-center
      "
    >
      {/* Hero Content */}
      <div className="
        flex flex-col items-center lg:items-start
        gap-y-4
        order-first
      ">
        {/* Hero heading */}
        <h3 className="
          font-title font-semibold 
          text-center lg:text-left
          dynamic-subheading
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
          text-center lg:text-left
          dynamic-text 
          max-w-[800px] mb-2
        ">
          A platform to connect students with similar interests. 
          Chat with others, find new friends, and more!
        </p>

        {/* CTA Button */}
        <button
          onClick={() => signIn()}
          className="
            flex flex-row items-center justify-center gap-x-2 
            px-6 py-3 
            font-medium text-white 
            bg-header
            rounded-xl 
            hover:shadow-lg hover:scale-105
            transition-all duration-300
          "
        >
          <PiPencilSimpleFill className="text-lg" />
          Get Started
        </button>
      </div>

      {/* Hero Image Container */}
      <div className="relative lg:ml-8 order-last">
        <Blobs />
        <img 
          src="/landing_page_display.png" 
          alt="Landing page display"
          className="
            rounded-lg 
            shadow-xl 
            w-full
            relative
            z-10
          " 
        />
      </div>
    </section>
  );
};

export default Hero;
