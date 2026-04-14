/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Edge = "bottom" | "top" | "left" | "right";

export default function ProfileCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");
  const [catPeeking, setCatPeeking] = useState(false);
  const [catPosition, setCatPosition] = useState<Edge>("bottom");

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [paws, setPaws] = useState<{ x: number; y: number; id: number }[]>([]);

  const rotatingWords = [
    "backends",
    "frontends",
    "designs",
    "scalable-systems",
  ];

  // ⏱ time + text rotation
  useEffect(() => {
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

  // 🖱 cursor tracking + paw trail
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });

      // add paw
      const id = Date.now();
      setPaws((prev) => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id }]);

      // remove after delay
      setTimeout(() => {
        setPaws((prev) => prev.filter((p) => p.id !== id));
      }, 800);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const getRandomEdge = () => {
    const edges: Edge[] = ["bottom", "top", "left", "right"];
    return edges[Math.floor(Math.random() * edges.length)];
  };

  const handleYoruClick = () => {
    if (catPeeking) return;
    setCatPosition(getRandomEdge());
    setCatPeeking(true);
    setTimeout(() => setCatPeeking(false), 2000);
  };

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
    <>
      {/* CARD */}
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-zinc-900/80 shadow-2xl border border-zinc-800 px-7 md:px-10 py-7 md:py-5 w-full backdrop-blur-md h-full flex flex-col relative z-20">
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

              <div
                onClick={handleYoruClick}
                className="cursor-pointer text-zinc-400 hover:text-white p-2 text-xs font-bold"
              >
                猫
              </div>
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
              Hello, I’m Somil! a 22 year old developer based in India.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-2 text-xs text-zinc-400 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          Available for work
          <span className="ml-auto font-mono">{formattedTime}</span>
        </div>
      </div>

      {/* ✧ PAW TRAIL (Changed to Sparkles) */}
      {paws.map((paw) => (
        <motion.div
          key={paw.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8 }}
          className="fixed text-white text-xs pointer-events-none z-40"
          style={{ left: paw.x, top: paw.y }}
        >
          ✧
        </motion.div>
      ))}

      {/* 🐱 CAT */}
      <AnimatePresence>
        {catPeeking && (
          <motion.div
            initial={{
              x:
                catPosition === "left"
                  ? "-100%"
                  : catPosition === "right"
                  ? "100%"
                  : 0,
              y:
                catPosition === "top"
                  ? "-100%"
                  : catPosition === "bottom"
                  ? "100%"
                  : 0,
            }}
            animate={{
              x: cursor.x * 0.02, // 👈 follows cursor slightly
              y: cursor.y * 0.02,
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className={`fixed z-50 pointer-events-none ${
              catPosition === "bottom"
                ? "bottom-0 left-1/2 -translate-x-1/2"
                : catPosition === "top"
                ? "top-0 left-1/2 -translate-x-1/2"
                : catPosition === "left"
                ? "left-0 top-1/2 -translate-y-1/2"
                : "right-0 top-1/2 -translate-y-1/2"
            }`}
          >
            <div className="flex flex-col items-center relative">

              {/* BAYMAX HEAD */}
              <div className="bg-white rounded-[40px] w-32 h-20 shadow-2xl relative flex items-center justify-center border-2 border-zinc-200/50">
                {/* EYES & CONNECTING LINE */}
                <div className="flex items-center relative">
                  {/* Left Eye */}
                  <div className="w-5 h-5 bg-black rounded-full z-10"></div>
                  {/* Connecting Line */}
                  <div className="w-8 h-[2px] bg-black"></div>
                  {/* Right Eye */}
                  <div className="w-5 h-5 bg-black rounded-full z-10"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}