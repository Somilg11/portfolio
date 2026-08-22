import type { Tone } from "@/components/mac/app-icon";

export type Achievement = {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  tone: Tone;
  glyph: "trophy" | "award" | "code" | "rocket";
  type: string;
  technologies: string[];
  description: string[];
};

export const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "Finalist — SIH 2024",
    subtitle: "Smart India Hackathon 2024",
    year: "2024",
    tone: "orange",
    glyph: "trophy",
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
    tone: "yellow",
    glyph: "award",
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
    tone: "blue",
    glyph: "code",
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
    tone: "violet",
    glyph: "rocket",
    type: "Participant",
    technologies: ["JavaScript", "Nextjs", "MongoDB", "TypeScript"],
    description: [
      "Successfully participated in multiple hackathons including odoo-hack and nextgen-hack.",
      "Built projects like Quick Desk (ticket management system) and MediFind (medical inventory system).",
      "Demonstrated consistent performance in competitive programming and rapid prototyping.",
    ],
  },
];
