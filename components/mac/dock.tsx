"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Briefcase, FileText, Folder, Home, Linkedin, Mail, Newspaper, Trophy } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { cn } from "@/lib/utils";
import { useSound } from "@/components/sound-provider";
import type { Tone } from "./app-icon";

type DockItem = {
  label: string;
  icon: React.ReactNode;
  tone: Tone;
  href?: string;
  external?: string;
  download?: boolean;
};

const tones: Record<Tone, string> = {
  blue: "bg-[#0a7cff] dark:bg-[#0a84ff]",
  indigo: "bg-[#5257d6] dark:bg-[#5e5ce6]",
  violet: "bg-[#7d47d6] dark:bg-[#8a5cf6]",
  pink: "bg-[#e0457b] dark:bg-[#ff375f]",
  red: "bg-[#e0342b] dark:bg-[#ff453a]",
  orange: "bg-[#e07c1f] dark:bg-[#ff9f0a]",
  yellow: "bg-[#d1a115] dark:bg-[#ffd60a]",
  green: "bg-[#1f9e4b] dark:bg-[#30d158]",
  teal: "bg-[#0f8f9e] dark:bg-[#40c8e0]",
  graphite: "bg-[#3a3a3c] dark:bg-[#48484a]",
};

const items: DockItem[] = [
  { label: "Home", icon: <Home size={18} />, tone: "blue", href: "/" },
  { label: "Projects", icon: <Folder size={18} />, tone: "teal", href: "/projects" },
  { label: "Experience", icon: <Briefcase size={18} />, tone: "orange", href: "/experience" },
  { label: "Achievements", icon: <Trophy size={18} />, tone: "yellow", href: "/achievements" },
  { label: "Blog", icon: <Newspaper size={18} />, tone: "violet", href: "/blog" },
  { label: "Mail", icon: <Mail size={18} />, tone: "indigo", external: "mailto:gsomil93@gmail.com" },
  { label: "GitHub", icon: <SiGithub size={17} />, tone: "graphite", external: "https://github.com/Somilg11" },
  { label: "LinkedIn", icon: <Linkedin size={18} />, tone: "blue", external: "https://www.linkedin.com/in/somil-1101s/" },
  { label: "X", icon: <SiX size={15} />, tone: "graphite", external: "https://x.com/somil_1101" },
  { label: "Resume", icon: <FileText size={18} />, tone: "red", download: true },
];

function useCompactDock() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px), (pointer: coarse)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return compact;
}

export function Dock() {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();
  const compact = useCompactDock();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-2">
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="mac-vibrancy pointer-events-auto flex max-w-[calc(100vw-1rem)] items-end gap-1 overflow-x-auto rounded-[18px] px-2 pb-1 pt-1.5 shadow-mac-2 scrollbar-none"
      >
        {items.map((item, i) => (
          <DockIcon
            key={item.label}
            item={item}
            mouseX={mouseX}
            compact={compact}
            active={!!item.href && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))}
            separatorBefore={i === 6}
          />
        ))}
      </motion.nav>
    </div>
  );
}

function DockIcon({
  item,
  mouseX,
  active,
  compact,
  separatorBefore,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  active: boolean;
  compact: boolean;
  separatorBefore?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const { play } = useSound();

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - bounds.x - bounds.width / 2;
  });

  const base = compact ? 36 : 38;
  const peak = compact ? 36 : 58;
  const sizeRaw = useTransform(distance, [-120, 0, 120], [base, peak, base]);
  const size = useSpring(sizeRaw, { mass: 0.08, stiffness: 190, damping: 15 });
  const radius = useTransform(size, (s) => s * 0.27);

  const launch = () => {
    play("pop");
    setBouncing(true);
    window.setTimeout(() => setBouncing(false), 700);
    if (item.download) {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "Somil_Gupta_Resume.pdf";
      a.click();
    }
  };

  const tile = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size, borderRadius: radius }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={launch}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center text-white",
        "shadow-[0_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-black/[0.06] dark:ring-white/[0.08]",
        tones[item.tone],
        item.tone === "yellow" && "text-black/80",
        bouncing && "animate-dock-bounce"
      )}
    >
      {item.icon}

      {active && (
        <span className="absolute -bottom-[6px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-foreground/55" />
      )}

      {hovered && !compact && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12 }}
          className="mac-vibrancy pointer-events-none absolute -top-8 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium text-foreground shadow-mac-1"
        >
          {item.label}
        </motion.span>
      )}
    </motion.div>
  );

  const wrapped = item.href ? (
    <Link href={item.href} aria-label={item.label} data-sound="none">
      {tile}
    </Link>
  ) : item.external ? (
    <a
      href={item.external}
      target={item.external.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={item.label}
      data-sound="none"
    >
      {tile}
    </a>
  ) : (
    <button type="button" aria-label={item.label} data-sound="none">
      {tile}
    </button>
  );

  return (
    <>
      {separatorBefore && <div className="mx-0.5 h-8 w-px self-center bg-foreground/12" />}
      {wrapped}
    </>
  );
}
