"use client";

import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

// 🎨 React Icons Imports
import { SiSpotify, SiGithub, SiDiscord, SiNotion, SiOpenai } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { RiVimeoFill } from "react-icons/ri"; // using as V0 placeholder

type RailItem = {
  label: string;
  icon: React.ReactNode;
  link: string;
  hoverColor?: string; // tailwind hover color class
};

const rail: RailItem[] = [
  {
    label: "VS Code",
    icon: <VscVscode size={22} />,
    link: "https://code.visualstudio.com/",
    hoverColor: "hover:text-sky-400",
  },
  {
    label: "Notion",
    icon: <SiNotion size={22} />,
    link: "https://www.notion.so/",
    hoverColor: "hover:text-white",
  },
  {
    label: "ChatGPT",
    icon: <SiOpenai size={22} />,
    link: "https://chat.openai.com/",
    hoverColor: "hover:text-emerald-400",
  },
  {
    label: "V0",
    icon: <RiVimeoFill size={22} />,
    link: "https://v0.dev/",
    hoverColor: "hover:text-violet-400",
  },
  {
    label: "Spotify",
    icon: <SiSpotify size={22} />,
    link: "https://spotify.com/",
    hoverColor: "hover:text-green-500",
  },
  {
    label: "GitHub",
    icon: <SiGithub size={22} />,
    link: "https://github.com/",
    hoverColor: "hover:text-gray-200",
  },
  {
    label: "Discord",
    icon: <SiDiscord size={22} />,
    link: "https://discord.com/",
    hoverColor: "hover:text-indigo-400",
  },
];

export default function ToolsBoard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-zinc-900/80 shadow-xl border border-zinc-800 px-5 py-6 md:px-7 md:py-8 backdrop-blur-md w-full h-full flex flex-col">
      <div className="flex gap-5 grow">
        {/* Left Tool Rail */}
        <div className="rounded-[28px] bg-zinc-950/70 border border-zinc-800 px-2 py-3 flex flex-col gap-3 w-[76px] min-w-[76px] items-center shadow-inner overflow-y-auto scrollbar-none">
          {rail.map((r, i) => (
            <a
              key={i}
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              title={r.label}
              className={`w-12 h-12 rounded-2xl bg-zinc-900/80 border border-zinc-700 flex items-center justify-center text-zinc-400 ${r.hoverColor ?? ""} hover:bg-zinc-800 transition-all duration-250`}
            >
              {r.icon}
            </a>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-hidden">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <div className="leading-[0.95]">
              <div className="text-4xl md:text-5xl font-extrabold text-zinc-100">DAILY</div>
              <div className="text-2xl md:text-3xl font-semibold text-zinc-200 mt-1">Tool</div>
              <div className="text-4xl md:text-5xl font-extrabold text-zinc-100 mt-1">
                STACK<span className="text-blue-400">.</span>
              </div>
            </div>

            {/* Blog wave link (fixed animation using SVG waves) */}
            <Link href="/blog" className="relative block">
              <div className="relative rounded-2xl h-16 md:h-20 border border-blue-700/50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 overflow-hidden shadow-inner cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                {/* Wave layer 1 */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <svg
                    className="absolute left-0 top-0 w-[200%] h-full wave-layer1"
                    viewBox="0 0 2880 320"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* first half */}
                    <path
                      d="M0,160 C240,200 480,120 720,144 C960,168 1200,248 1440,224 C1680,200 1920,120 2160,128 C2400,136 2640,200 2880,176 L2880 320 L0 320 Z"
                      fill="rgba(255,255,255,0.08)"
                    />
                    {/* second half (repeat) */}
                    <path
                      d="M0,160 C240,200 480,120 720,144 C960,168 1200,248 1440,224 C1680,200 1920,120 2160,128 C2400,136 2640,200 2880,176 L2880 320 L0 320 Z"
                      transform="translate(2880,0)"
                      fill="rgba(255,255,255,0.08)"
                    />
                  </svg>
                </div>

                {/* Wave layer 2 (slower, more subtle) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <svg
                    className="absolute left-0 top-0 w-[200%] h-full wave-layer2"
                    viewBox="0 0 2880 320"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0,180 C240,160 480,220 720,208 C960,196 1200,124 1440,136 C1680,148 1920,208 2160,200 C2400,192 2640,152 2880,160 L2880 320 L0 320 Z"
                      fill="rgba(255,255,255,0.05)"
                    />
                    <path
                      d="M0,180 C240,160 480,220 720,208 C960,196 1200,124 1440,136 C1680,148 1920,208 2160,200 C2400,192 2640,152 2880,160 L2880 320 L0 320 Z"
                      transform="translate(2880,0)"
                      fill="rgba(255,255,255,0.05)"
                    />
                  </svg>
                </div>

                {/* Center text */}
                <div className="relative flex items-center justify-center h-full">
                  <span className="text-white text-3xl font-semibold tracking-wide">ブログ</span>
                </div>
              </div>
            </Link>

            {/* Music Card */}
            <a
              href="https://open.spotify.com/track/6DCZcSspjsKoFjzjrWoCdn"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/70 shadow transition-transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="aspect-square bg-gradient-to-br from-red-700 via-red-600 to-red-800 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">DRAKE</span>
              </div>

              <div className="px-4 py-3">
                <div className="text-lg md:text-xl font-semibold text-zinc-100">God&apos;s Plan</div>
                <div className="text-xs text-zinc-400 mt-1 flex items-center justify-between">
                  <span>By: Drake</span>
                  <span>2018</span>
                </div>
              </div>
            </a>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Resume/CV Download Button */}
            <div
              className="flex items-center justify-center gap-2 bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-3 text-zinc-200 hover:text-white hover:bg-zinc-800/70 transition-all duration-300 shadow-md hover:shadow-zinc-800/40 cursor-pointer select-none"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/resume.pdf";
                link.download = "Somil_Resume.pdf";
                link.click();
              }}
            >
              <FileText size={18} />
              <span className="font-extrabold">_RESUME.</span>
            </div>

            {/* Excellence Tabs - Like LINKS style */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow">
              {/* Tab Header */}
              <div className="px-4 py-3 border-b border-zinc-800">
                {/* <div className="text-lg md:text-xl font-semibold text-zinc-100 mb-2">Excellence</div> */}
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/experience" className="block">
                    <div className="p-2 md:p-3 rounded-xl bg-zinc-900/50 border border-zinc-700 hover:bg-zinc-800/70 transition-colors cursor-pointer overflow-hidden">
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-lg font-extrabold leading-none tracking-tighter text-zinc-100">
                        <div>EXPER</div>
                        <div>IENCE.</div>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/achievements" className="block">
                    <div className="p-2 md:p-3 rounded-xl bg-zinc-900/50 border border-zinc-700 hover:bg-zinc-800/70 transition-colors cursor-pointer overflow-hidden">
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-lg font-extrabold leading-none tracking-tighter text-zinc-100">
                        <div>ACHIEV</div>
                        <div>EMENT.</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* Footer */}
              <div className="px-4 py-2 text-[11px] text-zinc-400">
                from <span className="lowercase">excellences</span>: <span className="font-mono">2023 onwards</span>
              </div>
            </div>

            {/* Quote */}
            <div className="px-2">
              <div className="text-zinc-100 text-lg md:text-xl font-semibold tracking-wide">“Into the Unknown”</div>
            </div>

            {/* Image card */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800/60 shadow">
              <div className="aspect-square bg-zinc-900">
                <img src="/anime.jpg" alt="Card Image" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* CP Tab for Competitive Programming */}
            <div className="mt-2">
              <a
                href="https://codolio.com/profile/strangecodes"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3 justify-center shadow hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                <img
                  src="/myprofileimage2.png"
                  alt="SG"
                  className="w-8 h-8 rounded-full border border-zinc-700 object-cover"
                />
                <span className="text-2xl md:text-3xl font-extrabold leading-none tracking-tighter text-zinc-100">CP</span>
                <span className="text-xs md:text-sm text-zinc-400 font-semibold">Codolio Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Wave animations styles */}
      <style jsx>{`
        /* Wave 1 - faster */
        .wave-layer1 {
          transform: translateX(0);
          animation: wave-1 8s linear infinite;
        }
        @keyframes wave-1 {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Wave 2 - slower, subtle */
        .wave-layer2 {
          transform: translateX(0);
          animation: wave-2 16s linear infinite;
        }
        @keyframes wave-2 {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* optional: hide scrollbar helper if you have custom scrollbar css missing */
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
