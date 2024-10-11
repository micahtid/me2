import React from 'react';

interface OopsScreenProps {
    message: string;
}

const OopsScreen: React.FC<OopsScreenProps> = ({ message }) => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="w-[300px] -mt-20
    max-lg:my-10 max-lg:w-[20%]">
      <img src="/reading-side.svg" alt="Quiet here" className="w-full h-auto" />
      <h3 className="text-center text-xl font-medium">
        {message}
      </h3>
    </div>
  </div>
);

export default OopsScreen;
