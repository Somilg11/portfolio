"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    title: "Finalist - SIH 2024",
    subtitle: "Smart India Hackathon 2024",
    year: "2024",
    icon: "🥈",
    color: "bg-yellow-400",
  },
  {
    title: "Winner - NMIT Hacks 25",
    subtitle: "Hackathon Competition",
    year: "Winner",
    icon: "🏆",
    color: "bg-yellow-500",
  },
  {
    title: "Open Source Contributor",
    subtitle: "Contributing to open source projects",
    year: "Active",
    icon: "💻",
    color: "bg-blue-400",
  },
];

export default function AchievementsSection() {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 shadow-lg border border-zinc-800 p-6">
      <h2 className="text-2xl font-semibold text-slate-100 mb-6">
        Achievements 🏆
      </h2>

      <div className="relative pl-6">
        {/* Timeline Line */}
        <div className="absolute left-3 top-0 h-full w-[2px] bg-zinc-700 rounded-full" />

        <div className="flex flex-col gap-10">
          {achievements.map((ach, index) => (
            <div key={index} className="relative flex items-start">
              <span
                className={`absolute left-[-6px] top-1 w-3 h-3 ${ach.color} rounded-full`}
              ></span>
              <div className="ml-6 bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 shadow-md w-full">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{ach.icon}</span>
                  <h3 className="text-lg font-semibold text-slate-100">
                    {ach.title}
                  </h3>
                  <Badge
                    variant={
                      ach.year === "Winner" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {ach.year}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{ach.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
