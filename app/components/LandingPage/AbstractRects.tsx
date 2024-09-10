import { memo } from "react";
import type { FC } from "react";

interface Props {
  className?: string;
}

const AbstractRects: FC<Props> = memo(function AbstractRects(props = {}) {
  return (
    <div className="w-[480px] h-[490px] mt-24 grid grid-cols-8 grid-rows-9 gap-3">
      <div className="shadow-md row-span-4 col-span-5 bg-[#2594fd] text-transparent rounded-xl">
        {""}
      </div>
      <div className="shadow-md row-span-2 col-span-3 bg-[#6ca7ff] text-transparent rounded-xl">
        {""}
      </div>
      <div className="shadow-md row-span-3 col-span-3 bg-[#7cb7ff] text-transparent rounded-xl">
        {""}
      </div>
      <div className="shadow-md row-span-4 col-span-3 bg-[#6ca7ff] text-transparent rounded-xl">
        {""}
      </div>
      <div className="shadow-md row-span-2 col-span-2 bg-[#ffb950] text-transparent rounded-xl">
        {""}
      </div>
      <div className="shadow-md row-span-3 col-span-3 bg-[#2594fd] text-transparent rounded-xl">
        {""}
      </div>
      <div className="shadow-md row-span-2 col-span-2 bg-[#7cb7ff] text-transparent rounded-xl">
        {""}
      </div>
    </div>
  );
});

export default AbstractRects;
