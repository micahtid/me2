import PeopleHuggingIcon from "../Icons/PeopleHuggingIcon";
import ClockIcon from "../Icons/ClockIcon";
import LearnIcon from "../Icons/LearnIcon";

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
        "Aside from Tinder, Me2 is one of the only chat apps available to find your match! Either through our compatbility algorithm or scouring through users yourself, Me2 is one of a kind to find others with similar interests and circumstances."
    },
    {
      icon: ClockIcon,
      title: "Time Efficient",
      description:
        "Bad at holding a conversation? Wish you didn't say something? Or did you absolutely love your conversation! Either way, Me2 has personal chats that are only open for 24 hours, after which you have the option to share socials. So we gotchu either way."
    },
    {
      icon: LearnIcon,
      title: "Safety Concerns",
      description:
        "Feel uncomfortable? Or like something bad is about to happen? Don't worry! Me2 allows you to close chats whenever. As soon as you feel something is off, click that close button! We also do not have a feature to share media preventing... you know..."
    },
  ];

  return (
    <section
      id="about"
      data-aos="fade-up"
      data-aos-once="true"
      data-aos-anchor-placement="bottom-bottom"
      className="max-w-[1700px] mx-auto w-full px-8 flex flex-col items-center gap-y-24"
    >
      <div className="flex flex-col gap-y-1">
        <p className="text-center dynamic-text font-bold">Why decide to use <span className="text-secondary">us</span>?</p>
        <h3 className="text-center dynamic-subheading font-title font-semibold">We're Simple and Safe</h3>
      </div>
      {cards.map((card, index) => (
        <div
          className={`w-full px-8 py-32 dark-gradient rounded-md shadow-lg flex ${
            index === 1 ? "" : ""
          }`}
          key={index}
        >
          <div className="max-w-[500px] w-full flex flex-col gap-y-3">
            <h3 className="text-3xl text-white font-semibold font-title">{card.title}</h3>
            <p className="text-white">{card.description}</p>
          </div>
          <div className="relative w-[70%]">
            <card.icon className="transform scale-[200%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <card.icon className="transform scale-[50%] absolute left-[150px] -top-[100px] -rotate-[15deg]" />
            <card.icon className="transform scale-[50%] absolute left-[150px] -bottom-[100px] -rotate-[5deg]" />
            <card.icon className="transform scale-[50%] absolute right-[150px] -bottom-[100px] rotate-[25deg]" />
            <card.icon className="transform scale-[50%] absolute right-[150px] -top-[100px] rotate-[2.5deg]" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default AboutUs;
