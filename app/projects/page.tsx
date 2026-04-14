"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectData } from "@/data/projectData";
import { Container, Section } from "@/components/craft";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const cardGradients = [
  "from-amber-500/20 to-orange-500/20",
  "from-blue-500/20 to-cyan-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-fuchsia-500/20 to-pink-500/20",
  "from-rose-500/20 to-red-500/20",
  "from-violet-500/20 to-purple-500/20",
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const categories = [
    { key: "all", label: "All" },
    { key: "web", label: "Web" },
    { key: "ai", label: "AI" },
    { key: "hackathon", label: "Hackathon" },
    { key: "core", label: "Core" },
  ];

  const filteredProjects = [...projectData]
    .reverse()
    .filter((project) => {
      const categories = Array.isArray(project.category) ? project.category : [project.category];
      return (
        (selectedCategory === "all" || categories.includes(selectedCategory)) &&
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const toggleExpand = (title: string) => {
    setExpandedProjects(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <Section className="min-h-screen bg-black selection:bg-zinc-800 selection:text-white pb-32">
      <Container className="max-w-6xl mx-auto w-full px-6 pt-12 sm:pt-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight uppercase tracking-tighter">Projects</h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-950 text-white border-zinc-800 placeholder:text-zinc-500 max-w-sm rounded-xl h-10"
            />
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors duration-200 ${
                    selectedCategory === cat.key 
                      ? "bg-zinc-800 text-white" 
                      : "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <span className="text-2xl font-bold text-zinc-300 mb-2">No projects found.</span>
              <span className="text-zinc-500">Try adjusting your search or category filter.</span>
            </div>
          ) : (
            filteredProjects.map((project, index) => {
              const isExpanded = expandedProjects[project.title] || false;
              const gradient = cardGradients[index % cardGradients.length];
              
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col group h-full"
                >
                  {/* Image Container */}
                  <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border border-zinc-800/50 mb-5 flex items-center justify-center p-4 sm:p-6 transition-colors`}>
                    {project.image ? (
                      <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-lg overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain object-center"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500/50 font-bold text-xl mix-blend-overlay">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow px-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                      {project.title}
                    </h2>
                    
                    <p className={`text-zinc-400 text-[15px] leading-relaxed mb-4 ${!isExpanded ? "line-clamp-2" : ""}`}>
                      {project.description}
                    </p>

                    <button 
                      onClick={() => toggleExpand(project.title)}
                      className="flex items-center gap-1.5 text-emerald-500 hover:text-emerald-400 font-medium text-sm transition-colors mb-6 w-fit"
                    >
                      Read more
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {/* Expandable Content (Links) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex gap-4 mb-6 overflow-hidden"
                        >
                          {project.url && (
                            <Link 
                              href={project.url} 
                              target="_blank" 
                              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                            >
                              <Github size={16} /> GitHub
                            </Link>
                          )}
                          {project.live && (
                            <Link 
                              href={project.live} 
                              target="_blank" 
                              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                            >
                              <ExternalLink size={16} /> Live Demo
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tech Badges (Pushed to bottom) */}
                    <div className="mt-auto pt-2 flex flex-wrap gap-2">
                      {project.tech?.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-medium bg-[#1c1c1c] text-zinc-300 rounded-md border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </Container>
    </Section>
  );
}