"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, LayoutGrid, List } from "lucide-react";
import { projectData } from "@/data/projectData";
import { SearchIcon } from "@/components/mac/asset-icons";
import { TechBadge } from "@/components/tech-badge";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI" },
  { key: "hackathon", label: "Hackathon" },
  { key: "core", label: "Core" },
];

export function ProjectsApp() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      [...projectData].reverse().filter((project) => {
        const cats = Array.isArray(project.category) ? project.category : [project.category];
        return (
          (category === "all" || cats.includes(category)) &&
          project.title.toLowerCase().includes(query.toLowerCase())
        );
      }),
    [query, category]
  );

  return (
    <div className="flex min-h-full flex-col">
      {/* Finder toolbar */}
      <div className="mac-sidebar sticky top-0 z-10 flex flex-col gap-2 border-b border-border/70 p-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 overflow-x-auto rounded-[8px] border border-border bg-background/60 p-0.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategory(cat.key)}
              data-sound="click"
              className={cn(
                "whitespace-nowrap rounded-[6px] px-2.5 py-1 text-[12px] font-medium transition-colors",
                category === cat.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-[190px] sm:flex-none">
            <SearchIcon size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              data-sound="tick"
              className="mac-focus h-7 w-full rounded-full border border-border bg-background/70 pl-7 pr-3 text-[12.5px] outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-0.5 rounded-[7px] border border-border bg-background/60 p-0.5">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={cn(
                "rounded-[5px] p-1",
                view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <LayoutGrid size={13} />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => setView("list")}
              className={cn(
                "rounded-[5px] p-1",
                view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <List size={13} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-3.5 sm:p-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-semibold">No items match your search</p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">Try a different name or category.</p>
          </div>
        ) : (
          <div
            className={cn(
              view === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-2.5"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) =>
                view === "grid" ? (
                  <motion.article
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: Math.min(index * 0.025, 0.2), duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="group flex flex-col overflow-hidden rounded-mac border border-border bg-background/40 transition-colors duration-200 hover:bg-foreground/[0.03]"
                  >
                    <Thumb src={project.image} title={project.title} />

                    <div className="flex flex-1 flex-col p-3">
                      <h2 className="text-[14.5px] font-semibold tracking-tight">{project.title}</h2>
                      <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {project.tech?.slice(0, 4).map((tech: string, i: number) => (
                          <TechBadge key={`${tech}-${i}`} tech={tech} showName />
                        ))}
                      </div>

                      <div className="mt-auto flex items-center gap-2 pt-3">
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="mac-button gap-1.5">
                            <Github size={13} /> Code
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mac-button mac-button-primary gap-1.5"
                          >
                            <ExternalLink size={13} /> Live
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ) : (
                  <motion.article
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-3 rounded-mac border border-border bg-background/40 p-2.5 transition-colors hover:bg-foreground/[0.03]"
                  >
                    <Thumb src={project.image} title={project.title} compact />
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-[13.5px] font-semibold tracking-tight">{project.title}</h2>
                      <p className="truncate text-[12px] text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-2 sm:flex">
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="mac-button" aria-label="Code">
                          <Github size={13} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mac-button mac-button-primary"
                          aria-label="Live"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </motion.article>
                )
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

/** Project preview with a graceful fallback when the remote image is gone. */
function Thumb({ src, title, compact }: { src?: string; title: string; compact?: boolean }) {
  const [failed, setFailed] = useState(false);
  const show = src && !failed;

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-muted/60",
        compact ? "h-12 w-16 rounded-[8px] border border-border/70" : "aspect-[16/10] border-b border-border/70"
      )}
    >
      {show ? (
        <Image
          src={src}
          alt={`${title} preview`}
          fill
          sizes={compact ? "64px" : "(max-width: 640px) 100vw, 340px"}
          onError={() => setFailed(true)}
          className={cn("object-cover", !compact && "transition-transform duration-500 group-hover:scale-105")}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mac-assets/images/image.png"
            alt=""
            loading="lazy"
            className={cn("opacity-60", compact ? "h-6" : "h-11")}
          />
          {!compact && <span className="text-[10.5px] text-muted-foreground">no preview</span>}
        </div>
      )}
    </div>
  );
}
