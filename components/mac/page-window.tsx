"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrafficLights } from "./traffic-lights";
import { useSound } from "@/components/sound-provider";

type PageWindowProps = {
  title: string;
  subtitle?: string;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

/** Full-page app window with a back/forward toolbar, used by every sub-page. */
export function PageWindow({ title, subtitle, toolbar, children, className, bodyClassName }: PageWindowProps) {
  const router = useRouter();
  const { play } = useSound();

  return (
    <div className="mx-auto w-full max-w-[1180px] px-3 py-3 sm:px-5 sm:py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className={cn("mac-window overflow-hidden", className)}
      >
        <header className="mac-titlebar relative flex h-10 items-center gap-2.5 px-2.5">
          <TrafficLights
            onClose={() => {
              play("swoosh");
              router.push("/");
            }}
            onMinimize={() => {
              play("swoosh");
              router.push("/");
            }}
            onZoom={() => play("pop")}
          />

          <div className="ml-1 flex items-center gap-0.5">
            <button
              type="button"
              aria-label="Back"
              onClick={() => router.back()}
              className="mac-row px-1.5 py-1 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Forward"
              onClick={() => router.forward()}
              className="mac-row px-1.5 py-1 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 flex flex-col items-center leading-tight">
            <span className="text-[12.5px] font-medium tracking-tight">{title}</span>
            {subtitle && <span className="hidden text-[10px] text-muted-foreground sm:block">{subtitle}</span>}
          </div>

          {toolbar && <div className="ml-auto flex items-center gap-2">{toolbar}</div>}
        </header>

        <div className={cn("min-h-[60vh] p-3 sm:p-5", bodyClassName)}>{children}</div>
      </motion.div>
    </div>
  );
}
