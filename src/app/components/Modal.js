import { Icon } from "@iconify/react";
import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 md:mt-[-3rem] bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1D1F24] text-white rounded-xl py-[2rem] md:py-[3rem] w-[90%] md:w-[53rem] relative">
        <button
          className="absolute top-3 right-3 text-gray-300 font-bold hover:text-gray-400"
          onClick={onClose}
        >
          <Icon icon="material-symbols:close" width="30" height="30" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
