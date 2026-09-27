"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ExternalLink, Github } from "lucide-react";
import { categoryLabels, getProject } from "@/data/projects";
import { TechBadge } from "@/components/tech-badge";
import { cn } from "@/lib/utils";

/** Detail window for one project: screenshots, summary and explaining cards. */
export function ProjectApp({ slug }: { slug: string }) {
  const project = getProject(slug);
  const shots = project ? project.gallery ?? [{ src: project.cover, caption: project.title }] : [];
  const [active, setActive] = useState(0);

  if (!project) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1 p-8 text-center">
        <p className="text-[15px] font-semibold">Project not found</p>
        <p className="text-[12.5px] text-muted-foreground">It may have been renamed or removed.</p>
      </div>
    );
  }

  const current = shots[active] ?? shots[0];

  return (
    <article className="mx-auto max-w-[760px] px-4 py-5 sm:px-7 sm:py-7">
      {/* Title and links */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>{project.year}</span>
            {project.categories.map((cat) => (
              <span key={cat} className="mac-pill">
                {categoryLabels[cat]}
              </span>
            ))}
          </div>
          <h1 className="mt-1.5 text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">
            {project.title}
          </h1>
          <p className="mt-1 text-[14px] text-muted-foreground">{project.tagline}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="mac-button gap-1.5">
            <Github size={13} /> Code
          </a>
          {project.docs && (
            <a href={project.docs} target="_blank" rel="noopener noreferrer" className="mac-button gap-1.5">
              <BookOpen size={13} /> Docs
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
      </header>

      {/* Screenshot viewer */}
      <div className="mt-5 relative aspect-[16/10] overflow-hidden rounded-mac border border-border bg-muted/60 shadow-mac-1">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={`${project.title}: ${current.caption}`}
              fill
              priority={active === 0}
              sizes="(max-width: 820px) 100vw, 760px"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {shots.length > 1 && (
        <div className="mt-2.5 flex gap-2 overflow-x-auto scrollbar-none">
          {shots.map((item, i) => (
            <button
              key={item.src}
              type="button"
              data-sound="tick"
              onClick={() => setActive(i)}
              aria-label={`Show ${item.caption}`}
              aria-pressed={i === active}
              className={cn(
                "group shrink-0 text-left",
                i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "relative block h-[54px] w-[86px] overflow-hidden rounded-[7px] border transition-colors",
                  i === active ? "border-primary ring-2 ring-primary/25" : "border-border"
                )}
              >
                <Image src={item.src} alt="" fill sizes="86px" className="object-cover object-top" />
              </span>
              <span className="mt-1 block max-w-[86px] truncate text-[10.5px]">{item.caption}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mac-hairline my-5 h-px" />

      <p className="text-[14.5px] leading-relaxed text-foreground/85">{project.summary}</p>

      {/* Explaining cards */}
      <section className="mt-7">
        <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          How it works
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {project.highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="rounded-mac border border-border bg-background/50 p-4"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono-sf text-[10.5px] font-semibold text-primary">
                  {i + 1}
                </span>
                <h3 className="text-[13.5px] font-semibold tracking-tight">{item.title}</h3>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Built with
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <TechBadge key={tech} tech={tech} showName />
          ))}
        </div>
      </section>
    </article>
  );
}
