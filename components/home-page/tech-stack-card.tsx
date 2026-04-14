"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiFastapi, 
  SiNpm, SiCloudflare, SiDocker, SiPostman, SiPostgresql, SiPrisma, 
  SiMongodb, SiRedis, SiCplusplus, SiPython, SiGo 
} from "react-icons/si";
import { SiShadcnui } from "react-icons/si";
import { VscTerminal } from "react-icons/vsc";

export default function TechStackCard() {
  const getIcon = (text: string) => {
    switch(text) {
      case "React": return <SiReact size={14} className="text-sky-400" />;
      case "Nextjs": return <SiNextdotjs size={14} className="text-white" />;
      case "Shadcn": return <SiShadcnui size={14}className="text-white" />;
      case "Tailwindcss": return <SiTailwindcss size={14} className="text-teal-400" />;
      case "Nodejs": return <SiNodedotjs size={14} className="text-green-500" />;
      case "Express": return <SiExpress size={14} className="text-white" />;
      case "FastAPI": return <SiFastapi size={14} className="text-teal-500" />;
      case "NPM": return <SiNpm size={14} className="text-red-500" />;
      case "Cloudflare Workers": return <SiCloudflare size={14} className="text-orange-400" />;
      case "Docker": return <SiDocker size={14} className="text-blue-500" />;
      case "Postman": return <SiPostman size={14} className="text-orange-500" />;
      case "Postgres": return <SiPostgresql size={14} className="text-blue-400" />;
      case "Prisma ORM": return <SiPrisma size={14} className="text-white" />;
      case "MongoDB": return <SiMongodb size={14} className="text-green-500" />;
      case "Redis": return <SiRedis size={14} className="text-red-600" />;
      case "C++": return <SiCplusplus size={14} className="text-blue-600" />;
      case "Python": return <SiPython size={14} className="text-yellow-400" />;
      case "GO": return <SiGo size={14} className="text-cyan-500" />;
      default: return <VscTerminal size={14} className="text-zinc-400" />;
    }
  };

  const getBadgeVariants = (text: string) => {
    const rotation = text.length % 2 === 0 ? 3 : -3;
    return {
      hover: {
        scale: 1.15,
        rotate: rotation,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      },
      tap: {
        scale: 0.9,
      },
    };
  };

  const renderBadge = (text: string) => (
    <motion.div
      key={text}
      variants={getBadgeVariants(text)}
      whileHover="hover"
      whileTap="tap"
      className="border border-dashed border-zinc-700 bg-zinc-950/50 text-zinc-200 px-3 py-1.5 rounded-xl text-sm font-medium cursor-pointer shadow-sm backdrop-blur-sm flex items-center justify-center gap-2 select-none"
    >
      <span>{getIcon(text)}</span>
      <span>{text}</span>
    </motion.div>
  );

  return (
    <div className="rounded-2xl bg-black shadow-xl border border-zinc-800 px-6 py-6 h-full">
      <div className="text-3xl md:text-4xl font-serif text-zinc-100 mb-6 tracking-tight">
        Skills <span className="text-zinc-600">#</span>
      </div>
      <div className="mb-6">
        <div className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Frontend</div>
        <div className="flex flex-wrap gap-2.5">
          {[
            "React",
            "Nextjs",
            "Shadcn",
            "Tailwindcss",
            "Zustand",
            "Tanstack Query",
          ].map(renderBadge)}
        </div>
      </div>
      <div className="mb-6">
        <div className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Backend</div>
        <div className="flex flex-wrap gap-2.5">
          {["Nodejs", "Express", "FastAPI", "NPM"].map(renderBadge)}
        </div>
      </div>
      <div className="mb-6">
        <div className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">DB & Services</div>
        <div className="flex flex-wrap gap-2.5">
          {[
            "Cloudflare Workers",
            "Docker",
            "Postman",
            "Postgres",
            "Prisma ORM",
            "MongoDB",
            "Redis",
          ].map(renderBadge)}
        </div>
      </div>
      <div className="mb-2">
        <div className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Others</div>
        <div className="flex flex-wrap gap-2.5">
          {["C++", "Python", "GO"].map(renderBadge)}
        </div>
      </div>
    </div>
  );
}
