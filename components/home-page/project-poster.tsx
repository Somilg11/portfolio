"use client";

import Link from "next/link";
import React from "react";

export default function ProjectPoster() {
  return (
    <Link
      href="/projects"
      className="relative rounded-2xl bg-black shadow-xl border border-zinc-800 px-6 py-8 w-full text-left hover:scale-[1.01] transition-transform block overflow-hidden"
    >
      {/* concentric circles */}
      <div className="absolute right-[-30px] top-8 opacity-50">
        <div className="w-72 h-72 rounded-full bg-white/20" />
      </div>
      <div className="absolute right-[-10px] top-16 opacity-50">
        <div className="w-56 h-56 rounded-full bg-white/20" />
      </div>

      <div className="relative z-[1] text-purple-100/90 font-extrabold text-3xl leading-tight tracking-tight">
        PROJECT
        <br /> SSS
      </div>
      <div className="absolute right-3 bottom-3 text-purple-100/80 text-sm" style={{ writingMode: "vertical-rl" }}>工芸</div>
    </Link>
  );
}
