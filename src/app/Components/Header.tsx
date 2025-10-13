import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-pink-400 flex items-center justify-center shadow-lg">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M3 7h18M3 12h18M3 17h18"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h1 className="font-poppins text-2xl md:text-3xl tracking-tight">
            SnapSort
          </h1>
          <p className="text-sm text-slate-600">
            Chill. Tag. Organize — let the AI vibe with your photos.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-yellow-400 text-white font-semibold shadow-md hover:brightness-105 transition">
          <Link href="/">SnapSort</Link>
        </button>
        <button className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-orange-400 text-white font-semibold shadow-md hover:brightness-105 transition">
          <Link href="/gallery">My Gallery</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
