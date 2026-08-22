"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { PageWindow } from "@/components/mac/page-window";
import { TechBadge } from "@/components/tech-badge";
import { cn } from "@/lib/utils";

const experienceData = [
  {
    id: 1,
    title: "Software Development Engineer Intern",
    company: "Recrivio",
    type: "Working",
    duration: "May 2026 - Present",
    location: "Onsite",
    technologies: ["NestJS", "PostgreSQL", "OpenCV", "FFmpeg", "Docker", "TypeScript", "AWS"],
    description: [
      "Architected Recriauth, a background verification system, implementing role-based access control (RBAC) via NestJS to handle authorization for 100% of incoming verification requests.",
      "Built an in-house OCR engine using ONNX models and OpenCV for identity verification and automated data masking, eliminating third-party API dependency and cutting operational costs by 30%.",
      "Integrated automated multi-language transcription via FFmpeg and scheduled cron workers for continuous processing.",
    ],
  },
  {
    id: 2,
    title: "Software Development Engineer Intern",
    company: "Creova",
    type: "Completed",
    duration: "May 2025 - Jul 2025",
    location: "Remote",
    technologies: ["Next.js", "Node.js", "MongoDB", "Redis", "TypeScript"],
    description: [
      "Collaborated with a cross-functional team to design and deploy 3 production-grade full-stack applications using Next.js, Node.js, and MongoDB, improving scalability and reducing page load time by 35% for 10K+ users.",
      "Revamped 8 Redis-cached RESTful APIs and migrated 2.5K+ lines of legacy JavaScript to TypeScript, cutting response latency by 40% and lowering production bug frequency by 60%.",
    ],
  },
  {
    id: 3,
    title: "Backend Lead",
    company: "DevC - College Club",
    type: "Completed",
    duration: "Jul 2025 - Jun 2026",
    location: "College Campus (On-Site)",
    technologies: ["Nodejs", "Express", "MongoDB", "PostgreSQL", "Docker", "AWS"],
    description: [
      "Led backend architecture and development for multiple college projects including alumni and event management portals.",
      "Mentored junior developers and established coding standards for the team.",
      "Managed database design and API development for various college applications.",
      "Coordinated with frontend teams to ensure seamless integration and optimal performance.",
    ],
  },
];

export default function ExperiencePage() {
  const [selected, setSelected] = useState(experienceData[0].id);
  const active = experienceData.find((e) => e.id === selected)!;

  return (
    <PageWindow
      title="Experience"
      subtitle={`${experienceData.length} roles`}
      bodyClassName="p-0"
      toolbar={<span className="hidden text-[11px] text-muted-foreground sm:block">2023 — present</span>}
    >
      <div className="flex min-h-[60vh] flex-col md:flex-row">
        {/* Source list */}
        <aside className="mac-sidebar shrink-0 border-b border-border/70 p-2 md:w-[260px] md:border-b-0 md:border-r">
          <div className="flex gap-2 overflow-x-auto scrollbar-none md:flex-col md:overflow-visible">
            {experienceData.map((exp) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => setSelected(exp.id)}
                data-sound="click"
                className={cn(
                  "mac-row w-[210px] shrink-0 text-left md:w-full",
                  selected === exp.id && "mac-row-active"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="truncate font-semibold">{exp.company}</span>
                  {exp.type === "Working" && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  )}
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

        {/* Detail pane */}
        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[26px] font-semibold tracking-tight sm:text-[30px]">{active.company}</h1>
                {active.type === "Working" && (
                  <span className="mac-pill border-emerald-500/40 text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Working
                  </span>
                )}
              </div>

              <p className="mt-1 text-[15px] font-medium text-foreground/85">{active.title}</p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} /> {active.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {active.duration}
                </span>
              </div>

              <div className="mac-hairline my-5 h-px" />

              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {active.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} showName />
                ))}
              </div>

              <h2 className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                What I did
              </h2>
              <ul className="space-y-3">
                {active.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <p className="text-[14px] leading-relaxed text-foreground/85">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </PageWindow>
  );
}
