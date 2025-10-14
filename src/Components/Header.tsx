"use client";

import React from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6 md:px-10">
      {/* Left: Logo + Tagline */}
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

      {/* Right: Dynamic Nav */}
      <div className="flex items-center gap-3">
        {/* When user is signed in */}
        <SignedIn>
          <Link
            href="/snaps"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-yellow-400 text-white font-semibold shadow-md hover:brightness-105 transition"
          >
            SnapSort
          </Link>
          <Link
            href="/gallery"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-orange-400 text-white font-semibold shadow-md hover:brightness-105 transition"
          >
            My Gallery
          </Link>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </SignedIn>

        {/* When user is signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 text-white font-semibold shadow-md hover:brightness-105 transition">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 rounded-full bg-white/70 text-slate-700 font-semibold shadow-md hover:bg-white transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
