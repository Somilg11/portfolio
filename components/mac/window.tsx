"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
  /** Where the green zoom button takes you. */
  href?: string;
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
  href,
  children,
  className,
  bodyClassName,
  delay = 0,
  vibrancy = false,
  chromeless = false,
}: MacWindowProps) {
  const [minimized, setMinimized] = useState(false);
  const [shaking, setShaking] = useState(false);
  const router = useRouter();
  const { play } = useSound();

  const handleClose = () => {
    // Nothing to close on a portfolio — refuse with a shake, like a modal sheet.
    setShaking(true);
    window.setTimeout(() => setShaking(false), 400);
  };

  const handleZoom = () => {
    if (href) {
      play("swoosh");
      router.push(href);
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

      <AnimatePresence initial={false}>
        {!minimized && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="flex min-h-0 min-w-0 flex-1 flex-col"
          >
            <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col p-3", bodyClassName)}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
