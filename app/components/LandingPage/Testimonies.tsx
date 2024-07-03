import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ImQuotesLeft } from "react-icons/im";

const Testimonies = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full yellow-gradient py-16
    my-40">
      <div className="flex flex-col justify-center gap-y-16 items-center">
        <div className="">
          <p className="uppercase font-semibold text-left">
            What our users say
          </p>
          <h3 className="dynamic-subheading font-semibold">Testimonies</h3>
        </div>
        <div className="relative">
          <svg viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-[25px] z-0 hidden w-32 -mt-8 -ml-20 text-emerald-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
            <defs>
              <pattern id="d0d83814-78b6-480f-9a5f-7f637616b267" x="0" y="0" width=".135" height=".30">
                <circle cx="1" cy="1" r=".7">
                  </circle>
                </pattern>
              </defs>
              <rect fill="url(#d0d83814-78b6-480f-9a5f-7f637616b267)" width="52" height="24">
              </rect>
          </svg>
          <svg viewBox="0 0 52 24" fill="currentColor" className="absolute bottom-0 -right-[40px] z-0 hidden w-32 -mt-8 -ml-20 text-emerald-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
            <defs>
              <pattern id="d0d83814-78b6-480f-9a5f-7f637616b267" x="0" y="0" width=".135" height=".30">
                <circle cx="1" cy="1" r=".7">
                  </circle>
                </pattern>
              </defs>
              <rect fill="url(#d0d83814-78b6-480f-9a5f-7f637616b267)" width="52" height="24">
              </rect>
          </svg>
          <Slider
              {...settings}
              className="
            mx-6 w-[600px] max-lg:w-[525px] max-md:w-[450px] max-sm:w-[375px] max-[450px]:w-[225px]"
            >
            {data.map((d) => (
              <div
                key={d.name}
                className="bg-white text-black max-w-[600px]
              flex flex-col justify-start items-center"
              >
                <div
                  className="h-56 bg-[#8DC1FF] flex justify-center items-center w-[600px] 
                relative overflow-hidden"
                >
                  <ImQuotesLeft
                    className="absolute -left-[100px] -rotate-12 opacity-30"
                    size={400}
                  />
                </div>
                <div className="flex flex-grow flex-col items-center justify-center gap-4 px-4 py-16">
                  <p className="text-2xl font-bold mt-[10px]">{d.name}</p>
                  <p className="text-center text-gray-700">{d.review}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonies;

const data = [
  {
    name: `John Morgan`,
    img: `/students/John_Morgan.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    name: `Ellie Anderson`,
    img: `/students/Ellie_Anderson.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    name: `Nia Adebayo`,
    img: `/students/Nia_Adebayo.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    name: `Rigo Louie`,
    img: `/students/Rigo_Louie.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
  {
    name: `Mia Williams`,
    img: `/students/Mia_Williams.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  },
];
