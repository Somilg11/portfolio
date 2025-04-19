import React from "react";
import ProjectCard from "@/components/ui/project-card";
import Link from "next/link";
import { projectData } from "@/data/projectData"; // using shared data
import { ChevronRight } from "lucide-react";

const Projects = () => {
  return (
    <main>
      <div className="text-2xl font-bold mb-4">projects 🏗️</div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 mb-10">
        {projectData.slice(0, 4).map((project, index) => (
          <ProjectCard
            key={index}
            image={project.image}
            title={project.title}
            description={truncateDescription(project.description, 8)}
            url={project.url}
            live={project.live}
            tech={project.tech}
          />
        ))}
      </div>

      <div className="text-center">
        <Link href="/projects">
          <span className="bg-zinc-700 py-1 px-4 text-white font-bold rounded-full text-sm cursor-pointer inline-flex items-center justify-center">
          ✨ see all projects <ChevronRight/>
          </span>
        </Link>
      </div>
    </main>
  );
};

const truncateDescription = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + " ..."
    : text;
};

export default Projects;
