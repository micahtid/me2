import { twMerge } from "tailwind-merge";

interface OopsScreenProps {
    message: string;
    infoClassName?: string;
    divClassName?: string;
}

const OopsScreen: React.FC<OopsScreenProps> = ({ message, infoClassName, divClassName }) => (
  <div className={twMerge(`flex justify-center items-center w-full h-full`, divClassName)}>
    <div className={twMerge(`w-[300px] -mt-20
    max-lg:my-10 max-lg:w-[20%]`, infoClassName)}>
      <img src="/reading-side.svg" alt="Quiet here" className="w-full h-auto" />
      <h3 className="text-center text-xl font-medium">
        {message}
      </h3>
    </div>
  </div>
);

export default OopsScreen;
