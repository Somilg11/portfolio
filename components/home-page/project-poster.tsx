"use client";

import Link from "next/link";
import React from "react";

export default function ProjectPoster() {
  return (
    <Link
      href="/projects"
      className="relative rounded-2xl bg-purple-600/95 shadow-xl border border-purple-700 px-6 py-8 w-full text-left hover:scale-[1.01] transition-transform block overflow-hidden"
    >
      {/* decorative icon top-left */}
      {/* <div className="absolute left-5 top-5 text-purple-100/80" aria-hidden>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1v2" /><path d="M12 21v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /><circle cx="12" cy="12" r="4" />
        </svg>
      </div> */}
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
