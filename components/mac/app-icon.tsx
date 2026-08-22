"use client";

import React from "react";
import { cn } from "@/lib/utils";

/** Flat system tints — one solid colour per app, tuned per appearance. */
export type Tone =
  | "blue"
  | "indigo"
  | "violet"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "graphite";

const tones: Record<Tone, string> = {
  blue: "bg-[#0a7cff] dark:bg-[#0a84ff]",
  indigo: "bg-[#5257d6] dark:bg-[#5e5ce6]",
  violet: "bg-[#7d47d6] dark:bg-[#8a5cf6]",
  pink: "bg-[#e0457b] dark:bg-[#ff375f]",
  red: "bg-[#e0342b] dark:bg-[#ff453a]",
  orange: "bg-[#e07c1f] dark:bg-[#ff9f0a]",
  yellow: "bg-[#d1a115] dark:bg-[#ffd60a] dark:text-black/80",
  green: "bg-[#1f9e4b] dark:bg-[#30d158]",
  teal: "bg-[#0f8f9e] dark:bg-[#40c8e0]",
  graphite: "bg-[#3a3a3c] dark:bg-[#48484a]",
};

const sizes = {
  xs: "h-7 w-7 rounded-[8px] text-[13px]",
  sm: "h-8 w-8 rounded-[9px] text-[14px]",
  md: "h-9 w-9 rounded-[10px] text-[15px]",
  lg: "h-11 w-11 rounded-[12px] text-[17px]",
};

type AppIconProps = {
  tone: Tone;
  size?: keyof typeof sizes;
  children: React.ReactNode;
  className?: string;
};

/** Real macOS-style app icon from public/mac-assets. */
export function AssetIcon({
  src,
  size = 36,
  className,
  alt = "",
}: {
  src: string;
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      draggable={false}
      decoding="async"
      style={{ width: size, height: size }}
      // Squircle-ish corners so square artwork sits with the system icons.
      className={cn(
        "shrink-0 select-none rounded-[22.5%] object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]",
        className
      )}
    />
  );
}

/** Solid, flat app icon — no gradients, no gloss. */
export function AppIcon({ tone, size = "md", children, className }: AppIconProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center text-white shadow-[0_1px_2px_rgba(0,0,0,0.18)]",
        "ring-1 ring-inset ring-black/[0.06] dark:ring-white/[0.08]",
        tones[tone],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
