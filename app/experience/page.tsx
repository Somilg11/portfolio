"use client";

import React from "react";
import { Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";
import { Globe, ExternalLink, Calendar, MapPin, Briefcase } from "lucide-react";

// Your actual work experience data
const experienceData = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "Creova.in",
    type: "Completed",
    duration: "May 2025 - July 2025",
    location: "Remote",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "REST APIs"],
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
    duration: "Current",
    location: "College Campus",
    technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "AWS"],
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

const getStatusBadge = (type: string) => {
  switch (type) {
    case "Working":
      return <Badge className="bg-green-600 hover:bg-green-700 text-white">● Working</Badge>;
    case "Completed":
      return <Badge variant="secondary">Completed</Badge>;
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

export default function ExperiencePage() {
  return (
    <Section className="min-h-screen bg-black text-white">
      <Container className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">_EXPERIENCE.</h1>
          <p className="text-lg sm:text-xl text-zinc-400 font-mono">
            My work experiences across different companies and roles.
          </p>
        </div>

        {/* Experiences List */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-zinc-300">
            All Experiences <span className="text-zinc-500">({experienceData.length} experiences)</span>
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {experienceData.map((experience) => (
              <div
                key={experience.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-zinc-900/70 transition-colors"
              >
                {/* Header with company info and status */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Company Logo Placeholder */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        {experience.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-zinc-400 text-sm sm:text-base">{experience.company}</span>
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                          <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        {getStatusBadge(experience.type)}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-zinc-400 text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-sm font-medium text-zinc-300 mb-3">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <TechnologyBadge key={index} tech={tech} />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 sm:space-y-3">
                  {experience.description.map((item, index) => (
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