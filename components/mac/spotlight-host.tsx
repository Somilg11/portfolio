"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useSound } from "@/components/sound-provider";
import { useWindows } from "@/components/windows/window-manager";

// The palette itself (and the project index it searches) only loads once
// someone actually reaches for it.
const SpotlightPalette = dynamic(() => import("./spotlight").then((m) => m.SpotlightPalette), { ssr: false });

/**
 * Owns the global shortcuts. Everything here is cheap; the heavy palette is
 * mounted lazily the first time it is opened.
 */
export function Spotlight() {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const { play } = useSound();
  const { open: openWindow, closeAll, close: closeWindow, toggleMinimize, focused } = useWindows();
  const { setTheme, resolvedTheme } = useTheme();

  const show = useCallback(() => {
    play("open");
    setLoaded(true);
    setOpen(true);
  }, [play]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;

      const key = e.key.toLowerCase();

      if (key === "k") {
        e.preventDefault();
        show();
        return;
      }

      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        if (e.key === "1") {
          closeAll();
          return;
        }
        const apps = ["projects", "experience", "achievements", "blog"] as const;
        openWindow(apps[Number(e.key) - 2]);
        return;
      }

      if (key === "w" && focused) {
        e.preventDefault();
        closeWindow(focused);
        return;
      }

      if (key === "m" && focused) {
        e.preventDefault();
        toggleMinimize(focused);
        return;
      }

      if (key === "h" && e.altKey) {
        e.preventDefault();
        closeAll();
        return;
      }

      if (key === "s") {
        e.preventDefault();
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Somil_Gupta_Resume.pdf";
        a.click();
        play("success");
        return;
      }

      if (key === "p") {
        e.preventDefault();
        window.print();
      }

      if (key === "d" && e.shiftKey) {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        play("toggle");
      }
    };

    const onSpotlight = () => show();

    window.addEventListener("keydown", onKey);
    window.addEventListener("mac:spotlight", onSpotlight);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mac:spotlight", onSpotlight);
    };
  }, [show, openWindow, closeAll, closeWindow, toggleMinimize, focused, play, setTheme, resolvedTheme]);

  if (!loaded) return null;
  return <SpotlightPalette open={open} onOpenChange={setOpen} />;
}
