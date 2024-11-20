import React from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  url: string;  // URL for the project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      <MagicCard
        className="max-h-[250px] mt-4 cursor-pointer flex-col p-3 shadow-2xl whitespace-nowrap text-xl rounded-lg"
        gradientColor={"#D9D9D955"}
      >
        {/* Image section */}
        <div className="w-full h-36 flex justify-center mb-2">
          <img src={image} alt={title} className="h-full w-full object-cover repeat-0 rounded-sm" />
        </div>
        
        {/* Title and description */}
        <div className="text-sm tracking-wide inline-flex gap-1">{title}<ArrowUpRight size={20}/></div>
        <div className="text-xs text-slate-400">{description}</div>
      </MagicCard>
    </a>
  );
};

export default ProjectCard;
