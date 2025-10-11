"use client";

import React from "react";
import ExperienceSection from "./experienceSection";
import AchievementsSection from "./achievementsSection";

export default function ExperienceAchievements() {
  return (
    <main className="space-y-10 px-2 md:px-4 py-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
      <ExperienceSection />
      <AchievementsSection />
    </main>
  );
}
