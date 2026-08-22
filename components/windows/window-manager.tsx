"use client";

import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Post } from "@/lib/posts";
import { useSound } from "@/components/sound-provider";
import {
  pathForWindow,
  windowForPath,
  type WindowId,
  type WindowState,
  type WindowsContextValue,
} from "./types";

const WindowsContext = createContext<WindowsContextValue | null>(null);

export function useWindows() {
  const ctx = useContext(WindowsContext);
  if (!ctx) throw new Error("useWindows must be used inside <WindowProvider>");
  return ctx;
}

const MENU_BAR = 28;
const DOCK = 76;

/** Default geometry per app, cascaded so stacked windows stay reachable. */
function defaultRect(id: WindowId, index: number) {
  const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
  const vh = typeof window === "undefined" ? 900 : window.innerHeight;
  const compact = vw < 820;

  const sizes: Record<string, { w: number; h: number }> = {
    projects: { w: 1000, h: 660 },
    experience: { w: 900, h: 600 },
    achievements: { w: 900, h: 620 },
    blog: { w: 820, h: 580 },
    shortcuts: { w: 460, h: 430 },
  };
  const preset = id.startsWith("post:") ? { w: 800, h: 640 } : sizes[id] ?? { w: 860, h: 600 };

  if (compact) {
    // Phones: near-fullscreen sheets, no cascade.
    return { x: 8, y: MENU_BAR + 8, w: vw - 16, h: vh - MENU_BAR - DOCK - 16 };
  }

  const w = Math.min(preset.w, vw - 80);
  const h = Math.min(preset.h, vh - MENU_BAR - DOCK - 40);
  const offset = (index % 5) * 28;

  return {
    x: Math.max(24, Math.round((vw - w) / 2) + offset - 56),
    y: Math.max(MENU_BAR + 12, Math.round((vh - DOCK - h) / 2) + offset - 40),
    w,
    h,
  };
}

function titleFor(id: WindowId, posts: Post[]): { title: string; subtitle?: string } {
  if (id.startsWith("post:")) {
    const post = posts.find((p) => p.slug === id.slice(5));
    return { title: post?.title ?? "Note", subtitle: "Blog" };
  }
  switch (id) {
    case "projects":
      return { title: "Projects", subtitle: "Finder" };
    case "experience":
      return { title: "Experience", subtitle: "3 roles" };
    case "achievements":
      return { title: "Achievements", subtitle: "wins & finals" };
    case "blog":
      return { title: "Blog", subtitle: "notes" };
    case "shortcuts":
      return { title: "Keyboard Shortcuts" };
    default:
      return { title: "Window" };
  }
}

export function WindowProvider({ posts, children }: { posts: Post[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const { play } = useSound();

  // Seed from the URL so deep links render their window server-side.
  const [windows, setWindows] = useState<WindowState[]>(() => {
    const id = windowForPath(pathname ?? "/");
    if (!id) return [];
    const meta = titleFor(id, posts);
    return [{ id, ...meta, ...defaultRect(id, 0), z: 1, minimized: false, maximized: false }];
  });
  const [counter, setCounter] = useState(2);

  const focused = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((top, w) => (w.z > top.z ? w : top)).id;
  }, [windows]);

  const syncUrl = useCallback((id: WindowId | null) => {
    if (typeof window === "undefined") return;
    const next = id ? pathForWindow(id) : "/";
    if (window.location.pathname !== next) window.history.pushState(null, "", next);
  }, []);

  const focus = useCallback((id: WindowId) => {
    setCounter((c) => c + 1);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: counter, minimized: false } : w)));
    syncUrl(id);
  }, [counter, syncUrl]);

  const open = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          return prev.map((w) => (w.id === id ? { ...w, minimized: false, z: counter } : w));
        }
        const meta = titleFor(id, posts);
        return [
          ...prev,
          { id, ...meta, ...defaultRect(id, prev.length), z: counter, minimized: false, maximized: false },
        ];
      });
      setCounter((c) => c + 1);
      play("open");
      syncUrl(id);
    },
    [counter, play, posts, syncUrl]
  );

  const close = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const next = prev.filter((w) => w.id !== id);
        const top = next.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
        syncUrl(top?.id ?? null);
        return next;
      });
      play("close");
    },
    [play, syncUrl]
  );

  const closeAll = useCallback(() => {
    setWindows([]);
    syncUrl(null);
    play("close");
  }, [play, syncUrl]);

  const toggleMinimize = useCallback(
    (id: WindowId) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          const minimized = !w.minimized;
          return { ...w, minimized, z: minimized ? w.z : counter };
        })
      );
      setCounter((c) => c + 1);
    },
    [counter]
  );

  const minimizeAll = useCallback(() => {
    setWindows((prev) => prev.map((w) => ({ ...w, minimized: true })));
    play("close");
  }, [play]);

  const toggleMaximize = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.restore) return { ...w, ...w.restore, maximized: false, restore: undefined };
        return {
          ...w,
          restore: { x: w.x, y: w.y, w: w.w, h: w.h },
          x: 12,
          y: MENU_BAR + 8,
          w: window.innerWidth - 24,
          h: window.innerHeight - MENU_BAR - DOCK - 16,
          maximized: true,
        };
      })
    );
  }, []);

  const move = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resize = useCallback((id: WindowId, w: number, h: number) => {
    setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, w, h } : win)));
  }, []);

  const isOpen = useCallback((id: WindowId) => windows.some((w) => w.id === id), [windows]);

  // Windows seeded during SSR were sized against a guessed viewport; re-measure
  // once on the client so phones get sheet-sized windows.
  useEffect(() => {
    setWindows((prev) => prev.map((w, i) => ({ ...w, ...defaultRect(w.id, i) })));
  }, []);

  // Back/forward should open and close windows like navigation would.
  useEffect(() => {
    const onPop = () => {
      const id = windowForPath(window.location.pathname);
      if (!id) {
        setWindows([]);
        return;
      }
      setWindows((prev) => {
        if (prev.some((w) => w.id === id)) {
          return prev.map((w) => (w.id === id ? { ...w, minimized: false, z: 999 } : w));
        }
        const meta = titleFor(id, posts);
        return [...prev, { id, ...meta, ...defaultRect(id, prev.length), z: 999, minimized: false, maximized: false }];
      });
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [posts]);

  // Keep windows usable as the viewport changes: re-layout when crossing the
  // phone breakpoint, otherwise just clamp them back on screen.
  useEffect(() => {
    let compact = window.innerWidth < 820;

    const onResize = () => {
      const nowCompact = window.innerWidth < 820;
      const crossed = nowCompact !== compact;
      compact = nowCompact;

      setWindows((prev) =>
        prev.map((w, i) =>
          crossed
            ? { ...w, ...defaultRect(w.id, i), maximized: false, restore: undefined }
            : {
                ...w,
                w: Math.min(w.w, window.innerWidth - 24),
                h: Math.min(w.h, window.innerHeight - MENU_BAR - DOCK),
                x: Math.min(Math.max(w.x, -w.w + 120), window.innerWidth - 120),
                y: Math.min(Math.max(w.y, MENU_BAR), window.innerHeight - 80),
              }
        )
      );
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const value: WindowsContextValue = {
    windows,
    posts,
    open,
    close,
    closeAll,
    focus,
    toggleMinimize,
    minimizeAll,
    toggleMaximize,
    isOpen,
    focused,
    move,
    resize,
  };

  return <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>;
}
