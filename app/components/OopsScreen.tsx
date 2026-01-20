import { twMerge } from "tailwind-merge";

interface OopsScreenProps {
    message: string;
    infoClassName?: string;
    divClassName?: string;
    hideWarning?: boolean;
}

const OopsScreen: React.FC<OopsScreenProps> = ({ message, infoClassName, divClassName, hideWarning }) => (
  <div className={twMerge(`
    flex justify-center items-center
    w-full h-full`, divClassName)}>
    <div className={twMerge(`
      flex flex-col items-center
      w-full max-w-[450px] -mt-20
      px-4
    `, infoClassName)}>
      <div className="relative w-full max-w-[280px] mb-8">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-full blur-3xl" />
        <img
          src="/reading-side.svg"
          alt="Quiet here"
          className="w-full h-auto relative z-10 opacity-80"
        />
      </div>
      <div className="text-center space-y-3 flex flex-col items-center w-full">
        <h3 className="text-xl font-bold text-gray-900 text-center w-full">
          {message}
        </h3>
        {!hideWarning && (
          <p className="text-sm text-gray-600 max-w-[280px] text-center mx-auto leading-relaxed">
            Please switch to a larger device for the best experience.
          </p>
        )}
      </div>
    </div>
  </div>
);

export default OopsScreen;
