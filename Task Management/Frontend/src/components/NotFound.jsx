import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden text-white">

      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative z-10 text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl px-10 py-14 max-w-xl w-full shadow-2xl">

        {/* 404 */}
        <h1 className="text-[120px] font-extrabold leading-none bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-pulse">
          404
        </h1>

        <h2 className="text-3xl font-semibold mt-2">
          Page Not Found
        </h2>

        <p className="text-gray-400 mt-4">
          You tried to access a page that doesn’t exist or has been removed.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

