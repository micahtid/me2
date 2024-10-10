import PeopleHuggingIcon from "../Icons/PeopleHuggingIcon";
import ClockIcon from "../Icons/ClockIcon";
import LearnIcon from "../Icons/LearnIcon";
import { FaQuestion } from "react-icons/fa6";

import Highlight from "./Highlight";

import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const cards = [
    {
      icon: PeopleHuggingIcon,
      title: "Find your people",
      description:
        "Aside from Tinder, Me2 is one of the only chat apps available to find your match! Either through our compatbility algorithm or scouring through users yourself, Me2 is one of a kind to find others with similar interests and circumstances.",
      rotate: "rotate-[5deg]"
    },
    {
      icon: ClockIcon,
      title: "Time Efficient",
      description:
        "Bad at holding a conversation? Wish you didn't say something? Or did you absolutely love your conversation! Either way, Me2 has personal chats that are only open for 24 hours, after which you have the option to share socials. So we gotchu either way.",
      rotate: "rotate-[-15deg]"
    },
    {
      icon: LearnIcon,
      title: "Safety Concerns",
      description:
        "Feel uncomfortable? Or like something bad is about to happen? Don't worry! Me2 allows you to close chats whenever. As soon as you feel something is off, click that close button! We also do not have a feature to share media preventing... you know...",
      rotate: "rotate-[10deg]"
    },
  ];

  return (
    <section
      id="about"
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-anchor-placement="bottom-bottom"
      className="max-w-[1500px] mx-auto w-full px-4 flex flex-col items-center gap-y-24"
    >
      <Highlight icon={<FaQuestion />} title="Why Decide to Use Us" className="-mb-16" />

      <div className="flex flex-col gap-y-1">
        <h3 className="text-center dynamic-subheading font-title font-semibold relative inline-block">
          <svg viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-0 -z-10 hidden w-32 -mt-8 -ml-20 text-emerald-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
            <defs>
              <pattern id="d0d83814-78b6-480f-9a5f-7f637616b267" x="0" y="0" width=".135" height=".30">
                <circle cx="1" cy="1" r=".7"></circle>
              </pattern>
            </defs>
            <rect fill="url(#d0d83814-78b6-480f-9a5f-7f637616b267)" width="52" height="24"></rect>
          </svg>
          We're <span className="text-header underline">Simple</span> and <span className="text-header underline">Safe</span>
        </h3>
      </div>

      {cards.map((card, index) => (
        <div
          className={`w-full px-8 py-32 dark-gradient rounded-md shadow-lg flex 
            max-[1000px]:flex-col-reverse max-[650px]:py-24 max-[650px]:px-4
            ${index === 1 && "flex-row-reverse"}`}
          key={index}
        >
          <div className="max-w-[500px] w-full flex flex-col gap-y-3 max-[1000px]:max-w-none">
            <h3 className="text-3xl text-white font-semibold font-title">{card.title}</h3>
            <p className="text-white">{card.description}</p>
          </div>

          <div className={`w-[50%] flex
            ${index === 1 ? "justify-start" : "justify-end"}
            max-[1000px]:w-full max-[1000px]:justify-start max-[1000px]:mb-16`}
          >
            <card.icon className={`transform scale-[250%] bg-black/50 p-4 rounded-lg shadow-lg ${card.rotate}
            max-[1000px]:w-[200px] max-[1000px]:h-[200px] max-[1000px]:scale-100 max-[1000px]:rotate-0`} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default AboutUs;
