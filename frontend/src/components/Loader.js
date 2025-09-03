// src/components/Loader.js
import React from "react";

export default function Loader({ message = "Loading...", size = 24 }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50 select-none">
      {/* Spinner */}
      <div
        style={{ width: size * 2, height: size * 2 }}
        className="relative rounded-full animate-spin-slow"
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-green-500"
          style={{ borderWidth: 4 }}
        ></div>
        {/* Inner ring */}
        <div
          className="absolute inset-3 rounded-full border-4 border-t-transparent border-l-transparent border-yellow-400"
          style={{ borderWidth: 4 }}
        ></div>
      </div>

      {/* Pulsating loading text */}
      <p className="mt-6 text-lg font-semibold text-green-600 animate-pulse">{message}</p>

      {/* Extra subtle bounce effect */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
