export type Experience = {
  id: number;
  title: string;
  company: string;
  type: "Working" | "Completed";
  duration: string;
  location: string;
  technologies: string[];
  description: string[];
};

export const experienceData: Experience[] = [
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
