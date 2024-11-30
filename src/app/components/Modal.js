import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1D1F24] text-white rounded-xl py-[3rem] w-[90%] md:w-[30rem] relative">
        <button
          className="absolute top-3 right-5 text-gray-300 font-bold hover:text-gray-400"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
