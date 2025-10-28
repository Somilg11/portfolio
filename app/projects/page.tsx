"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectData } from "@/data/projectData";
import { Container, Section } from "@/components/craft";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  type Project = typeof projectData[number];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  return (
    <Section>
      <Container className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="text-3xl md:text-4xl font-extrabold text-zinc-100 mb-4 tracking-tight">{`_`} PROJECTS.</div>
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900 text-white border-zinc-700 placeholder:text-zinc-400"
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`px-4 py-1 rounded-full font-semibold text-sm border transition-colors duration-200 ${selectedCategory === cat.key ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800"}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px]">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <span className="text-2xl md:text-3xl font-extrabold text-zinc-400 mb-2 uppercase">_Coming Soon.</span>
              <span className="text-sm text-zinc-500">No projects available in this category yet.</span>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className={`relative cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md group shadow-md hover:scale-[1.03] transition-all overflow-hidden`}
                style={{
                  gridColumn:
                    index % 7 === 0
                      ? "span 2"
                      : index % 11 === 0
                      ? "span 3"
                      : "span 1",
                  gridRow:
                    index % 5 === 0
                      ? "span 2"
                      : index % 9 === 0
                      ? "span 1"
                      : "span 1",
                }}
              >
                {/* Double Circle Effect */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out delay-75"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-3">
                  <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-100 tracking-tight leading-tight">
                    {project.title}
                  </span>
                </div>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 rounded-2xl bg-zinc-800/0 group-hover:bg-zinc-800/30 transition-colors" />
              </div>
            ))
          )}
        </div>

        {/* Dialog */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          <DialogContent className="max-w-xl bg-zinc-950/90 border border-zinc-800 text-zinc-100 rounded-2xl overflow-hidden backdrop-blur-md">
            {selectedProject && (
              <>
                {/* Image */}
                {selectedProject.image && (
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950"></div>
                  </div>
                )}

                <div className="p-5">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400 mt-1">
                      {selectedProject.description}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Tech Stack */}
                  {selectedProject.tech && (
                    <div className="mt-5">
                      <h4 className="font-semibold text-zinc-300 mb-2">
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-zinc-800/70 rounded-md border border-zinc-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3 mt-6">
                    {selectedProject.url && (
                      <Button
                        variant="secondary"
                        size="sm"
                        asChild
                        className="bg-zinc-800 hover:bg-zinc-700"
                      >
                        <a
                          href={selectedProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github size={16} /> GitHub
                        </a>
                      </Button>
                    )}
                    {selectedProject.live && (
                      <Button
                        variant="secondary"
                        size="sm"
                        asChild
                        className="bg-blue-600 hover:bg-blue-500"
                      >
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink size={16} /> Live
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Section>
  );
}