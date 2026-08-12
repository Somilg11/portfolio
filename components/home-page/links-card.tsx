"use client";

import { Github, Linkedin } from "lucide-react";
import React from "react";
import { SiDiscord, SiGmail, SiX } from "react-icons/si";

type LinkBtnProps = {
  href: string;
  title: string;
  children: React.ReactNode;
};

export default function LinksCard() {
  const LinkBtn = ({ href, title, children }: LinkBtnProps) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 flex items-center justify-center text-zinc-200 hover:text-white hover:bg-zinc-800/70 transition-all duration-300 shadow-md hover:shadow-zinc-800/40 shrink-0 min-w-[56px] min-h-[56px]"
    >
      {children}
    </a>
  );

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-black border border-zinc-800 rounded-2xl p-4 md:p-6 shadow-xl">
        {/* Title */}
        <div className="text-4xl md:text-6xl font-extrabold leading-none tracking-tighter text-zinc-100 text-center md:text-left">
          <div className="md:hidden">LINKS.</div>
          <div className="hidden md:block">LIN</div>
          <div className="hidden md:block">KS.</div>
        </div>

        {/* Icons - single row on mobile, 2-col grid on desktop */}
        <div className="flex flex-row flex-wrap justify-center md:grid md:grid-cols-2 gap-3 md:gap-4">
          <LinkBtn href="https://github.com/Somilg11" title="GitHub">
            <Github size={26} />
          </LinkBtn>
          <LinkBtn href="https://x.com/somil_1101" title="X (Twitter)">
            <SiX size={22} />
          </LinkBtn>
          <LinkBtn href="mailto:gsomil93@gmail.com" title="Gmail">
            <SiGmail size={22} className="text-[#EA4335]" />
          </LinkBtn>
          <LinkBtn href="https://discord.com/kakashi_11_" title="Discord">
            <SiDiscord size={22} className="text-[#5865F2]" />
          </LinkBtn>
          <LinkBtn href="https://www.linkedin.com/in/somil-1101s/" title="LinkedIn">
            <Linkedin size={24} className="text-[#0A66C2]" />
          </LinkBtn>
        </div>
      </div>
    </div>
  );
}
