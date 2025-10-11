/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { ArrowUpRight, Github, Globe } from "lucide-react";

interface ProjectType {
  image: string;
  title: string;
  description: string;
  url: string;
  live?: string;
  tech?: string[];
}

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  url: string; // GitHub URL
  live?: string; // Optional live site URL
  tech?: string[];
  project?: ProjectType;
}

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger, AlertDialogCancel } from "@/components/ui/alert-dialog";

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  url,
  live,
  tech = [],
  project,
}) => {
  return (
    <div className="block mt-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div>
            <MagicCard
              className="max-h-fit cursor-pointer flex-col p-2 md:p-3 shadow-xl whitespace-nowrap text-xl rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md"
              gradientColor={"#23272f99"}
            >
              {/* Image section */}
              <div className="w-full h-28 flex justify-center items-center mb-2 rounded-xl overflow-hidden bg-slate-900/80">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover rounded-xl shadow"
                />
              </div>

              {/* Title and icons */}
              <div className="flex justify-between items-center text-sm font-medium mb-1 px-1">
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
              <div className="text-xs text-slate-400 mb-2 text-left px-1 leading-relaxed">{description}</div>

              {/* Tech Stack */}
              {tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 px-1">
                  {tech.map((item, index) => (
                    <span
                      key={index}
                      className="bg-slate-900/80 text-xs font-semibold px-2 py-1 rounded-full text-slate-200 border border-slate-700 shadow"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </MagicCard>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-lg bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl rounded-2xl backdrop-blur-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-100 text-left text-lg font-semibold mb-2">{title}</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="mb-3 rounded-xl overflow-hidden bg-slate-900/80">
                <img src={image} alt={title} className="w-full h-36 object-cover rounded-xl shadow" />
              </div>
              <div className="mb-3 text-sm text-slate-300 text-left leading-relaxed">{project?.description}</div>
              <div className="mb-3">
                <span className="font-semibold text-slate-200">Tech Stack:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tech.map((item, idx) => (
                    <span key={idx} className="bg-slate-900/80 text-xs font-semibold px-2 py-1 rounded-full text-slate-200 border border-slate-700 shadow">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <a href={url} target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-slate-200 transition-colors">
                  <Github size={20} />
                </a>
                {live && (
                  <a href={live} target="_blank" rel="noopener noreferrer" title="Live Site" className="hover:text-slate-200 transition-colors">
                    <Globe size={20} />
                  </a>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel className="mt-4 bg-slate-900 text-slate-200 border border-slate-700 rounded-full px-4 py-1 hover:bg-slate-800 transition">Close</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectCard;
