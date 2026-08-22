"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Code, Rocket, Trophy } from "lucide-react";
import { PageWindow } from "@/components/mac/page-window";
import { TechBadge } from "@/components/tech-badge";
import { AppIcon, type Tone } from "@/components/mac/app-icon";

const achievementsData = [
  {
    id: 1,
    title: "Finalist — SIH 2024",
    subtitle: "Smart India Hackathon 2024",
    year: "2024",
    icon: <Trophy size={16} />,
    tone: "orange" as Tone,
    type: "Finalist",
    technologies: ["Python", "Streamlit"],
    description: [
      "Developed a traffic control optimization system using Reinforced Learning, simulating in SUMO environment.",
      "Created an innovative solution for smart traffic management that reached the finals of India's largest hackathon.",
      "Collaborated with a team to build the 'fikc.' project that addresses real-world traffic optimization challenges.",
    ],
  },
  {
    id: 2,
    title: "Winner — NMIT Hacks 25",
    subtitle: "Hackathon Competition",
    year: "2025",
    icon: <Award size={16} />,
    tone: "yellow" as Tone,
    type: "Winner",
    technologies: ["Python", "FastAPI", "React", "TypeScript"],
    description: [
      "Won the NMIT Hackathon with the 'Medical-AI' project — an intelligent diagnostic assistant.",
      "Built a comprehensive system for analyzing medical images (X-rays, CT scans, MRIs, and ultrasounds).",
      "Implemented AI-powered report generation and integrated doctor search with chat-based explanations.",
    ],
  },
  {
    id: 3,
    title: "Open Source Contributor",
    subtitle: "Active in the developer community",
    year: "Active",
    icon: <Code size={16} />,
    tone: "blue" as Tone,
    type: "Contributor",
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
    description: [
      "Actively contributing to various open source projects and maintaining personal repositories.",
      "Building projects like Recipe Finder, rentwheel, codeweb, and many other applications.",
      "Sharing knowledge and code with the developer community through GitHub contributions.",
    ],
  },
  {
    id: 4,
    title: "Hackathon Participations",
    subtitle: "odoo-hack, nextgen-hack and more",
    year: "2023-2025",
    icon: <Rocket size={16} />,
    tone: "violet" as Tone,
    type: "Participant",
    technologies: ["JavaScript", "Nextjs", "MongoDB", "TypeScript"],
    description: [
      "Successfully participated in multiple hackathons including odoo-hack and nextgen-hack.",
      "Built projects like Quick Desk (ticket management system) and MediFind (medical inventory system).",
      "Demonstrated consistent performance in competitive programming and rapid prototyping.",
    ],
  },
];

export default function AchievementsPage() {
  return (
    <PageWindow
      title="Achievements"
      subtitle={`${achievementsData.length} items`}
      toolbar={<span className="hidden text-[11px] text-muted-foreground sm:block">wins & finals</span>}
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {achievementsData.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-mac border border-border bg-background/40 p-3.5 transition-colors duration-200 hover:bg-foreground/[0.03]"
          >
            <header className="flex items-start gap-3">
              <AppIcon tone={item.tone} size="md">
                {item.icon}
              </AppIcon>

              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold leading-tight tracking-tight">{item.title}</h2>
                <p className="text-[11.5px] text-muted-foreground">{item.subtitle}</p>
              </div>

              <span className="mac-pill shrink-0">
                <Calendar size={11} /> {item.year}
              </span>
            </header>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <TechBadge key={tech} tech={tech} showName />
              ))}
            </div>

            <ul className="mt-4 space-y-2.5">
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
    </PageWindow>
  );
}
