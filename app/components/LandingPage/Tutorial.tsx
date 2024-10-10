import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";

const steps = [
  {
    icon: <RiNumber1 size={15} />,
    title: "Create an Account",
    description: "Tell us a bit about yourself and your interests!"
  },
  {
    icon: <RiNumber2 size={15} />,
    title: "Find Users",
    description: "Either use our compatibility algorithm or view different users yourself and send a chat request!"
  },
  {
    icon: <RiNumber3 size={15} />,
    title: "Meet Your New Friend",
    description: "Chat away for the next 24 hours and get to know them!"
  },
  {
    icon: <RiNumber4 size={15} />,
    title: "Exchange Socials",
    description: "Had a good conversation? Say 'Yes' to share socials!"
  }
];

const Tutorial = () => {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section 
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-anchor-placement="bottom-bottom"
      className='w-full py-28 flex justify-center items-center bg-primary 
      relative overflow-hidden'>

      <div className="absolute -left-[400px] top-1/2 transform -translate-y-1/2
      w-[1000px] h-[1000px] bg-secondary rounded-full
      blur-3xl" />

      <div className="max-w-[1300px] w-full flex flex-col justify-start items-center gap-y-16">
        
        <div className="relative flex flex-col items-center gap-y-6">
          <div className="flex flex-col gap-y-1 px-4">
            <h3 className='dynamic-subheading font-title font-semibold text-center'>How It Works</h3>
            <p className="dynamic-text text-center max-w-[500px]">Follow our easy list of instructions to start!</p>
          </div>

          <img src="/tutorial_display.png" 
            className='rounded-lg brightness-[95%] px-4
            max-md:px-0 max-lg:w-full max-md:mb-6'/>

          <div className="flex flex-col gap-y-4 px-4
          2xl:absolute 2xl:-right-[50px] 2xl:top-[0px]
          max-2xl:w-full max-2xl:flex-row max-2xl:justify-center max-2xl:flex-wrap 
          max-2xl:gap-8 max-2xl:-mt-8">
            {steps.map((step, index) => (
              <div key={index} 
                className="p-4 flex flex-col gap-y-4
                max-w-[400px] w-full h-[150px]
                max-[1022px]:max-w-none max-[1022px]:h-auto
                bg-[#FAFAFA] shadow-md rounded-lg">
                <div className="bg-header flex justify-center items-center 
                w-[30px] h-[30px] rounded-full text-white/80">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-header font-bold font-header">{step.title}</h3>
                  <p className="text-gray-800">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
