"use client";

import React from "react";
import Link from "next/link";
import { FileText, Monitor, Play } from "lucide-react";

// 🎨 React Icons Imports
import { SiSpotify, SiGithub, SiDiscord, SiNotion, SiOpenai } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { SiClaude } from "react-icons/si";

type RailItem = {
  label: string;
  icon: React.ReactNode;
  link: string;
  hoverColor?: string;
};

const rail: RailItem[] = [
  { label: "VS Code", icon: <VscVscode size={22} />, link: "https://code.visualstudio.com/", hoverColor: "hover:text-sky-400" },
  { label: "Notion", icon: <SiNotion size={22} />, link: "https://www.notion.so/", hoverColor: "hover:text-white" },
  { label: "ChatGPT", icon: <SiOpenai size={22} />, link: "https://chat.openai.com/", hoverColor: "hover:text-emerald-400" },
  { label: "Claude", icon: <SiClaude size={22} />, link: "https://claude.ai", hoverColor: "hover:text-orange-400" },
  { label: "Spotify", icon: <SiSpotify size={22} />, link: "https://spotify.com/", hoverColor: "hover:text-green-500" },
  { label: "GitHub", icon: <SiGithub size={22} />, link: "https://github.com/", hoverColor: "hover:text-gray-200" },
  { label: "Discord", icon: <SiDiscord size={22} />, link: "https://discord.com/", hoverColor: "hover:text-indigo-400" },
];

export default function ToolsBoard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-zinc-900/80 shadow-xl border border-zinc-800 px-4 py-4 md:px-5 md:py-5 backdrop-blur-md w-full h-full flex flex-col">
      <div className="flex gap-4 grow overflow-hidden">
        {/* Left Tool Rail */}
        <div className="rounded-[20px] bg-zinc-950/70 border border-zinc-800 px-2 py-3 flex flex-col gap-2 w-[60px] min-w-[60px] items-center shadow-inner overflow-y-auto scrollbar-none">
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

              {/* Compact Spotify Card */}
              <a
                href="https://open.spotify.com/track/6DCZcSspjsKoFjzjrWoCdn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex p-2.5 gap-2.5 rounded-xl border border-zinc-800/50 shadow-md bg-[#2d302c] relative overflow-hidden h-[100px] transition-all duration-300 hover:scale-[1.05] group cursor-pointer"
              >
                <SiSpotify size={14} className="absolute top-2.5 right-2.5 text-white/50 group-hover:text-[#1DB954] transition-colors" />
                
                <div className="relative shrink-0 w-[80px] h-[80px] rounded overflow-hidden shadow-md bg-zinc-800">
                  <img 
                    src="https://images.unsplash.com/photo-1566170272238-b6854199c126?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Cover" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Play size={20} fill="white" className="text-white ml-0.5" />
                  </div>
                </div>
                
                <div className="flex flex-col justify-center flex-1 min-w-0 pr-4">
                  {/* Track List */}
                  <div className="flex flex-col gap-[1px] text-[9px] text-zinc-300 mb-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 text-right opacity-70">1</span>
                      <span className="bg-white/20 text-[7px] font-bold px-[3px] rounded text-white">E</span>
                      <span className="truncate text-white font-medium group-hover:text-[#1DB954] transition-colors">God's Plan <span className="opacity-70 group-hover:text-[#1DB954]/70">· Drake</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 text-right opacity-70">2</span>
                      <span className="bg-white/20 text-[7px] font-bold px-[3px] rounded text-white">E</span>
                      <span className="truncate group-hover:text-white transition-colors">Nonstop <span className="opacity-70">· Drake</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 text-right opacity-70">3</span>
                      <span className="bg-white/20 text-[7px] font-bold px-[3px] rounded text-white">E</span>
                      <span className="truncate group-hover:text-white transition-colors">Elevate <span className="opacity-70">· Drake</span></span>
                    </div>
                  </div>

                  {/* Controls Row */}
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-semibold text-white truncate w-[100px]">Scorpion</div>
                      <button className="px-1.5 py-[1px] mt-0.5 bg-black/30 group-hover:bg-[#1DB954] rounded text-[8px] font-semibold text-white transition-colors duration-300">
                        Play on Spotify
                      </button>
                    </div>
                    <div className="w-5 h-5 bg-white group-hover:scale-110 group-hover:bg-[#1DB954] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-md ml-5">
                      <Play size={10} fill="currentColor" className="text-black ml-[1px]" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Compact System Specs (Now flex-1 to fill vertical space) */}
              <Link href="/" className="relative p-[1px] rounded-xl overflow-hidden group flex-1 shadow flex flex-col min-h-[90px] cursor-pointer">
                {/* Spinning Neon Electron Background */}
                <div className="absolute -inset-[100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Inner Card overlaying the border */}
                <div className="relative flex flex-col p-2.5 rounded-xl bg-[#1b1c1e] h-full justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 group-hover:text-white transition-colors duration-300">
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
                    <Link href="/experience" className="block">
                      <div className="p-1.5 rounded-lg bg-zinc-900/50 border border-zinc-700 hover:bg-zinc-800/70 transition-colors text-center">
                        <div className="text-xs sm:text-sm font-extrabold leading-tight text-zinc-100 tracking-tight">EXPER<br/>IENCE.</div>
                      </div>
                    </Link>
                    <Link href="/achievements" className="block">
                      <div className="p-1.5 rounded-lg bg-zinc-900/50 border border-zinc-700 hover:bg-zinc-800/70 transition-colors text-center">
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