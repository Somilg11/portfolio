"use client";

import React, { useState } from "react";
import ProjectCard from "@/components/ui/project-card";
import { projectData } from "@/data/projectData";
import { Container, Section } from "@/components/craft";
import { Input } from "@/components/ui/input"; // assumes you're using shadcn input or similar

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projectData.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateDescription = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + " ..."
      : text;
  };

  return (
    <Section>
      <Container className="w-full sm:w-[80%] max-w-4xl mx-auto">
        <div className="text-2xl font-bold mb-4 text-center">All Projects ⚙️</div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            placeholder="Search projects by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 text-white placeholder:text-zinc-400"
          />
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.image}
              title={project.title}
              description={truncateDescription(project.description, 14)}
              url={project.url}
              live={project.live}
              tech={project.tech}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default ProjectsPage;
