import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";

const steps = [
  {
    icon: <RiNumber1 size={15} />,
    title: "Create an Account",
    description: "Tell us a bit about yourself and your interests!",
    position: "top-[0px]"
  },
  {
    icon: <RiNumber2 size={15} />,
    title: "Find Users",
    description: "Either use our compatibility algorithm or view different users yourself and send a chat request!",
    position: "top-[180px]"
  },
  {
    icon: <RiNumber3 size={15} />,
    title: "Meet Your New Friend",
    description: "Chat away for the next 24 hours and get to know them!",
    position: "top-[360px]"
  },
  {
    icon: <RiNumber4 size={15} />,
    title: "Exchange Socials",
    description: "Had a good conversation? Say 'Yes' to share socials!",
    position: "top-[540px]"
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
      className='w-full py-28 flex justify-center items-center bg-primary'>
      <div className="max-w-[1300px] w-full flex flex-col justify-start items-center gap-y-16">
        <div className="relative flex flex-col items-center gap-y-8">
          <h3 className='dynamic-subheading font-title font-semibold'>How It Works</h3>
          <img src="/tutorial_display.png" 
            className='rounded-lg brightness-[95%]'/>

          {steps.map((step, index) => (
            <div key={index} 
              className={`p-4 flex flex-col gap-y-4
              absolute -right-[50px] ${step.position}
              max-w-[400px] w-full h-[150px]
              bg-[#FAFAFA] shadow-md rounded-lg`}>
              <div className="bg-header flex justify-center items-center 
              w-[30px] h-[30px] rounded-full text-white/80">
                {step.icon}
              </div>
              <div className="">
                <h3 className="text-header font-bold font-header">{step.title}</h3>
                <p className="text-gray-800">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
