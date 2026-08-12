"use client";

import React from "react";
import { usePathname } from "next/navigation";

const routeConfig: Record<string, { section: string; color: string }> = {
  "/projects": { section: "projects", color: "text-blue-400" },
  "/achievements": { section: "achievements", color: "text-yellow-400" },
  "/experience": { section: "experience", color: "text-green-400" },
  "/blog": { section: "blog", color: "text-purple-400" },
};

const Footer = () => {
  const pathname = usePathname();
  const route = routeConfig[pathname] || { section: "portfolio", color: "text-purple-400" };

  return (
    <footer className="w-full py-3 px-4 border-t border-zinc-800/50 bg-black/80 backdrop-blur-sm text-zinc-500 text-[11px] font-mono">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left - CLI Style */}
        <div className="flex items-center gap-2">
          <span className="text-green-500">❯</span>
          <span className="text-zinc-400">somil</span>
          <span className="text-zinc-600">•</span>
          <span className={route.color}>{route.section}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-500">main</span>
        </div>

        {/* Center - Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-zinc-500">online</span>
          </div>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-600">© {new Date().getFullYear()}</span>
        </div>

        {/* Right - Links */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com/Somilg11" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-500 hover:text-white transition-colors duration-200"
          >
            gh
          </a>
          <a 
            href="https://www.linkedin.com/in/somil-1101s/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-500 hover:text-[#0A66C2] transition-colors duration-200"
          >
            in
          </a>
          <a 
            href="mailto:gsomil93@gmail.com" 
            className="text-zinc-500 hover:text-[#EA4335] transition-colors duration-200"
          >
            mail
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
