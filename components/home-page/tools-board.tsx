/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { GitBranch } from "lucide-react";
import { SiClaudecode, SiDiscord, SiGithub, SiNotion, SiOpencode, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { MacWindow } from "@/components/mac/window";
import DotField from "@/components/home-page/dot-field";
import { AppIcon, AssetIcon, type Tone } from "@/components/mac/app-icon";
import { projectData } from "@/data/projectData";
import { useWindows } from "@/components/windows/window-manager";
import type { WindowId } from "@/components/windows/types";

type RailItem = { label: string; icon: React.ReactNode; link: string; tone: Tone };

const rail: RailItem[] = [
  { label: "VS Code", icon: <VscVscode size={17} />, link: "https://code.visualstudio.com/", tone: "blue" },
  { label: "Claude Code", icon: <SiClaudecode size={16} />, link: "https://claude.ai", tone: "orange" },
  { label: "Opencode", icon: <SiOpencode size={16} />, link: "https://www.opencode.ai", tone: "green" },
  { label: "Notion", icon: <SiNotion size={16} />, link: "https://www.notion.so/", tone: "graphite" },
  { label: "Postman", icon: <SiPostman size={16} />, link: "https://www.postman.com/", tone: "red" },
  { label: "GitHub", icon: <SiGithub size={16} />, link: "https://github.com/Somilg11", tone: "graphite" },
  { label: "Discord", icon: <SiDiscord size={16} />, link: "https://discord.com/", tone: "indigo" },
];

const stats = [
  { label: "Projects", value: String(projectData.length) },
  { label: "Commits / yr", value: "779" },
  { label: "Hackathons", value: "6+" },
  { label: "Internships", value: "2" },
];

// One fixed chart colour, inverted in dark mode — a theme-dependent URL made
// the browser fetch the graph twice (once per theme) on every load.
const CHART_SRC = "https://ghchart.rshah.org/0a7cff/Somilg11";

export default function ToolsBoard() {

  return (
    <MacWindow title="Desk" className="h-full" bodyClassName="p-0" delay={0.2}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col sm:flex-row">
        {/* App rail */}
        <aside className="mac-sidebar shrink-0 border-b border-border/70 p-1.5 sm:w-[52px] sm:border-b-0 sm:border-r">
          <div className="flex flex-row gap-1.5 overflow-x-auto scrollbar-none sm:flex-col sm:overflow-visible">
            {rail.map((item) => (
              <a
                key={item.label}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                title={item.label}
                className="transition-transform duration-150 ease-mac-spring hover:-translate-y-0.5 active:scale-95"
              >
                <AppIcon tone={item.tone} size="sm">
                  {item.icon}
                </AppIcon>
              </a>
            ))}
          </div>
        </aside>

        {/* Widgets */}
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-2.5 scrollbar-none sm:p-3">
          <div className="grid min-w-0 grid-cols-2 gap-2.5">
            {/* Pixel field */}
            <div className="col-span-2 overflow-hidden rounded-mac border border-border bg-background/40">
              <DotField className="block h-[66px] w-full sm:h-[76px]" />
            </div>

            {/* Stats strip */}
            <Card className="col-span-2">
              <div className="grid grid-cols-4 divide-x divide-border/70">
                {stats.map((stat) => (
                  <div key={stat.label} className="px-1 text-center first:pl-0 last:pr-0">
                    <div className="text-[17px] font-semibold tabular-nums leading-none tracking-tight">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] leading-none text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            <NavCard window="blog" image="/mac-assets/images/blog.png" title="Blog" caption="notes & deep dives" />
            <NavCard window="experience" image="/mac-assets/images/experience.png" title="Experience" caption="2023 — present" />
            <NavCard window="achievements" image="/mac-assets/images/achievement.png" title="Achievements" caption="wins & finals" />

            <Card
              as="button"
              onClick={() => {
                const a = document.createElement("a");
                a.href = "/resume.pdf";
                a.download = "Somil_Gupta_Resume.pdf";
                a.click();
              }}
              sound="success"
            >
              <Row image="/mac-assets/images/pdf.png" title="Resume" caption="download PDF" />
            </Card>

            {/* Contributions */}
            <Card className="col-span-2">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  <GitBranch size={11} /> Contributions
                </span>
                <span className="text-[10px] text-muted-foreground">last 12 months</span>
              </div>
              <div className="min-w-0 overflow-hidden">
                <img
                  src={CHART_SRC}
                  alt="GitHub contribution graph for Somilg11"
                  width={720}
                  height={110}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none h-auto max-h-[76px] w-full min-w-0 object-contain dark:invert dark:hue-rotate-180"
                />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </MacWindow>
  );
}

function Row({
  tone,
  icon,
  image,
  title,
  caption,
}: {
  tone?: Tone;
  icon?: React.ReactNode;
  image?: string;
  title: string;
  caption: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-left">
      {image ? (
        <AssetIcon src={image} size={32} />
      ) : (
        <AppIcon tone={tone ?? "graphite"} size="sm">
          {icon}
        </AppIcon>
      )}
      <div className="min-w-0">
        <div className="truncate text-[13.5px] font-medium leading-tight">{title}</div>
        <div className="truncate text-[11.5px] leading-tight text-muted-foreground">{caption}</div>
      </div>
    </div>
  );
}

function NavCard({
  window: windowId,
  tone,
  icon,
  image,
  title,
  caption,
}: {
  window: WindowId;
  tone?: Tone;
  icon?: React.ReactNode;
  image?: string;
  title: string;
  caption: string;
}) {
  const { open } = useWindows();

  return (
    <button
      type="button"
      data-sound="none"
      onClick={() => open(windowId)}
      className="min-w-0 rounded-mac border border-border bg-background/40 p-2.5 text-left transition-colors duration-150 hover:bg-foreground/[0.04] active:scale-[0.99]"
    >
      <Row tone={tone} icon={icon} image={image} title={title} caption={caption} />
    </button>
  );
}

function Card({
  children,
  className = "",
  as = "div",
  onClick,
  sound,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "button";
  onClick?: () => void;
  sound?: string;
}) {
  const base = `min-w-0 rounded-mac border border-border bg-background/40 p-2.5 ${className}`;

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        data-sound={sound}
        className={`${base} w-full text-left transition-colors duration-150 hover:bg-foreground/[0.04] active:scale-[0.99]`}
      >
        {children}
      </button>
    );
  }
  return <div className={base}>{children}</div>;
}
