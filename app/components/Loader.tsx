import { PacmanLoader } from "react-spinners";

import "./loader.css"

const Loader = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      {/* <PacmanLoader size={35} color="#C6E0FF" /> */}
      <img src="/favicon.ico" className="h-[75px] w-auto animate-pulse pulse-scale-animation" />
    </div>
  );
};

export default Loader;
