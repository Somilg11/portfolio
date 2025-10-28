"use client";

import React from "react";
import { Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

// Your actual achievements data
const achievementsData = [
  {
    id: 1,
    title: "Finalist - SIH 2024",
    subtitle: "Smart India Hackathon 2024",
    year: "2024",
    icon: "🥈",
    type: "Competition",
    technologies: ["Python", "SUMO", "Reinforcement Learning", "Streamlit"],
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
    icon: "🏆",
    type: "Competition",
    technologies: ["Python", "FastAPI", "Gemini AI", "React", "TypeScript"],
    description: [
      "Won the NMIT Hackathon with the 'Medical-AI' project - an intelligent diagnostic assistant.",
      "Built a comprehensive system for analyzing medical images (X-rays, CT scans, MRIs, and ultrasounds).",
      "Implemented AI-powered report generation and integrated doctor search with chat-based explanations."
    ]
  },
  {
    id: 3,
    title: "Open Source Contributor",
    subtitle: "Contributing to open source projects",
    year: "Active",
    icon: "💻",
    type: "Development",
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
    description: [
      "Actively contributing to various open source projects and maintaining personal repositories.",
      "Building projects like Recipe Finder, rentwheel, codeweb, and many other innovative applications.",
      "Sharing knowledge and code with the developer community through GitHub contributions."
    ]
  },
  {
    id: 4,
    title: "Multiple Hackathon Participations",
    subtitle: "Various hackathons including odoo-hack and nextgen-hack",
    year: "2023-2025",
    icon: "🚀",
    type: "Competition",
    technologies: ["Full Stack", "MERN", "Next.js", "MongoDB", "TypeScript"],
    description: [
      "Successfully participated in multiple hackathons including odoo-hack and nextgen-hack.",
      "Built projects like Quick Desk (ticket management system) and MediFind (medical inventory system).",
      "Demonstrated consistent performance in competitive programming and rapid prototyping."
    ]
  }
];

const getTypeBadge = (type: string, year: string) => {
  if (year === "Winner") {
    return <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white">🏆 Winner</Badge>;
  }
  switch (type) {
    case "Competition":
      return <Badge className="bg-orange-600 hover:bg-orange-700 text-white">Competition</Badge>;
    case "Development":
      return <Badge className="bg-blue-600 hover:bg-blue-700 text-white">● Active</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

const TechnologyBadge = ({ tech }: { tech: string }) => (
  <Badge 
    variant="outline" 
    className="text-xs bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
  >
    {tech}
  </Badge>
);

export default function AchievementsPage() {
  return (
    <Section className="min-h-screen bg-black text-white">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 uppercase">_Achievements.</h1>
          <p className="text-lg sm:text-xl text-zinc-400 font-mono">
            My achievements and recognitions across competitions and projects.
          </p>
        </div>

        {/* Achievements List */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-zinc-300">
            All Achievements <span className="text-zinc-500">({achievementsData.length} achievements)</span>
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {achievementsData.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-zinc-900/70 transition-colors"
              >
                {/* Header with achievement info and status */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Achievement Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0 text-lg sm:text-xl">
                      {achievement.icon}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        {achievement.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-zinc-400 text-sm sm:text-base">{achievement.subtitle}</span>
                        {getTypeBadge(achievement.type, achievement.year)}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-zinc-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{achievement.year}</span>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-sm font-medium text-zinc-300 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {achievement.technologies.map((tech, index) => (
                      <TechnologyBadge key={index} tech={tech} />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 sm:space-y-3">
                  {achievement.description.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-zinc-500 mt-1 sm:mt-2 text-sm">•</span>
                      <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}