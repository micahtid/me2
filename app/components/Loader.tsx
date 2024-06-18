import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <PacmanLoader size={35} color="#C6E0FF" />
    </div>
  );
};

export default Loader;
