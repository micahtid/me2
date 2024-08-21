import { footerNotes } from "@/app/data";

const Footer = () => {
  return (
    <div
      id="footer"
      className="bg-primary px-20 py-20 flex justify-center items-center
      max-lg:px-4 overflow-x-hidden"
    >
      <div
        className="
        flex flex-col justify-center items-center gap-y-2
        max-w-[1100px] w-full
        max-lg:max-w-[800px]"
      >
        <div
          className="
          flex flex-row justify-center items-start gap-x-20
          max-h-[250px] overflow-hidden max-lg:mb-12
          max-sm:grid max-sm:grid-cols-2 max-sm:max-h-none max-sm:gap-y-14
          max-[400px]:flex max-[400px]:flex-col max-[400px]:items-start max-[400px]:w-full
          max-[400px]:ml-16"
        >
          {footerNotes.map((col, index) => (
            <div key={index} className="flex flex-col justify-start items-start gap-y-2
            max-[400px]:grid max-[400px]:grid-cols-2">
              <h3 className="uppercase font-bubble font-bold max-[400px]:text-left
              max-[400px]:w-[125px]">{col.header}</h3>
              <div className="max-[400px]:block hidden"></div>
              {col.links.map((link, index) => (
                <a key={index} href={link.link} className="text-black/80
                max-[400px]:text-left max-[400px]:w-[125px] ">
                  {link.label}
                </a>
              ))}
            </div>
          ))}
          <img
            src="/clumsy.svg"
            className="w-[500px] opacity-70 max-xl:w-[300px] max-lg:hidden"
          />
        </div>
        <div className="w-full max-lg:w-[550px] max-sm:w-[80%]">
          <div className="w-full h-[2px] bg-black/50 rounded-full mb-4"></div>
          <div className="w-full flex flex-row justify-start gap-x-8 max-lg:flex-col max-lg:gap-y-2 items-center
          max-sm:flex-col max-sm:gap-y-1">
            <p className="text-nowrap overflow-ellipsis text-black/80 text-sm">@2024 Me2, All Rights Reserved</p>
            <p className="text-black/80 text-sm">Built Using React & NextJS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;