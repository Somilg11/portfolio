"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiFastapi, 
  SiNpm, SiCloudflare, SiDocker, SiPostgresql, SiPrisma, 
  SiMongodb, SiRedis, SiCplusplus, SiPython, SiGo, SiJavascript,
  SiTypescript, SiStreamlit, SiShadcnui, SiVercel, SiFigma
} from "react-icons/si";
import { FaAws as SiAmazonaws } from "react-icons/fa";
import { VscTerminal } from "react-icons/vsc";
import { SiMajorleaguehacking, SiJsonwebtokens, SiGooglegemini, SiSocketdotio } from "react-icons/si";
import { GiCircularSaw } from "react-icons/gi";

const iconMap: Record<string, React.ReactNode> = {
  "React": <SiReact size={18} className="text-sky-400" />,
  "Next.js": <SiNextdotjs size={18} className="text-white" />,
  "Nextjs": <SiNextdotjs size={18} className="text-white" />,
  "Tailwind CSS": <SiTailwindcss size={18} className="text-teal-400" />,
  "Tailwindcss": <SiTailwindcss size={18} className="text-teal-400" />,
  "Node.js": <SiNodedotjs size={18} className="text-green-500" />,
  "Nodejs": <SiNodedotjs size={18} className="text-green-500" />,
  "Express": <SiExpress size={18} className="text-white" />,
  "FastAPI": <SiFastapi size={18} className="text-teal-500" />,
  "NPM": <SiNpm size={18} className="text-red-500" />,
  "Cloudflare": <SiCloudflare size={18} className="text-orange-400" />,
  "Docker": <SiDocker size={18} className="text-blue-500" />,
  "Postgres": <SiPostgresql size={18} className="text-blue-400" />,
  "PostgreSQL": <SiPostgresql size={18} className="text-blue-400" />,
  "Prisma": <SiPrisma size={18} className="text-white" />,
  "MongoDB": <SiMongodb size={18} className="text-green-500" />,
  "Redis": <SiRedis size={18} className="text-red-600" />,
  "C++": <SiCplusplus size={18} className="text-blue-600" />,
  "Python": <SiPython size={18} className="text-yellow-400" />,
  "GO": <SiGo size={18} className="text-cyan-500" />,
  "JavaScript": <SiJavascript size={18} className="text-yellow-400" />,
  "TypeScript": <SiTypescript size={18} className="text-blue-500" />,
  "AWS": <SiAmazonaws size={18} className="text-orange-400" />,
  "Streamlit": <SiStreamlit size={18} className="text-red-500" />,
  "Shadcn": <SiShadcnui size={18} className="text-white" />,
  "Vercel": <SiVercel size={18} className="text-white" />,
  "Figma": <SiFigma size={18} className="text-pink-400" />,
  "Hackathon": <SiMajorleaguehacking size={18} className="text-pink-400" />,
  "JWT": <SiJsonwebtokens size={18} className="text-white" />,
  "Convex": <GiCircularSaw size={18} className="text-orange-400" />,
  "Gemini": <SiGooglegemini size={18} className="text-blue-400" />,
  "Socket": <SiSocketdotio size={18} className="text-white" />,
};

export const TechBadge = ({ tech, showName }: { tech: string; showName?: boolean }) => {
  const icon = iconMap[tech] || <VscTerminal size={18} className="text-zinc-400" />;
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.1, 
        rotate: tech.length % 2 === 0 ? 5 : -5,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      className={
        showName 
          ? "border border-dashed border-zinc-700 bg-zinc-950/50 text-zinc-200 px-2.5 py-1.5 rounded-xl text-[11px] font-medium shadow-sm backdrop-blur-sm flex items-center justify-center gap-1.5 select-none"
          : "w-10 h-10 flex items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 transition-colors cursor-help"
      }
      title={tech}
    >
      {icon}
      {showName && <span>{tech}</span>}
    </motion.div>
  );
};
