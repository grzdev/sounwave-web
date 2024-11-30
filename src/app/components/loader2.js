import React from "react";

function Loader2() {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <div className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] bg-[#1D1F24] rounded-full animate-pulse"></div>
      <div className="w-[9rem] h-[1.3rem] md:w-[15rem] md:h-[3rem] bg-[#1D1F24] rounded-2xl animate-pulse"></div>
    </div>
  );
}

export default Loader2;
