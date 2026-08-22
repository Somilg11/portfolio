"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Code, Rocket, Trophy } from "lucide-react";
import { achievementsData, type Achievement } from "@/data/achievements";
import { AppIcon } from "@/components/mac/app-icon";
import { TechBadge } from "@/components/tech-badge";

const glyphs: Record<Achievement["glyph"], React.ReactNode> = {
  trophy: <Trophy size={16} />,
  award: <Award size={16} />,
  code: <Code size={16} />,
  rocket: <Rocket size={16} />,
};

export function AchievementsApp() {
  return (
    <div className="grid grid-cols-1 gap-3 p-4 sm:p-5 lg:grid-cols-2">
      {achievementsData.map((item, i) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="rounded-mac border border-border bg-background/40 p-3.5 transition-colors duration-200 hover:bg-foreground/[0.03]"
        >
          <header className="flex items-start gap-3">
            <AppIcon tone={item.tone} size="md">
              {glyphs[item.glyph]}
            </AppIcon>

            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold leading-tight tracking-tight">{item.title}</h2>
              <p className="text-[11.5px] text-muted-foreground">{item.subtitle}</p>
            </div>

            <span className="mac-pill shrink-0">
              <Calendar size={11} /> {item.year}
            </span>
          </header>

          <div className="mt-3.5 flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <TechBadge key={tech} tech={tech} showName />
            ))}
          </div>

          <ul className="mt-3.5 space-y-2.5">
            {item.description.map((line, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                <p className="text-[13px] leading-relaxed text-foreground/85">{line}</p>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
