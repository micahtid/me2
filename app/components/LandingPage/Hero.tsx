import { signIn } from "@/app/utils/databasefunctions";

const Hero = () => {
  return (
    <section id="hero" className="flex flex-col items-center justify-start gap-y-44">
      <div className="flex flex-col justify-start items-center max-w-[1000px] gap-y-6 mt-20">
        <h3 className="font-title dynamic-heading text-center font-semibold">
          Meet the<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00224b] to-[#004696]">
            Chat App for Students
          </span>
        </h3>
        <p className="text-center font-medium text-xl">The chat app for students. Find partners and others like you!</p>
        <button
          className="py-3 px-6 text-xl rounded-xl bg-[#00224b] text-white font-medium"
          onClick={signIn}
        >
          Sign Up
        </button>
      </div>
      <img src="/landing_page_display.png" className="rounded-lg shadow-xl" />
    </section>
  );
};

export default Hero;
