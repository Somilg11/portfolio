/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";

export default function ProfileCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");
  const [mounted, setMounted] = useState(false);
  const [rainyTheme, setRainyTheme] = useState(false);

  const rotatingWords = [
    "backends",
    "frontends",
    "designs",
    "scalable-systems",
  ];

  // ⏱ time + text rotation
  useEffect(() => {
    setMounted(true);
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("rainyTheme");
    if (savedTheme === "true") {
      setRainyTheme(true);
      document.documentElement.classList.add("rainy");
    }

    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const wordTimer = setInterval(() => {
      setFadeState("fade-out");
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setFadeState("fade-in");
      }, 400);
    }, 2500);

    return () => {
      clearInterval(timerId);
      clearInterval(wordTimer);
    };
  }, []);

  useEffect(() => {
    if (rainyTheme) {
      document.documentElement.classList.add("rainy");
    } else {
      document.documentElement.classList.remove("rainy");
    }
    localStorage.setItem("rainyTheme", String(rainyTheme));
  }, [rainyTheme]);

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
    <div className="rounded-2xl bg-black shadow-2xl border border-zinc-800 px-7 md:px-10 py-7 md:py-5 w-full h-full flex flex-col relative z-20">
      <div className="flex items-start gap-4">
        <img
          src="/myprofileimage.png"
          alt="SG"
          className="w-[72px] h-[72px] rounded-full border-2 border-zinc-700 object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-zinc-100">somil</div>
              <div className="text-sm text-zinc-400">@gsomil</div>
            </div>

            <button
              onClick={() => setRainyTheme(!rainyTheme)}
              className={`p-2 text-xs font-bold transition-all duration-300 hover:scale-110 ${rainyTheme ? "text-blue-300" : "text-zinc-400 hover:text-white"}`}
            >
              猫
            </button>
          </div>

          <p className="text-zinc-100 mt-4 text-lg">
            I build{" "}
            <span
              className={`font-bold text-purple-400 transition-all duration-700 ${
                fadeState === "fade-in"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {rotatingWords[currentWordIndex]}
            </span>
          </p>

          <p className="text-zinc-400 mt-2">
            Hello, I&apos;m Somil! a 22 year old developer based in India.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-2 text-xs text-zinc-400 flex items-center">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
        Available for work
        <span className="ml-auto font-mono">{mounted ? formattedTime : ""}</span>
      </div>
    </div>
  );
}
