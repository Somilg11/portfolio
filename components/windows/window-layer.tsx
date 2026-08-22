"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { Check, Github } from "lucide-react";
import { ShareIcon } from "@/components/mac/asset-icons";
import { AppWindow } from "./app-window";
import { useWindows } from "./window-manager";
import type { WindowState } from "./types";
// Each app is its own chunk: the desktop ships none of them until a window
// opens, and a deep link still server-renders the one it needs.
const ProjectsApp = dynamic(() => import("@/components/apps/projects-app").then((m) => m.ProjectsApp));
const ExperienceApp = dynamic(() => import("@/components/apps/experience-app").then((m) => m.ExperienceApp));
const AchievementsApp = dynamic(() => import("@/components/apps/achievements-app").then((m) => m.AchievementsApp));
const BlogApp = dynamic(() => import("@/components/apps/blog-app").then((m) => m.BlogApp));
const PostApp = dynamic(() => import("@/components/apps/post-app").then((m) => m.PostApp));
const ShortcutsApp = dynamic(() => import("@/components/apps/shortcuts-app").then((m) => m.ShortcutsApp));
import { useSound } from "@/components/sound-provider";

/** Renders every open window above the desktop. */
export function WindowLayer() {
  const { windows } = useWindows();

  return (
    <AnimatePresence>
      {windows.map((state) => (
        <AppWindow key={state.id} state={state} toolbar={<Toolbar state={state} />}>
          <WindowContent state={state} />
        </AppWindow>
      ))}
    </AnimatePresence>
  );
}

function WindowContent({ state }: { state: WindowState }) {
  if (state.id.startsWith("post:")) return <PostApp slug={state.id.slice(5)} />;

  switch (state.id) {
    case "projects":
      return <ProjectsApp />;
    case "experience":
      return <ExperienceApp />;
    case "achievements":
      return <AchievementsApp />;
    case "blog":
      return <BlogApp />;
    case "shortcuts":
      return <ShortcutsApp />;
    default:
      return null;
  }
}

function Toolbar({ state }: { state: WindowState }) {
  const { play } = useSound();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  if (state.id.startsWith("post:")) {
    return (
      <button
        type="button"
        data-sound="none"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(`${window.location.origin}/blog/${state.id.slice(5)}`);
            play("success");
            setCopied(true);
          } catch {
            play("error");
          }
        }}
        className="mac-button gap-1.5"
      >
        {copied ? <Check size={13} className="text-emerald-500" /> : <ShareIcon size={13} />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
      </button>
    );
  }

  if (state.id === "projects") {
    return (
      <a
        href="https://github.com/Somilg11?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="mac-button gap-1.5"
      >
        <Github size={13} />
        <span className="hidden sm:inline">All repos</span>
      </a>
    );
  }

  return null;
}
