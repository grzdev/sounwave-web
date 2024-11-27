import React from "react";

function Loader() {
  return (
    <div className="flex flex-col gap-[3rem]">
      <div className="flex flex-col gap-[0.3rem] md:gap-[0.5rem]">
        <div className="w-[5rem] h-[1.3rem] md:w-[8rem] md:h-[2rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
        <div className="w-[9rem] h-[1.3rem] md:w-[15rem] md:h-[2rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
        <div className="flex flex-row gap-[1rem] mt-[0.5rem] md:mt-[1rem] overflow-x-auto">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-[0.3rem] md:gap-[0.5rem]"
            >
              <div className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[11rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
              <div className="w-[5rem] h-[1.3rem] md:w-[8rem] md:h-[2rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
              <div className="w-[7rem] h-[1.3rem] md:w-[10rem] md:h-[2rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[0.3rem] md:gap-[0.5rem]">
        <div className="w-[5rem] h-[1.3rem] md:w-[8rem] md:h-[2rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
        <div className="w-[9rem] h-[1.3rem] md:w-[15rem] md:h-[2rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
        <div className="flex flex-row gap-[1rem] mt-[0.5rem] md:mt-[1rem] overflow-x-auto">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-[0.3rem] md:gap-[0.5rem]"
            >
              <div className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[11rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
              <div className="w-[5rem] h-[1.3rem] md:w-[8rem] md:h-[2rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
              <div className="w-[7rem] h-[1.3rem] md:w-[10rem] md:h-[2rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loader;
