"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TrafficLightsProps = {
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
  minimized?: boolean;
  className?: string;
};

/** The three macOS window buttons. Glyphs only show while the group is hovered. */
export function TrafficLights({ onClose, onMinimize, onZoom, minimized, className }: TrafficLightsProps) {
  const base =
    "group/light relative h-3 w-3 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-transform duration-150 active:scale-90";

  return (
    <div className={cn("mac-lights flex items-center gap-[6px]", className)}>
      <button
        type="button"
        aria-label="Close"
        data-sound="error"
        onClick={onClose}
        className={cn(base, "bg-traffic-close")}
      >
        <Glyph>
          <path d="M2 2l4 4M6 2L2 6" />
        </Glyph>
      </button>
      <button
        type="button"
        aria-label={minimized ? "Restore" : "Minimize"}
        data-sound={minimized ? "open" : "close"}
        onClick={onMinimize}
        className={cn(base, "bg-traffic-min")}
      >
        <Glyph>
          <path d="M1.6 4h4.8" />
        </Glyph>
      </button>
      <button
        type="button"
        aria-label="Zoom"
        data-sound="open"
        onClick={onZoom}
        className={cn(base, "bg-traffic-zoom")}
      >
        <Glyph>
          <path d="M2.4 5.6V2.4h3.2M5.6 2.4L2.4 5.6" />
        </Glyph>
      </button>
    </div>
  );
}

function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="mac-light-glyph h-2 w-2 text-black/55"
      viewBox="0 0 8 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      {children}
    </svg>
  );
}
