"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { MacWindow } from "@/components/mac/window";
import { AssetIcon } from "@/components/mac/app-icon";
import { projectData } from "@/data/projectData";
import { useWindows } from "@/components/windows/window-manager";

export default function ProjectPoster() {
  const { open } = useWindows();
  const recent = [...projectData].reverse().slice(0, 3);

  return (
    <MacWindow title="Projects" onZoom={() => open("projects")} className="w-full" bodyClassName="p-2.5" delay={0.15}>
      <button
        type="button"
        data-sound="none"
        onClick={() => open("projects")}
        className="group flex w-full items-center gap-2.5 rounded-mac p-1.5 text-left transition-colors duration-150 hover:bg-foreground/[0.05]"
      >
        <AssetIcon src="/mac-assets/images/projects.png" size={40} />
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-medium leading-tight">Project Library</div>
          <div className="text-[11.5px] leading-tight text-muted-foreground">
            {projectData.length} items · web, AI, core
          </div>
        </div>
        <ArrowUpRight
          size={15}
          className="shrink-0 text-muted-foreground transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </button>

      <div className="mac-hairline my-2 h-px" />

      <ul className="space-y-0.5">
        {recent.map((project) => (
          <li key={project.title}>
            <button
              type="button"
              data-sound="tick"
              onClick={() => open("projects")}
              className="flex w-full items-center gap-2 rounded-[6px] px-1.5 py-1 text-left transition-colors duration-150 hover:bg-foreground/[0.05]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span className="truncate text-[12px]">{project.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </MacWindow>
  );
}
