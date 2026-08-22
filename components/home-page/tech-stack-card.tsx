"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiFastapi,
  SiNpm, SiCloudflare, SiDocker, SiPostman, SiPostgresql, SiPrisma,
  SiMongodb, SiRedis, SiCplusplus, SiPython, SiGo, SiRust, SiNestjs,
  SiShadcnui, SiTanstack,
} from "react-icons/si";
import { VscTerminal } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { MacWindow } from "@/components/mac/window";

const icons: Record<string, React.ReactNode> = {
  React: <SiReact className="text-sky-500" />,
  Nextjs: <SiNextdotjs className="text-foreground" />,
  Shadcn: <SiShadcnui className="text-foreground" />,
  Tanstack: <SiTanstack className="text-rose-500" />,
  Tailwindcss: <SiTailwindcss className="text-teal-500" />,
  Nestjs: <SiNestjs className="text-rose-500" />,
  Nodejs: <SiNodedotjs className="text-green-600" />,
  Express: <SiExpress className="text-foreground" />,
  FastAPI: <SiFastapi className="text-teal-600" />,
  NPM: <SiNpm className="text-red-500" />,
  "Cloudflare Workers": <SiCloudflare className="text-orange-500" />,
  Docker: <SiDocker className="text-blue-500" />,
  Postman: <SiPostman className="text-orange-500" />,
  Postgres: <SiPostgresql className="text-blue-500" />,
  "Prisma ORM": <SiPrisma className="text-foreground" />,
  MongoDB: <SiMongodb className="text-green-600" />,
  Redis: <SiRedis className="text-red-600" />,
  "C++": <SiCplusplus className="text-blue-600" />,
  Python: <SiPython className="text-yellow-500" />,
  GO: <SiGo className="text-cyan-500" />,
  Rust: <SiRust className="text-orange-600" />,
};

const groups: { id: string; label: string; items: string[] }[] = [
  { id: "frontend", label: "Frontend", items: ["React", "Nextjs", "Shadcn", "Tailwindcss", "Tanstack"] },
  { id: "backend", label: "Backend", items: ["Nestjs", "Nodejs", "Express", "FastAPI", "NPM"] },
  { id: "data", label: "Data & Infra", items: ["Cloudflare Workers", "Docker", "Postman", "Postgres", "Prisma ORM", "MongoDB", "Redis"] },
  { id: "languages", label: "Languages", items: ["C++", "Python", "GO", "Rust"] },
];

export default function TechStackCard() {
  const [active, setActive] = useState<string>("all");

  const visible = active === "all" ? groups : groups.filter((g) => g.id === active);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <MacWindow
      title="Skills"
      className="h-full"
      bodyClassName="p-0"
      delay={0.1}
      toolbar={<span className="text-[11px] text-muted-foreground">{total}</span>}
    >
      <div className="flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row">
        {/* Finder-style source list — becomes a scrollable chip row on mobile */}
        <aside className="mac-sidebar shrink-0 border-b border-border/70 p-1.5 sm:w-[112px] sm:border-b-0 sm:border-r">
          <div className="flex gap-1 overflow-x-auto scrollbar-none sm:flex-col sm:overflow-visible">
            {[{ id: "all", label: "All" }, ...groups].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                data-sound="click"
                className={cn(
                  "mac-row whitespace-nowrap text-left",
                  active === g.id && "mac-row-active"
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="min-h-0 min-w-0 flex-1 space-y-3.5 overflow-y-auto p-3 scrollbar-none">
          {visible.map((group) => (
            <section key={group.id}>
              <h3 className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                    data-sound="tick"
                    className="flex select-none items-center gap-1.5 rounded-full border border-border bg-background/50 px-2 py-[3px] text-[11.5px] font-medium"
                  >
                    <span className="text-[12px]">{icons[item] ?? <VscTerminal className="text-muted-foreground" />}</span>
                    {item}
                  </motion.span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </MacWindow>
  );
}
