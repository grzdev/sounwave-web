import { Icon } from "@iconify/react";
import React from "react";

function RecordingButton({ icon, isPulsating, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-[28vw] h-[28vw] md:w-[18vw] md:h-[18vw] border-2 border-[#75cbeb] outline-none bg-[#75cbeb] rounded-full 
                  shadow-[ -0.2vw -0.67vw 1vw #888888, -0.2vw -0.33vw 0.53vw #888888, -0.67vw 0px 1vw #888888, 
                  0.2vw 0.67vw 0.8vw rgba(0, 0, 0, 0.2)] transition-transform duration-300 ease-in-out 
                  cursor-pointer hover:scale-110 active:scale-95 ${isPulsating ? "animate-pulse" : ""}`}
      
    >
      <div
        className="relative grid w-full h-full p-[0.67vw] grid-cols-4 grid-rows-2 
                    shadow-[inset 0px -0.27vw 0px #dddddd, 0px -0.27vw 0px #e2e2e2] rounded-full
                    transition-transform duration-300 ease-in-out z-1"
      
      >
        <h1 className="text-[#0076a3] text-[6vw] col-span-4 row-span-2 flex justify-center items-center">
          <Icon icon={icon} />
        </h1>
      </div>
    </button>
  );
}

export default RecordingButton;
