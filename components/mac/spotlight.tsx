"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Volume2 } from "lucide-react";
import { ModeIcon, SearchIcon } from "./asset-icons";
import { AssetIcon } from "./app-icon";
import { FinderGlyph } from "./glyphs";
import { projectData } from "@/data/projectData";
import { useSound } from "@/components/sound-provider";
import { useWindows } from "@/components/windows/window-manager";
import { cn } from "@/lib/utils";

type Result = {
  id: string;
  label: string;
  hint: string;
  group: "Apps" | "Notes" | "Projects" | "Actions";
  icon: React.ReactNode;
  run: () => void;
};

/** ⌘K Spotlight: navigation, project lookup and system actions. */
export function Spotlight() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { open: openWindow, closeAll, posts, close: closeWindow, toggleMinimize, focused } = useWindows();
  const { setTheme, resolvedTheme } = useTheme();
  const { play, enabled: soundOn, setEnabled: setSoundOn } = useSound();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const results = useMemo<Result[]>(() => {
    const openApp = (id: Parameters<typeof openWindow>[0]) => () => {
      openWindow(id);
      close();
    };

    const pages: Result[] = [
      {
        id: "home",
        label: "Show Desktop",
        hint: "⌘1",
        group: "Apps",
        icon: <FinderGlyph size={16} />,
        run: () => {
          closeAll();
          close();
        },
      },
      { id: "projects", label: "Projects", hint: "⌘2", group: "Apps", icon: <AssetIcon src="/mac-assets/images/projects.png" size={17} />, run: openApp("projects") },
      { id: "experience", label: "Experience", hint: "⌘3", group: "Apps", icon: <AssetIcon src="/mac-assets/images/experience.png" size={17} />, run: openApp("experience") },
      { id: "achievements", label: "Achievements", hint: "⌘4", group: "Apps", icon: <AssetIcon src="/mac-assets/images/achievement.png" size={17} />, run: openApp("achievements") },
      { id: "blog", label: "Blog", hint: "⌘5", group: "Apps", icon: <AssetIcon src="/mac-assets/images/blog.png" size={17} />, run: openApp("blog") },
      { id: "shortcuts", label: "Keyboard Shortcuts", hint: "Help", group: "Apps", icon: <FinderGlyph size={16} />, run: openApp("shortcuts") },
    ];

    const projects: Result[] = projectData.map((project) => ({
      id: `project-${project.title}`,
      label: project.title,
      hint: "Project",
      group: "Projects",
      icon: <AssetIcon src="/mac-assets/images/projects.png" size={17} />,
      run: () => {
        play("swoosh");
        window.open(project.live || project.url, "_blank", "noopener,noreferrer");
        close();
      },
    }));

    const notes: Result[] = posts.map((post) => ({
      id: `post-${post.slug}`,
      label: post.title,
      hint: "Note",
      group: "Notes",
      icon: <AssetIcon src="/mac-assets/images/blog.png" size={17} />,
      run: openApp(`post:${post.slug}`),
    }));

    const actions: Result[] = [
      {
        id: "resume",
        label: "Download Resume",
        hint: "⌘S",
        group: "Actions",
        icon: <Download size={15} />,
        run: () => {
          const a = document.createElement("a");
          a.href = "/resume.pdf";
          a.download = "Somil_Gupta_Resume.pdf";
          a.click();
          play("success");
          close();
        },
      },
      {
        id: "mail",
        label: "Email Somil",
        hint: "gsomil93@gmail.com",
        group: "Actions",
        icon: <AssetIcon src="/mac-assets/images/mail.png" size={17} />,
        run: () => {
          window.location.href = "mailto:gsomil93@gmail.com";
          close();
        },
      },
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to Light Appearance" : "Switch to Dark Appearance",
        hint: "Appearance",
        group: "Actions",
        icon: <ModeIcon size={15} />,
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          play("toggle");
          close();
        },
      },
      {
        id: "sound",
        label: soundOn ? "Mute Interface Sounds" : "Enable Interface Sounds",
        hint: "Sound",
        group: "Actions",
        icon: <Volume2 size={15} />,
        run: () => {
          setSoundOn(!soundOn);
          close();
        },
      },
    ];

    const all = [...pages, ...notes, ...projects, ...actions];
    if (!query.trim()) return [...pages, ...actions];

    const q = query.toLowerCase();
    return all.filter((r) => r.label.toLowerCase().includes(q) || r.group.toLowerCase().includes(q));
  }, [query, play, close, resolvedTheme, setTheme, soundOn, setSoundOn, openWindow, closeAll, posts]);

  // Global shortcuts: ⌘K opens, ⌘1–5 navigate, ⌘S grabs the resume.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;

      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        play(open ? "close" : "open");
        setOpen((v) => !v);
        return;
      }

      if (meta && ["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        if (e.key === "1") {
          closeAll();
          return;
        }
        const apps = ["projects", "experience", "achievements", "blog"] as const;
        openWindow(apps[Number(e.key) - 2]);
        return;
      }

      if (meta && e.key.toLowerCase() === "w" && focused) {
        e.preventDefault();
        closeWindow(focused);
        return;
      }

      if (meta && e.key.toLowerCase() === "m" && focused) {
        e.preventDefault();
        toggleMinimize(focused);
        return;
      }

      if (meta && e.key.toLowerCase() === "h" && e.altKey) {
        e.preventDefault();
        closeAll();
        return;
      }

      if (meta && e.key.toLowerCase() === "s") {
        e.preventDefault();
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Somil_Gupta_Resume.pdf";
        a.click();
        play("success");
      }
    };

    const onSpotlight = () => {
      play("open");
      setOpen(true);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mac:spotlight", onSpotlight);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mac:spotlight", onSpotlight);
    };
  }, [open, play, openWindow, closeAll, closeWindow, toggleMinimize, focused]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      play("close");
      close();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      play("tick");
      setCursor((c) => Math.min(c + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      play("tick");
      setCursor((c) => Math.max(c - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      results[cursor]?.run();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => { play("close"); close(); }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/20 px-4 pt-[14vh] backdrop-blur-[2px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mac-vibrancy w-full max-w-[560px] overflow-hidden rounded-2xl shadow-mac-3"
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <SearchIcon size={18} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Spotlight Search"
                data-sound="none"
                className="w-full bg-transparent text-[19px] outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">
                esc
              </kbd>
            </div>

            {results.length > 0 && (
              <div className="mac-hairline h-px" />
            )}

            <div className="max-h-[52vh] overflow-y-auto p-1.5">
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-[13px] text-muted-foreground">No results</p>
              ) : (
                results.map((result, i) => {
                  const showGroup = result.group !== lastGroup;
                  lastGroup = result.group;

                  return (
                    <React.Fragment key={result.id}>
                      {showGroup && (
                        <div className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {result.group}
                        </div>
                      )}
                      <button
                        type="button"
                        data-sound="none"
                        onMouseEnter={() => setCursor(i)}
                        onClick={() => { play("click"); result.run(); }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-[7px] px-2.5 py-2 text-left text-[14px] transition-colors",
                          cursor === i ? "bg-primary text-primary-foreground" : "hover:bg-foreground/5"
                        )}
                      >
                        <span className={cursor === i ? "text-primary-foreground" : "text-muted-foreground"}>
                          {result.icon}
                        </span>
                        <span className="flex-1 truncate">{result.label}</span>
                        <span
                          className={cn(
                            "shrink-0 text-[11px]",
                            cursor === i ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}
                        >
                          {result.hint}
                        </span>
                      </button>
                    </React.Fragment>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
