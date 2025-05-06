import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 text-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
        <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white/60 hover:text-white text-sm p-1 bg-transparent border-none shadow-none outline-none"
        aria-label="Fechar modal"
        >
        ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
