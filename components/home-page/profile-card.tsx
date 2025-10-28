"use client";

import React, { useState, useEffect } from "react";

export default function ProfileCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");

  const rotatingWords = ["backends", "frontends", "designs", "scalable-systems"];

  useEffect(() => {
    // Update the current time every second
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Word rotation with fade animation
    const wordTimer = setInterval(() => {
      setFadeState("fade-out");
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setFadeState("fade-in");
      }, 400); // wait for fade-out before changing text
    }, 2500);

    return () => {
      clearInterval(timerId);
      clearInterval(wordTimer);
    };
  }, []);

  const formattedTime = currentTime
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace(",", "");

  

  return (
    <div className="rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-zinc-900/80 shadow-2xl border border-zinc-800 px-7 md:px-10 py-7 md:py-5 w-full backdrop-blur-md h-full flex flex-col">
      {/* Top section */}
      <div className="flex items-start gap-4">
        <img
          src="/myprofileimage.png"
          alt="SG"
          className="w-[72px] h-[72px] rounded-full border-2 border-zinc-700 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-zinc-100 leading-none">
                somil
              </div>
              <div className="text-sm text-zinc-400">@gsomil</div>
            </div>

            {/* Resume hover */}
            <div
              className="relative text-zinc-400 text-sm cursor-pointer"
            >
              夜
            </div>
          </div>

          {/* Smoothly rotating text */}
          <p className="text-zinc-100 mt-4 text-lg">
            I build{" "}
            <span
              className={`font-bold text-purple-400 inline-block transform transition-all duration-700 ease-in-out ${
                fadeState === "fade-in"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {rotatingWords[currentWordIndex]}
            </span>
            
          </p>

          <p className="text-zinc-400 mt-2">
            Hello, I’m Somil! a 21 year old developer based in India.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-2">
        <div className="flex items-center gap-2 mt-4 text-xs text-zinc-400">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
          Available for work
          <span className="ml-auto font-mono">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
