"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiFastapi, 
  SiNpm, SiCloudflare, SiDocker, SiPostman, SiPostgresql, SiPrisma, 
  SiMongodb, SiRedis, SiCplusplus, SiPython, SiGo, SiJavascript,
  SiTypescript, SiStreamlit, SiShadcnui, SiVercel, SiFigma
} from "react-icons/si";
import { FaAws as SiAmazonaws } from "react-icons/fa";
import { VscTerminal } from "react-icons/vsc";

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
};

export const TechBadge = ({ tech }: { tech: string }) => {
  const icon = iconMap[tech] || <VscTerminal size={18} className="text-zinc-400" />;
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.1, 
        rotate: tech.length % 2 === 0 ? 5 : -5,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 flex items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 transition-colors cursor-help"
      title={tech}
    >
      {icon}
    </motion.div>
  );
};
