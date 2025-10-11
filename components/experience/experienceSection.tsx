"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Creova.in",
    duration: "May 2025 - July 2025",
    description:
      "Worked on full-stack projects, contributing to both backend logic and frontend development while improving system performance.",
    color: "bg-blue-500",
  },
  {
    title: "Backend Lead",
    company: "DevC - College Club",
    duration: "Current",
    description:
      "Leading backend architecture and development for multiple college projects including alumni and event management portals.",
    color: "bg-green-500",
  },
];

export default function ExperienceSection() {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 shadow-lg border border-zinc-800 p-6">
      <h2 className="text-2xl font-semibold text-slate-100 mb-6">
        Experience 💼
      </h2>

      <div className="relative pl-6">
        {/* Timeline Line */}
        <div className="absolute left-3 top-0 h-full w-[2px] bg-zinc-700 rounded-full" />

        <div className="flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start">
              <span
                className={`absolute left-[-6px] top-1 w-3 h-3 ${exp.color} rounded-full`}
              ></span>
              <div className="ml-6 bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 shadow-md w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-100">
                    {exp.title}
                  </h3>
                  <Badge
                    variant={
                      exp.duration === "Current" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {exp.duration}
                  </Badge>
                </div>
                <p className="text-sm text-blue-400 mt-1">{exp.company}</p>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
