"use client";

import React from "react";
import { Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";
import { TechBadge } from "@/components/tech-badge";
import { motion } from "framer-motion";
import { Calendar, Trophy, Rocket, Code, Award } from "lucide-react";

const achievementsData = [
  {
    id: 1,
    title: "Finalist - SIH 2024",
    subtitle: "Smart India Hackathon 2024",
    year: "2024",
    icon: <Trophy size={18} className="text-orange-400" />,
    type: "Finalist",
    technologies: ["Python", "Streamlit"],
    description: [
      "Developed a traffic control optimization system using Reinforced Learning, simulating in SUMO environment.",
      "Created an innovative solution for smart traffic management that reached the finals of India's largest hackathon.",
      "Collaborated with a team to build the 'fikc.' project that addresses real-world traffic optimization challenges."
    ]
  },
  {
    id: 2,
    title: "Winner - NMIT Hacks 25",
    subtitle: "Hackathon Competition",
    year: "Winner",
    icon: <Award size={18} className="text-yellow-400" />,
    type: "Winner",
    technologies: ["Python", "FastAPI", "React", "TypeScript"],
    description: [
      "Won the NMIT Hackathon with the 'Medical-AI' project - an intelligent diagnostic assistant.",
      "Built a comprehensive system for analyzing medical images (X-rays, CT scans, MRIs, and ultrasounds).",
      "Implemented AI-powered report generation and integrated doctor search with chat-based explanations."
    ]
  },
  {
    id: 3,
    title: "Open Source Contributor",
    subtitle: "Active in Developer Community",
    year: "Active",
    icon: <Code size={18} className="text-blue-400" />,
    type: "Contributor",
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
    description: [
      "Actively contributing to various open source projects and maintaining personal repositories.",
      "Building projects like Recipe Finder, rentwheel, codeweb, and many other innovative applications.",
      "Sharing knowledge and code with the developer community through GitHub contributions."
    ]
  },
  {
    id: 4,
    title: "Hackathon Participations",
    subtitle: "odoo-hack, nextgen-hack and more",
    year: "2023-2025",
    icon: <Rocket size={18} className="text-purple-400" />,
    type: "Participant",
    technologies: ["JavaScript", "Nextjs", "MongoDB", "TypeScript"],
    description: [
      "Successfully participated in multiple hackathons including odoo-hack and nextgen-hack.",
      "Built projects like Quick Desk (ticket management system) and MediFind (medical inventory system).",
      "Demonstrated consistent performance in competitive programming and rapid prototyping."
    ]
  }
];

export default function AchievementsPage() {
  return (
    <Section className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white">
      <Container className="max-w-4xl mx-auto px-6 py-12 sm:py-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight uppercase">Achievements</h1>
          <p className="text-zinc-400 text-lg">
            My achievements and recognitions across competitions and projects.
          </p>
        </motion.div>

        {/* Achievements List */}
        <div className="space-y-20">
          {achievementsData.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Top Row: Title & Subtitle & Badge & Year */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      {achievement.icon}
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{achievement.title}</span>
                    {achievement.type === "Winner" && (
                      <Badge className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 px-2.5 py-0.5 rounded-full">
                        Winner
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-zinc-400 font-medium">
                    <span className="text-zinc-200">{achievement.subtitle}</span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-1 text-zinc-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{achievement.year}</span>
                  </div>
                </div>
              </div>

              {/* Technologies Section */}
              <div className="mb-8">
                <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Core Technologies</h4>
                <div className="flex flex-wrap gap-3">
                  {achievement.technologies.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>

              {/* Description Section */}
              <div>
                <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Impact & Contributions</h4>
                <ul className="space-y-4">
                  {achievement.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-sm bg-zinc-700 group-hover:bg-zinc-500 transition-colors shrink-0"></span>
                      <p className="text-zinc-300 leading-relaxed font-normal">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Separator */}
              {i !== achievementsData.length - 1 && (
                <div className="absolute -bottom-10 left-0 right-0 h-px bg-zinc-900"></div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}