"use client";

import React from "react";
import Link from "next/link";
import Header from "@/Components/Header";
import Image from "next/image";
import heroImage from "../../public/bruh.png"; // replace with your actual generated image path

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#b5f3f1] via-[#fbc2eb] to-[#fff4e6] text-slate-800 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6">
        <Header />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-16 gap-10">
        {/* Text Content */}
        <div className="flex flex-col gap-6 max-w-xl">
          <h1 className="font-poppins text-4xl md:text-6xl font-semibold leading-tight text-slate-800">
            Organize Your Photos <br />
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              The Funky AI Way 🎨
            </span>
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            Meet <strong>SnapSort</strong> — your chill AI-powered photo
            organizer. Upload, auto-tag, and sort your memories effortlessly
            while keeping those aesthetic vibes alive.
          </p>

          <div className="flex gap-4 mt-4">
            <Link
              href="/gallery"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 text-white font-semibold shadow-lg hover:brightness-105 transition"
            >
              Get Started 🚀
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm text-slate-700 font-semibold shadow-md hover:bg-white/80 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full md:w-[45%] h-[300px] md:h-[450px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 ease-in-out">
            <Image
              src={heroImage}
              alt="SnapSort Hero Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-16 py-20 grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "🎯 Smart Auto-Tags",
            desc: "Let Gemini AI analyze your photos and suggest fun, accurate tags instantly.",
          },
          {
            title: "💾 Cloud Sync",
            desc: "Store and organize your memories safely — accessible anytime, anywhere.",
          },
          {
            title: "🎨 Aesthetic Gallery",
            desc: "Enjoy a chill, minimal, pastel-inspired interface that vibes with your creativity.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="p-6 bg-white/50 rounded-2xl shadow-lg backdrop-blur-md hover:shadow-xl transition"
          >
            <h3 className="font-poppins text-xl font-semibold mb-2 text-slate-800">
              {feature.title}
            </h3>
            <p className="text-slate-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-slate-600">
        Made with ✨ and chill — SnapSort © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
