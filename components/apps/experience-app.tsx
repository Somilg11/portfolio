"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { experienceData } from "@/data/experience";
import { TechBadge } from "@/components/tech-badge";
import { cn } from "@/lib/utils";

export function ExperienceApp() {
  const [selected, setSelected] = useState(experienceData[0].id);
  const active = experienceData.find((e) => e.id === selected)!;

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      <aside className="mac-sidebar shrink-0 border-b border-border/70 p-2 md:w-[220px] md:border-b-0 md:border-r">
        <div className="flex gap-2 overflow-x-auto scrollbar-none md:flex-col md:overflow-visible">
          {experienceData.map((exp) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => setSelected(exp.id)}
              data-sound="click"
              className={cn("mac-row w-[190px] shrink-0 text-left md:w-full", selected === exp.id && "mac-row-active")}
            >
              <span className="flex items-center gap-2">
                <span className="truncate font-semibold">{exp.company}</span>
                {exp.type === "Working" && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />}
              </span>
              <span
                className={cn(
                  "mt-0.5 block truncate text-[11px]",
                  selected === exp.id ? "text-primary-foreground/75" : "text-muted-foreground"
                )}
              >
                {exp.duration}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[24px] font-semibold tracking-tight">{active.company}</h1>
              {active.type === "Working" && (
                <span className="mac-pill border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Working
                </span>
              )}
            </div>

            <p className="mt-1 text-[14px] font-medium text-foreground/85">{active.title}</p>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} /> {active.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> {active.duration}
              </span>
            </div>

            <div className="mac-hairline my-4 h-px" />

            <h2 className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {active.technologies.map((tech) => (
                <TechBadge key={tech} tech={tech} showName />
              ))}
            </div>

            <h2 className="mb-2.5 mt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              What I did
            </h2>
            <ul className="space-y-2.5">
              {active.description.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                  <p className="text-[13.5px] leading-relaxed text-foreground/85">{item}</p>
                </li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
