/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";
import { FileText, Monitor } from "lucide-react";

// 🎨 React Icons Imports
import { SiSpotify, SiGithub, SiDiscord, SiNotion } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { SiClaudecode } from "react-icons/si";
import { SiOpencode } from "react-icons/si";

type RailItem = {
  label: string;
  icon: React.ReactNode;
  link: string;
  hoverColor?: string;
};

const rail: RailItem[] = [
  { label: "VS Code", icon: <VscVscode size={22} />, link: "https://code.visualstudio.com/", hoverColor: "hover:text-sky-400" },
  { label: "Notion", icon: <SiNotion size={22} />, link: "https://www.notion.so/", hoverColor: "hover:text-white" },
  { label: "Opencode", icon: <SiOpencode size={22} />, link: "https://www.opencode.ai", hoverColor: "hover:text-emerald-400" },
  { label: "Claude", icon: <SiClaudecode size={22} />, link: "https://claude.ai", hoverColor: "hover:text-orange-400" },
  { label: "Spotify", icon: <SiSpotify size={22} />, link: "https://spotify.com/", hoverColor: "hover:text-green-500" },
  { label: "GitHub", icon: <SiGithub size={22} />, link: "https://github.com/", hoverColor: "hover:text-gray-200" },
  { label: "Discord", icon: <SiDiscord size={22} />, link: "https://discord.com/", hoverColor: "hover:text-indigo-400" },
];

export default function ToolsBoard() {
  return (
    <div className="rounded-2xl bg-black shadow-xl border border-zinc-800 px-4 py-4 md:px-5 md:py-5 w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 grow overflow-hidden">
        {/* Left Tool Rail - Horizontal on mobile, vertical on desktop */}
        <div className="rounded-[20px] bg-zinc-950/70 border border-zinc-800 px-2 py-2 md:py-3 flex flex-row md:flex-col gap-2 w-full md:w-[60px] md:min-w-[60px] items-center shadow-inner overflow-x-auto md:overflow-y-auto md:overflow-x-hidden scrollbar-none">
          {rail.map((r, i) => (
            <a
              key={i}
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              title={r.label}
              className={`w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-zinc-400 ${r.hoverColor ?? ""} hover:bg-zinc-800 transition-all duration-250 shrink-0`}
            >
              {r.icon}
            </a>
          ))}
        </div>

        {/* Main Content (Scrollable Container) */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-none pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* --- LEFT COLUMN --- */}
            <div className="flex flex-col gap-3">
              {/* Daily Tool Stack */}
              <div className="leading-[0.95]">
                <div className="text-3xl font-extrabold text-zinc-100">DAILY</div>
                <div className="text-xl font-semibold text-zinc-200 mt-0.5">Tool</div>
                <div className="text-3xl font-extrabold text-zinc-100 mt-0.5">
                  STACK<span className="text-blue-400">.</span>
                </div>
              </div>

              {/* Blog Wave Link */}
              <Link href="/blog" className="relative block">
                <div className="relative rounded-xl h-12 border border-blue-700/50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 overflow-hidden shadow-inner cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg className="absolute left-0 top-0 w-[200%] h-full wave-layer1" viewBox="0 0 2880 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0,160 C240,200 480,120 720,144 C960,168 1200,248 1440,224 C1680,200 1920,120 2160,128 C2400,136 2640,200 2880,176 L2880 320 L0 320 Z" fill="rgba(255,255,255,0.08)" />
                      <path d="M0,160 C240,200 480,120 720,144 C960,168 1200,248 1440,224 C1680,200 1920,120 2160,128 C2400,136 2640,200 2880,176 L2880 320 L0 320 Z" transform="translate(2880,0)" fill="rgba(255,255,255,0.08)" />
                    </svg>
                  </div>
                  <div className="relative flex items-center justify-center h-full">
                    <span className="text-white text-xl font-semibold tracking-wide">ブログ</span>
                  </div>
                </div>
              </Link>

              {/* Music Button - Vinyl Player */}
              <a
                href="https://open.spotify.com/track/6DCZcSspjsKoFjzjrWoCdn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-2xl h-[100px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative overflow-hidden group"
                style={{ background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)", boxShadow: "0 4px 15px rgba(0,0,0,0.4)" }}
              >
                {/* Decorative circles following disk direction */}
                <div className="absolute -left-16 -bottom-16 opacity-30">
                  <div className="w-40 h-40 rounded-full border border-zinc-600" />
                </div>
                <div className="absolute -left-8 -bottom-8 opacity-20">
                  <div className="w-24 h-24 rounded-full border border-zinc-600" />
                </div>
                {/* Vinyl disc - metallic */}
                <div className="absolute -left-12 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%, #444, #111 40%, #1a1a1a 60%, #222 80%, #111 100%)", boxShadow: "inset 0 0 30px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.1)" }}>
                  {/* Grooves - realistic */}
                  <div className="absolute inset-0 rounded-full" style={{ background: "repeating-radial-gradient(circle at center, transparent 0px, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)" }} />
                  {/* Light reflection */}
                  <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)" }} />
                  {/* Label */}
                  <div className="absolute inset-12 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800" style={{ boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)" }}>
                    <div className="absolute inset-0 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-zinc-950" />
                    </div>
                  </div>
                  {/* Edge highlight */}
                  <div className="absolute inset-0 rounded-full border border-zinc-500/20" />
                </div>
                {/* Equalizer bars */}
                <div className="absolute right-3 bottom-3 flex items-end gap-[2px] opacity-40">
                  <div className="w-1 bg-purple-500 rounded-t" style={{ height: "8px", animation: "bounce 0.5s ease-in-out infinite alternate" }} />
                  <div className="w-1 bg-purple-400 rounded-t" style={{ height: "12px", animation: "bounce 0.7s ease-in-out infinite alternate" }} />
                  <div className="w-1 bg-purple-500 rounded-t" style={{ height: "6px", animation: "bounce 0.4s ease-in-out infinite alternate" }} />
                  <div className="w-1 bg-purple-400 rounded-t" style={{ height: "14px", animation: "bounce 0.6s ease-in-out infinite alternate" }} />
                  <div className="w-1 bg-purple-500 rounded-t" style={{ height: "10px", animation: "bounce 0.5s ease-in-out infinite alternate" }} />
                </div>
              </a>

              {/* Compact System Specs (Now flex-1 to fill vertical space) */}
              <Link href="/" className="relative rounded-xl overflow-hidden group flex-1 shadow flex flex-col min-h-[90px] cursor-pointer">
                {/* Inner Card - Black Metal */}
                <div className="relative flex flex-col p-2.5 rounded-xl h-full justify-between z-10" style={{ background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%)" }}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 group-hover:text-white transition-colors duration-300">
                      <Monitor size={14} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-extrabold text-zinc-100">SYSTEM<span className="text-blue-400">.</span></div>
                      <div className="text-[10px] text-zinc-400">Gear & Specs</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-zinc-950/50 text-zinc-300 border border-zinc-700/50">M3 (8-512)</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-zinc-950/50 text-zinc-300 border border-zinc-700/50">Snapdragon Gen 7s</span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-zinc-950/50 text-zinc-300 border border-zinc-700/50">Dimensity 7000</span>
                  </div>
                </div>
              </Link>

              {/* Compact CP Tab */}
              <a
                href="https://codolio.com/profile/strangecodes"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2 justify-center shadow hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                <img src="/myprofileimage2.png" alt="SG" className="w-5 h-5 rounded-full border border-zinc-700 object-cover" />
                <span className="text-lg font-extrabold leading-none tracking-tighter text-zinc-100">CP</span>
                <span className="text-[10px] text-zinc-400 font-semibold">Codolio Profile</span>
              </a>
            </div>

            {/* --- RIGHT COLUMN --- */}
            <div className="flex flex-col gap-3">
              {/* Compact Resume Button */}
              <div
                className="flex items-center justify-center gap-1.5 bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 rounded-xl p-2.5 text-zinc-200 hover:text-white hover:bg-zinc-800/70 transition-all duration-300 shadow cursor-pointer select-none"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "Somil_Resume.pdf";
                  link.click();
                }}
              >
                <FileText size={14} />
                <span className="font-extrabold text-xs">_RESUME.</span>
              </div>

              {/* Excellence Tabs */}
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black shadow">
                <div className="p-2 border-b border-zinc-800">
                  <div className="grid grid-cols-2 gap-1.5">
                    <Link href="/experience" className="block relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 opacity-40">
                        <div className="w-16 h-16 rounded-full border-2 border-zinc-500" />
                      </div>
                      <div className="absolute -right-2 -bottom-2 opacity-30">
                        <div className="w-10 h-10 rounded-full border-2 border-zinc-500" />
                      </div>
                      <div className="p-1.5 rounded-lg bg-zinc-900/50 border border-zinc-700 hover:bg-zinc-800/70 transition-colors text-center relative z-10">
                        <div className="text-xs sm:text-sm font-extrabold leading-tight text-zinc-100 tracking-tight">EXPER<br/>IENCE.</div>
                      </div>
                    </Link>
                    <Link href="/achievements" className="block relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 opacity-40">
                        <div className="w-16 h-16 rounded-full border-2 border-zinc-500" />
                      </div>
                      <div className="absolute -right-2 -bottom-2 opacity-30">
                        <div className="w-10 h-10 rounded-full border-2 border-zinc-500" />
                      </div>
                      <div className="p-1.5 rounded-lg bg-zinc-900/50 border border-zinc-700 hover:bg-zinc-800/70 transition-colors text-center relative z-10">
                        <div className="text-xs sm:text-sm font-extrabold leading-tight text-zinc-100 tracking-tight">ACHIEV<br/>EMENT.</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="px-2 py-1 text-[9px] text-zinc-500">
                  from excellences: <span className="font-mono">2023 onwards</span>
                </div>
              </div>

              {/* Quote */}
              <div className="px-1 text-center">
                <div className="text-zinc-300 text-sm font-medium italic tracking-wide">“Into the Unknown”</div>
              </div>

              {/* Image card */}
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-800/60 shadow flex-1 min-h-[100px]">
                <img src="/anime.jpg" alt="Card Image" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* --- BOTTOM ROW: GITHUB GRAPH (Constrained Width & Height) --- */}
          <div className="mt-3 rounded-xl bg-[#161b22] border border-zinc-800/50 p-2.5 shadow text-zinc-300">
            <div className="w-full flex justify-center">
              <img
                src="https://ghchart.rshah.org/39d353/Somilg11"
                alt="GitHub Contributions"
                className="w-full h-auto max-h-[85px] object-contain opacity-90 pointer-events-none"
              />
            </div>
            
            <div className="flex items-center justify-between text-[9px] mt-1.5 text-[#adbac7] px-1">
              <span>779 contributions in the last year</span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                <div className="w-2 h-2 rounded-[1px] bg-[#161b22] border border-zinc-700/50"></div>
                <div className="w-2 h-2 rounded-[1px] bg-[#0e4429]"></div>
                <div className="w-2 h-2 rounded-[1px] bg-[#006d32]"></div>
                <div className="w-2 h-2 rounded-[1px] bg-[#26a641]"></div>
                <div className="w-2 h-2 rounded-[1px] bg-[#39d353]"></div>
                <span>More</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .wave-layer1 {
          transform: translateX(0);
          animation: wave-1 8s linear infinite;
        }
        @keyframes wave-1 {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}