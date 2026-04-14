"use client";

import React from "react";
import { Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";
import { TechBadge } from "@/components/tech-badge";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

const experienceData = [
  {
    id: 1,
    title: "SDE Intern",
    company: "Creova.in",
    type: "Completed",
    duration: "May 2025 - July 2025",
    location: "Remote",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Rest APIs"],
    description: [
      "Worked on full-stack projects, contributing to both backend logic and frontend development while improving system performance.",
      "Collaborated with senior developers to implement new features and optimize existing functionality.",
      "Gained hands-on experience with modern web development technologies and best practices."
    ],
    links: {
      website: "#"
    }
  },
  {
    id: 2,
    title: "Backend Lead",
    company: "DevC - College Club",
    type: "Working",
    duration: "Aug 2024 - Present",
    location: "College Campus (On-Site)",
    technologies: ["Nodejs", "Express", "MongoDB", "PostgreSQL", "Docker", "AWS"],
    description: [
      "Leading backend architecture and development for multiple college projects including alumni and event management portals.",
      "Mentoring junior developers and establishing coding standards for the team.",
      "Managing database design and API development for various college applications.",
      "Coordinating with frontend teams to ensure seamless integration and optimal performance."
    ],
    links: {
      website: "#"
    }
  }
];

export default function ExperiencePage() {
  return (
    <Section className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white">
      <Container className="max-w-4xl mx-auto px-6 py-12 sm:py-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">Work Experience</h1>
          <p className="text-zinc-400 text-lg">
            My work experiences across different companies and roles.
          </p>
        </motion.div>

        {/* Experience List */}
        <div className="space-y-20">
          {experienceData.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Top Row: Company & Title & Status & Date */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{exp.company}</span>
                    {exp.type === "Working" && (
                      <Badge className="bg-zinc-950 border border-emerald-500/50 text-emerald-400 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        Working
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-zinc-400 font-medium">
                    <span className="text-zinc-200">{exp.title}</span>
                    <div className="flex items-center gap-1.5 text-sm">
                      <MapPin size={14} className="text-zinc-500" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-1 text-zinc-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>

              {/* Technologies Section */}
              <div className="mb-8">
                <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Technologies & Tools</h4>
                <div className="flex flex-wrap gap-3">
                  {exp.technologies.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>

              {/* Description Section */}
              <div>
                <h4 className="text-[13px] font-bold text-zinc-500 uppercase tracking-widest mb-4">What I&apos;ve done</h4>
                <ul className="space-y-4">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-sm bg-zinc-700 group-hover:bg-zinc-500 transition-colors shrink-0"></span>
                      <p className="text-zinc-300 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Separator */}
              {i !== experienceData.length - 1 && (
                <div className="absolute -bottom-10 left-0 right-0 h-px bg-zinc-900"></div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}