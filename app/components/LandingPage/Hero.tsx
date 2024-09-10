import Button from "../Button";
import AbstractRects from "./AbstractRects";

import { signIn } from "@/app/utils/databasefunctions";

const Hero = () => {
  return (
    <section
      id="hero"
      className="flex flex-row justify-center items-center gap-x-20
    max-lg:flex-col h-full w-full"
    >
      <div
        className="flex flex-col justify-center items-start max-w-[350px] max-lg:max-w-[400px]
      max-lg:items-center h-full"
      >
        <h3 className="dynamic-heading font-bold text-black text-left max-lg:text-center">
          The Chat App For Students
        </h3>
        <p
          className="dynamic-text text-gray-700 mt-10 text-left
        max-lg:text-center"
        >
          Meet Me2! The chat app designed for students to find other students
          with similar interests and experiences.
        </p>
        <div className="flex justify-end mt-8">
          <Button
            className="px-12 py-4 rounded-lg bg-[#3ca0fd] font-semibold hover:bg-[#51aafd] smooth-animation"
            onClick={signIn}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className="flex h-full max-lg:hidden">
        <AbstractRects />
      </div>
    </section>
  );
};

export default Hero;
