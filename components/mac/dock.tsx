/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSound } from "@/components/sound-provider";
import { GithubIcon, LinkedinIcon, TwitterIcon, WorkIcon } from "./asset-icons";
import { TrophyGlyph } from "./glyphs";
import type { Tone } from "./app-icon";

type DockItem = {
  label: string;
  /** Real macOS-style app icon from public/mac-assets. */
  image?: string;
  /** Fallback: monochrome glyph on a tinted tile. */
  icon?: React.ReactNode;
  tone?: Tone;
  href?: string;
  external?: string;
  download?: boolean;
  /** Nothing to empty — shakes and buzzes instead. */
  refuse?: boolean;
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
  { label: "Home", image: "/mac-assets/images/finder.png", href: "/" },
  { label: "Projects", image: "/mac-assets/images/folder.png", href: "/projects" },
  { label: "Experience", icon: <WorkIcon size={19} />, tone: "indigo", href: "/experience" },
  { label: "Achievements", icon: <TrophyGlyph size={19} />, tone: "orange", href: "/achievements" },
  { label: "Blog", image: "/mac-assets/images/safari.png", href: "/blog" },
  { label: "Contact", image: "/mac-assets/images/contact.png", external: "mailto:gsomil93@gmail.com" },
  { label: "GitHub", icon: <GithubIcon size={19} />, tone: "graphite", external: "https://github.com/Somilg11" },
  { label: "LinkedIn", icon: <LinkedinIcon size={19} />, tone: "blue", external: "https://www.linkedin.com/in/somil-1101s/" },
  { label: "X", icon: <TwitterIcon size={17} />, tone: "graphite", external: "https://x.com/somil_1101" },
  { label: "Resume", image: "/mac-assets/images/pdf.png", download: true },
  { label: "Trash", image: "/mac-assets/images/trash-160.png", refuse: true },
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
        aria-label="Dock"
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
            separatorBefore={i === 6 || i === 10}
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
  const [shaking, setShaking] = useState(false);
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
    if (item.refuse) {
      play("error");
      setShaking(true);
      window.setTimeout(() => setShaking(false), 400);
      return;
    }

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
      style={item.image ? { width: size, height: size } : { width: size, height: size, borderRadius: radius }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={launch}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center text-white",
        !item.image && [
          "shadow-[0_1px_2px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-black/[0.06] dark:ring-white/[0.08]",
          item.tone && tones[item.tone],
          item.tone === "yellow" && "text-black/80",
        ],
        bouncing && "animate-dock-bounce",
        shaking && "mac-shake"
      )}
    >
      {item.image ? (
        <img
          src={item.image}
          alt=""
          width={58}
          height={58}
          draggable={false}
          decoding="async"
          className="h-full w-full select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.22)]"
        />
      ) : (
        item.icon
      )}

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
