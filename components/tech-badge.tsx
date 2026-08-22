"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiFastapi, 
  SiNpm, SiCloudflare, SiDocker, SiPostgresql, SiPrisma, 
  SiMongodb, SiRedis, SiCplusplus, SiPython, SiGo, SiJavascript,
  SiTypescript, SiStreamlit, SiShadcnui, SiVercel, SiFigma, SiNestjs,
  SiOpencv, SiOnnx
} from "react-icons/si";
import { FaAws as SiAmazonaws } from "react-icons/fa";
import { VscTerminal } from "react-icons/vsc";
import { SiMajorleaguehacking, SiJsonwebtokens, SiGooglegemini, SiSocketdotio } from "react-icons/si";
import { GiCircularSaw } from "react-icons/gi";
import { FaFilm } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  "React": <SiReact size={18} className="text-sky-400" />,
  "Next.js": <SiNextdotjs size={18} className="text-foreground" />,
  "Nextjs": <SiNextdotjs size={18} className="text-foreground" />,
  "Tailwind CSS": <SiTailwindcss size={18} className="text-teal-400" />,
  "Tailwindcss": <SiTailwindcss size={18} className="text-teal-400" />,
  "Node.js": <SiNodedotjs size={18} className="text-green-500" />,
  "Nodejs": <SiNodedotjs size={18} className="text-green-500" />,
  "Express": <SiExpress size={18} className="text-foreground" />,
  "FastAPI": <SiFastapi size={18} className="text-teal-500" />,
  "NPM": <SiNpm size={18} className="text-red-500" />,
  "Cloudflare": <SiCloudflare size={18} className="text-orange-400" />,
  "Docker": <SiDocker size={18} className="text-blue-500" />,
  "Postgres": <SiPostgresql size={18} className="text-blue-400" />,
  "PostgreSQL": <SiPostgresql size={18} className="text-blue-400" />,
  "Prisma": <SiPrisma size={18} className="text-foreground" />,
  "MongoDB": <SiMongodb size={18} className="text-green-500" />,
  "Redis": <SiRedis size={18} className="text-red-600" />,
  "C++": <SiCplusplus size={18} className="text-blue-600" />,
  "Python": <SiPython size={18} className="text-yellow-400" />,
  "GO": <SiGo size={18} className="text-cyan-500" />,
  "JavaScript": <SiJavascript size={18} className="text-yellow-400" />,
  "TypeScript": <SiTypescript size={18} className="text-blue-500" />,
  "AWS": <SiAmazonaws size={18} className="text-orange-400" />,
  "Streamlit": <SiStreamlit size={18} className="text-red-500" />,
  "Shadcn": <SiShadcnui size={18} className="text-foreground" />,
  "Vercel": <SiVercel size={18} className="text-foreground" />,
  "Figma": <SiFigma size={18} className="text-pink-400" />,
  "Hackathon": <SiMajorleaguehacking size={18} className="text-pink-400" />,
  "JWT": <SiJsonwebtokens size={18} className="text-foreground" />,
  "Convex": <GiCircularSaw size={18} className="text-orange-400" />,
  "Gemini": <SiGooglegemini size={18} className="text-blue-400" />,
  "Socket": <SiSocketdotio size={18} className="text-foreground" />,
  "NestJS": <SiNestjs size={18} className="text-red-500" />,
  "ONNX": <SiOnnx size={18} className="text-red-500" />,
  "OpenCV": <SiOpencv size={18} className="text-green-600" />,
  "FFmpeg": <FaFilm size={18} className="text-green-500" />,
  "RBAC": <VscTerminal size={18} className="text-muted-foreground" />,
  "OCR": <VscTerminal size={18} className="text-muted-foreground" />,
  "REST APIs": <VscTerminal size={18} className="text-muted-foreground" />,
};

export const TechBadge = ({ tech, showName }: { tech: string; showName?: boolean }) => {
  const icon = iconMap[tech] || <VscTerminal size={18} className="text-muted-foreground" />;
  
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.06, transition: { type: "spring", stiffness: 420, damping: 18 } }}
      whileTap={{ scale: 0.95 }}
      data-sound="tick"
      className={
        showName
          ? "flex select-none items-center justify-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] font-medium shadow-mac-1"
          : "flex h-10 w-10 cursor-help items-center justify-center rounded-mac border border-border bg-background/60 shadow-mac-1 transition-colors"
      }
      title={tech}
    >
      {icon}
      {showName && <span>{tech}</span>}
    </motion.div>
  );
};
