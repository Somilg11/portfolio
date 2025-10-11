"use client";

import React from "react";

export default function TechStackCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-zinc-900/80 shadow-xl border border-zinc-800 px-6 py-6 backdrop-blur-md">
      <div className="text-3xl md:text-4xl font-extrabold text-zinc-100 mb-4 tracking-tight">{`{ }`} TECH STACK</div>
      <div className="mb-4">
        <div className="text-lg font-semibold text-zinc-100 mb-2">Frontend:</div>
        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "Nextjs",
            "Shadcn",
            "Tailwindcss",
            "Zustand",
            "Tanstack Query",
          ].map((t) => (
            <span key={t} className="bg-zinc-800/80 text-zinc-100 px-3 py-1 rounded-lg text-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-semibold text-zinc-100 mb-2">Backend:</div>
        <div className="flex flex-wrap gap-2">
          {["Nodejs", "Express", "FastAPI", "NPM"].map((t) => (
            <span key={t} className="bg-zinc-800/80 text-zinc-100 px-3 py-1 rounded-lg text-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-semibold text-zinc-100 mb-2">DB & Services:</div>
        <div className="flex flex-wrap gap-2">
          {[
            "Cloudflare Workers",
            "Docker",
            "Postman",
            "Postgres",
            "Prisma ORM",
            "MongoDB",
            "Redis",
          ].map((t) => (
            <span key={t} className="bg-zinc-800/80 text-zinc-100 px-3 py-1 rounded-lg text-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-semibold text-zinc-100 mb-2">Others:</div>
        <div className="flex flex-wrap gap-2">
          {["C++", "Python", "GO"].map((t) => (
            <span key={t} className="bg-zinc-800/80 text-zinc-100 px-3 py-1 rounded-lg text-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
