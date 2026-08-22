"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrafficLights } from "./traffic-lights";
import { useSound } from "@/components/sound-provider";

type MacWindowProps = {
  /** Text in the centre of the title bar. */
  title?: string;
  /** Small icon rendered next to the traffic lights. */
  icon?: React.ReactNode;
  /** Right-hand toolbar content. */
  toolbar?: React.ReactNode;
  /** What the green zoom button does — usually opens the matching app window. */
  onZoom?: () => void;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Stagger for the open animation. */
  delay?: number;
  /** Translucent material instead of an opaque window. */
  vibrancy?: boolean;
  /** Hide the title bar entirely. */
  chromeless?: boolean;
};

export function MacWindow({
  title,
  icon,
  toolbar,
  onZoom,
  children,
  className,
  bodyClassName,
  delay = 0,
  vibrancy = false,
  chromeless = false,
}: MacWindowProps) {
  const [minimized, setMinimized] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [contentHeight, setContentHeight] = useState<number>();
  const contentRef = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  // Track the body's natural height so the collapse has a target to animate to.
  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const measure = () => setContentHeight(node.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleClose = () => {
    // Nothing to close on a portfolio — refuse with a shake, like a modal sheet.
    setShaking(true);
    window.setTimeout(() => setShaking(false), 400);
  };

  const handleZoom = () => {
    if (onZoom) {
      onZoom();
    } else {
      play("pop");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "group/window flex flex-col overflow-hidden rounded-window",
        vibrancy ? "mac-vibrancy shadow-mac-2" : "mac-window",
        "transition-shadow duration-300 hover:shadow-mac-3",
        shaking && "mac-shake",
        className
      )}
    >
      {!chromeless && (
        <header
          className={cn(
            "mac-titlebar relative flex h-8 shrink-0 items-center gap-2 px-2.5 select-none",
            vibrancy && "bg-transparent"
          )}
        >
          <TrafficLights
            onClose={handleClose}
            onMinimize={() => setMinimized((m) => !m)}
            onZoom={handleZoom}
            minimized={minimized}
          />

          <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-1.5">
            {icon && <span className="text-muted-foreground">{icon}</span>}
            {title && (
              <span className="text-[11.5px] font-medium tracking-[-0.01em] text-foreground/65">
                {title}
              </span>
            )}
          </div>

          {toolbar && <div className="ml-auto flex items-center gap-1.5">{toolbar}</div>}
        </header>
      )}

      {/* Height is measured, not `auto`: framer can't interpolate from auto,
          which made the collapse snap instead of slide. */}
      <motion.div
        initial={false}
        animate={{
          height: minimized ? 0 : contentHeight ?? "auto",
          opacity: minimized ? 0 : 1,
        }}
        transition={{
          height: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
          opacity: { duration: minimized ? 0.16 : 0.24, delay: minimized ? 0 : 0.1 },
        }}
        className="min-w-0 overflow-hidden"
      >
        <div ref={contentRef} className={cn("flex min-w-0 flex-col p-3", bodyClassName)}>
          {children}
        </div>
      </motion.div>

    </motion.section>
  );
}
