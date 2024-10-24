import { PacmanLoader } from "react-spinners";

import "./loader.css"

const Loader = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      {/* <PacmanLoader size={35} color="#C6E0FF" /> */}
      <img src="/roller-skating.svg" className="h-[40%] w-auto animate-pulse pulse-scale-animation" />
    </div>
  );
};

export default Loader;
