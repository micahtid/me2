import { twMerge } from "tailwind-merge";

interface OopsScreenProps {
    message: string;
    infoClassName?: string;
    divClassName?: string;
}

const OopsScreen: React.FC<OopsScreenProps> = ({ message, infoClassName, divClassName }) => (
  <div className={twMerge(`
    flex justify-center items-center 
    w-full h-full`, divClassName)}>
    <div className={twMerge(`
      flex flex-col items-center
      w-full max-w-[450px] -mt-20
      px-4
    `, infoClassName)}>
      <div className="w-full max-w-[300px]">
        <img 
          src="/reading-side.svg" 
          alt="Quiet here" 
          className="w-full h-auto mb-6" 
        />
      </div>
      <h3 className="text-center text-xl font-medium text-gray-700">
        {message}
      </h3>
    </div>
  </div>
);

export default OopsScreen;
