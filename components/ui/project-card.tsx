/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowUpRight, Github, Globe } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  url: string; // GitHub URL
  live?: string; // Optional live site URL
  tech?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  url,
  live,
  tech = [],
}) => {
  return (
    <div className="block mt-4">
      <MagicCard
        className="max-h-fit cursor-pointer flex-col p-3 shadow-2xl whitespace-nowrap text-xl rounded-lg"
        gradientColor={"#D9D9D955"}
      >
        {/* Image section */}
        <div className="w-full h-36 flex justify-center mb-2">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover rounded-sm"
          />
        </div>

        {/* Title and icons */}
        <div className="flex justify-between items-center text-sm font-medium mb-1">
          <div className="inline-flex items-center gap-1">
            {title}
            <ArrowUpRight size={18} />
          </div>
          <div className="flex gap-2">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Github size={18} className="hover:text-blue-400" />
            </a>
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer">
                <Globe size={18} className="hover:text-blue-400" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="text-xs text-slate-400 mb-2">{description}</div>

        {/* Tech Stack */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tech.map((item, index) => (
              <span
                key={index}
                className="bg-white text-xs font-semibold px-2 py-1 rounded-full text-black"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </MagicCard>
    </div>
  );
};

export default ProjectCard;
