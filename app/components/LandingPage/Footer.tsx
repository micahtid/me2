import Button from "../Button";

import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 
    flex flex-col justify-center items-center gap-y-8 py-16 px-4">
      <div className="flex flex-col justify-center items-center gap-y-2">
        <p className="text-gray-700 text-center">
          Sign up here with your email to get updates on incoming features for
          Me2!
        </p>
        <form className="flex flex-row justify-center items-center gap-x-2 w-full max-w-[500px] mt-[10px]">
              <input
                type="text"
                placeholder="Enter your email here"
                className="input-field flex rounded-lg mr-3 font-medium"
              />
            <Button className="px-6 py-2 text-white" onClick={() => {}}>
              Subscribe
            </Button>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-700 italic text-center">All rights reserved for Me2 2024.</p>
        <p className="text-gray-700 text-center"><a className="underline" href="https://micahdev.vercel.app">Micah Tid</a> & <a className="underline" href="">Ean Yu</a></p>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center">
        <p className="font-semibold uppercase text-nowrap">Connect</p>
        <FaFacebook size={30} />
        <AiFillInstagram size={30} />
        <RiTwitterXLine size={30} />
      </div>
    </footer>
  );
};

export default Footer;
