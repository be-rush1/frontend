import React from "react";

export default function ErrorWindow({ message, onClose }) {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-red-50 border-2 border-red-400 rounded-xl shadow-2xl p-8 max-w-md w-full animate-fadeIn">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-200 rounded-full p-3 shadow-lg animate-pulse">
            <svg
              className="w-8 h-8 text-red-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-center text-red-800 mb-3 drop-shadow-md">
          Ops, ocorreu um erro!
        </h2>
        <p className="text-center text-red-600 mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="block !mx-auto !px-6 !py-2 !rounded-full !bg-red-600 !text-white !font-semibold hover:!bg-red-700 !transition-colors !shadow-md !focus:outline-none !focus:ring-4 !focus:ring-red-400">
          OK
        </button>
      </div>
    </div>
  );
}
