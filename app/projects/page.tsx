"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, LayoutGrid, List, Search } from "lucide-react";
import { projectData } from "@/data/projectData";
import { PageWindow } from "@/components/mac/page-window";
import { TechBadge } from "@/components/tech-badge";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "ai", label: "AI" },
  { key: "hackathon", label: "Hackathon" },
  { key: "core", label: "Core" },
];

export default function ProjectsPage() {
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
    <PageWindow
      title="Projects"
      subtitle={`${filtered.length} of ${projectData.length} items`}
      bodyClassName="p-0"
      toolbar={
        <div className="hidden items-center gap-0.5 rounded-[7px] border border-border bg-background/60 p-0.5 sm:flex">
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => setView("grid")}
            className={cn("rounded-[5px] p-1", view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            <LayoutGrid size={13} />
          </button>
          <button
            type="button"
            aria-label="List view"
            onClick={() => setView("list")}
            className={cn("rounded-[5px] p-1", view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            <List size={13} />
          </button>
        </div>
      }
    >
      {/* Finder-style secondary toolbar */}
      <div className="mac-sidebar sticky top-0 z-10 flex flex-col gap-2.5 border-b border-border/70 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 overflow-x-auto rounded-[8px] border border-border bg-background/60 p-0.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategory(cat.key)}
              data-sound="click"
              className={cn(
                "whitespace-nowrap rounded-[6px] px-3 py-1 text-[12px] font-medium transition-colors",
                category === cat.key
                  ? "bg-primary text-primary-foreground shadow-mac-1"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative sm:w-[230px]">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            data-sound="tick"
            className="mac-focus h-8 w-full rounded-full border border-border bg-background/70 pl-7 pr-3 text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[17px] font-semibold">No items match your search</p>
            <p className="mt-1 text-[13px] text-muted-foreground">Try a different name or category.</p>
          </div>
        ) : (
          <div
            className={cn(
              view === "grid"
                ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-3"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) =>
                view === "grid" ? (
                  <motion.article
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: Math.min(index * 0.03, 0.25), duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                    className="group flex flex-col overflow-hidden rounded-mac border border-border bg-background/50 shadow-mac-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-mac-2"
                  >
                    <Thumb src={project.image} title={project.title} />

                    <div className="flex flex-1 flex-col p-4">
                      <h2 className="text-[16px] font-semibold tracking-tight">{project.title}</h2>
                      <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tech?.slice(0, 4).map((tech: string, i: number) => (
                          <TechBadge key={`${tech}-${i}`} tech={tech} showName />
                        ))}
                      </div>

                      <div className="mt-auto flex items-center gap-2 pt-4">
                        {project.url && (
                          <Link href={project.url} target="_blank" className="mac-button gap-1.5">
                            <Github size={13} /> Code
                          </Link>
                        )}
                        {project.live && (
                          <Link href={project.live} target="_blank" className="mac-button mac-button-primary gap-1.5">
                            <ExternalLink size={13} /> Live
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ) : (
                  <motion.article
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-4 rounded-mac border border-border bg-background/50 p-3 shadow-mac-1 transition-colors hover:bg-background"
                  >
                    <Thumb src={project.image} title={project.title} compact />
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-[15px] font-semibold tracking-tight">{project.title}</h2>
                      <p className="truncate text-[12.5px] text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-2 sm:flex">
                      {project.url && (
                        <Link href={project.url} target="_blank" className="mac-button" aria-label="Code">
                          <Github size={13} />
                        </Link>
                      )}
                      {project.live && (
                        <Link href={project.live} target="_blank" className="mac-button mac-button-primary" aria-label="Live">
                          <ExternalLink size={13} />
                        </Link>
                      )}
                    </div>
                  </motion.article>
                )
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageWindow>
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
        compact
          ? "h-14 w-20 rounded-[8px] border border-border/70"
          : "aspect-[16/10] border-b border-border/70"
      )}
    >
      {show ? (
        <Image
          src={src}
          alt={title}
          fill
          unoptimized
          onError={() => setFailed(true)}
          className={cn("object-cover", !compact && "transition-transform duration-500 group-hover:scale-105")}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className={cn("font-semibold text-muted-foreground", compact ? "text-[15px]" : "text-[28px]")}>
            {title.slice(0, 2).toLowerCase()}
          </span>
        </div>
      )}
    </div>
  );
}
