import React from "react";
import { IoClose } from "react-icons/io5";
import {createPortal} from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-content-center absolute z-40 top-0 h-screen w-screen backdrop-blur">
          <div
            className="relative m-auto z-50 min-w-[250px] max-w-[80%]
       bg-white"
          >
            <div className="flex justify-end">
              <IoClose onClick={onClose} className="text-4xl self-end" />
            </div>
            
            {children}
          </div>
        
        </div>
      )}
    </>, 
    document.getElementById("modal-root")
  );
};

export default Modal;
