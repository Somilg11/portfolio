"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { BatteryMedium, Check, Command, Volume2, VolumeX } from "lucide-react";
import { ModeIcon, SearchIcon, WifiIcon } from "./asset-icons";
import { SiApple } from "react-icons/si";
import { cn } from "@/lib/utils";
import { useSound } from "@/components/sound-provider";
import { AboutDialog } from "./about-dialog";

type Item =
  | { type: "item"; label: string; shortcut?: string; onSelect: () => void; checked?: boolean; disabled?: boolean }
  | { type: "separator" };

export function MenuBar() {
  const [open, setOpen] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { enabled: soundOn, setEnabled: setSoundOn, play } = useSound();

  useEffect(() => {
    setTime(new Date());
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const go = (href: string) => {
    play("swoosh");
    router.push(href);
    setOpen(null);
  };

  const external = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(null);
  };

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      play("success");
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      play("error");
    }
    setOpen(null);
  };

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Somil_Gupta_Resume.pdf";
    a.click();
    play("success");
    setOpen(null);
  };

  const menus: { label: string; bold?: boolean; icon?: React.ReactNode; items: Item[]; hideOnMobile?: boolean }[] = [
    {
      label: "Somil",
      bold: true,
      items: [
        { type: "item", label: "Home", shortcut: "⌘1", onSelect: () => go("/") },
        { type: "item", label: "Projects", shortcut: "⌘2", onSelect: () => go("/projects") },
        { type: "item", label: "Experience", shortcut: "⌘3", onSelect: () => go("/experience") },
        { type: "item", label: "Achievements", shortcut: "⌘4", onSelect: () => go("/achievements") },
        { type: "item", label: "Blog", shortcut: "⌘5", onSelect: () => go("/blog") },
      ],
    },
    {
      label: "File",
      items: [
        { type: "item", label: "New Message…", shortcut: "⌘N", onSelect: () => external("mailto:gsomil93@gmail.com") },
        { type: "item", label: "Download Resume", shortcut: "⌘S", onSelect: downloadResume },
        { type: "separator" },
        { type: "item", label: "Open GitHub", onSelect: () => external("https://github.com/Somilg11") },
        { type: "item", label: "Open Codolio", onSelect: () => external("https://codolio.com/profile/strangecodes") },
        { type: "separator" },
        { type: "item", label: "Copy Page Link", onSelect: () => copy(window.location.href, "Link") },
      ],
    },
    {
      label: "View",
      items: [
        { type: "item", label: "Light Appearance", checked: theme === "light", onSelect: () => { setTheme("light"); setOpen(null); } },
        { type: "item", label: "Dark Appearance", checked: theme === "dark", onSelect: () => { setTheme("dark"); setOpen(null); } },
        { type: "item", label: "Match System", checked: theme === "system", onSelect: () => { setTheme("system"); setOpen(null); } },
        { type: "separator" },
        { type: "item", label: "Interface Sounds", checked: soundOn, onSelect: () => { setSoundOn(!soundOn); setOpen(null); } },
        { type: "separator" },
        { type: "item", label: "System Specs…", onSelect: () => { setAboutOpen(true); setOpen(null); } },
      ],
    },
    {
      label: "Help",
      items: [
        { type: "item", label: "Email — gsomil93@gmail.com", onSelect: () => external("mailto:gsomil93@gmail.com") },
        { type: "item", label: "GitHub — @Somilg11", onSelect: () => external("https://github.com/Somilg11") },
        { type: "item", label: "LinkedIn — somil-1101s", onSelect: () => external("https://www.linkedin.com/in/somil-1101s/") },
        { type: "item", label: "X — @somil_1101", onSelect: () => external("https://x.com/somil_1101") },
        { type: "item", label: "Discord — kakashi_11_", onSelect: () => external("https://discord.com/kakashi_11_") },
        { type: "separator" },
        { type: "item", label: "Copy Email Address", onSelect: () => copy("gsomil93@gmail.com", "Email") },
        { type: "item", label: "Send Feedback…", onSelect: () => external("mailto:gsomil93@gmail.com?subject=Portfolio%20feedback") },
      ],
    },
  ];

  const clockDate = time ? time.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "";
  const clockTime = time ? time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }) : "";

  return (
    <>
      <div
        ref={barRef}
        className="mac-vibrancy fixed inset-x-0 top-0 z-50 flex h-7 items-center gap-0.5 overflow-x-auto border-x-0 border-t-0 px-2 text-[13px] text-foreground/85 scrollbar-none"
      >
        <button
          type="button"
          data-sound="open"
          aria-label="System specs"
          title="System specs"
          onClick={() => { play("open"); setOpen(null); setAboutOpen(true); }}
          className="rounded-[5px] px-2 py-[3px] leading-none transition-colors hover:bg-foreground/10"
        >
          <SiApple size={14} />
        </button>

        {menus.map((menu) => (
          <div key={menu.label} className={cn("relative", menu.hideOnMobile && "hidden sm:block")}>
            <button
              type="button"
              data-sound="none"
              onClick={() => { play(open === menu.label ? "close" : "open"); setOpen(open === menu.label ? null : menu.label); }}
              onMouseEnter={() => { if (open && open !== menu.label) { play("tick"); setOpen(menu.label); } }}
              className={cn(
                "rounded-[5px] px-2 py-[3px] leading-none transition-colors",
                menu.bold && "font-semibold",
                open === menu.label ? "bg-primary text-primary-foreground" : "hover:bg-foreground/10"
              )}
            >
              {menu.icon ?? menu.label}
            </button>

            <AnimatePresence>
              {open === menu.label && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.13, ease: [0.32, 0.72, 0, 1] }}
                  className="mac-vibrancy absolute left-0 top-[calc(100%+4px)] min-w-[230px] origin-top-left rounded-mac p-1 shadow-mac-3"
                >
                  {menu.items.map((item, i) =>
                    item.type === "separator" ? (
                      <div key={i} className="mac-hairline my-1 h-px" />
                    ) : (
                      <button
                        key={i}
                        type="button"
                        data-sound="none"
                        onClick={() => { play("click"); item.onSelect(); }}
                        className="group flex w-full items-center gap-2 rounded-[5px] px-2 py-[5px] text-left text-[13px] transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <span className="w-3 shrink-0">
                          {item.checked && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        {item.shortcut && (
                          <span className="text-[12px] text-muted-foreground group-hover:text-primary-foreground/70">
                            {item.shortcut}
                          </span>
                        )}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Right status cluster */}
        <div className="ml-auto flex items-center gap-2.5 pr-1 text-foreground/70">
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary"
              >
                {copied} copied
              </motion.span>
            )}
          </AnimatePresence>

          <button
            type="button"
            data-sound="none"
            aria-label={soundOn ? "Mute interface sounds" : "Enable interface sounds"}
            title={soundOn ? "Interface sounds: on" : "Interface sounds: off"}
            onClick={() => setSoundOn(!soundOn)}
            className="rounded-[5px] p-1 transition-colors hover:bg-foreground/10"
          >
            {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          <ThemeSwitch />

          <BatteryMedium size={16} className="hidden sm:block" />
          <WifiIcon size={15} className="hidden sm:block" />
          <button
            type="button"
            data-sound="open"
            aria-label="Spotlight search"
            title="Spotlight (⌘K)"
            onClick={() => window.dispatchEvent(new CustomEvent("mac:spotlight"))}
            className="rounded-[5px] p-1 transition-colors hover:bg-foreground/10"
          >
            <SearchIcon size={14} />
          </button>
          <Command size={13} className="hidden sm:block" />

          <span suppressHydrationWarning className="flex items-center gap-1.5 tabular-nums text-[12px] font-medium text-foreground/80">
            <span className="hidden md:inline">{clockDate}</span>
            <span>{clockTime}</span>
          </span>
        </div>
      </div>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  );
}

function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      data-sound="toggle"
      aria-label="Toggle appearance"
      title={`Appearance: ${theme ?? "system"}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-[5px] p-1 transition-colors hover:bg-foreground/10"
    >
      <motion.span
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
        className={isDark ? "block" : "block rotate-180"}
      >
        <ModeIcon size={14} />
      </motion.span>
    </button>
  );
}
