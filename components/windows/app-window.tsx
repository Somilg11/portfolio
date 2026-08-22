"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrafficLights } from "@/components/mac/traffic-lights";
import { useSound } from "@/components/sound-provider";
import { useWindows } from "./window-manager";
import type { WindowState } from "./types";

const MENU_BAR = 28;
const MIN_W = 320;
const MIN_H = 240;

/** Where this window's dock icon sits, so minimize can fly into it. */
function dockTarget(id: string) {
  if (typeof document === "undefined") return null;
  const el = document.querySelector<HTMLElement>(`[data-dock-id="${id}"]`);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export function AppWindow({
  state,
  toolbar,
  children,
}: {
  state: WindowState;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { close, focus, toggleMinimize, toggleMaximize, move, resize, focused } = useWindows();
  const { play } = useSound();
  const [genie, setGenie] = useState<{ x: number; y: number } | null>(null);
  // Geometry is measured on the client, so the first render must match the
  // server's markup exactly — until then the window renders as a centred sheet.
  const [mounted, setMounted] = useState(false);
  const [animatingGeometry, setAnimatingGeometry] = useState(false);
  const dragState = useRef<{ dx: number; dy: number } | null>(null);
  const resizeState = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  const isFocused = focused === state.id;

  useEffect(() => setMounted(true), []);

  // Zoom moves and resizes the window at once; let CSS ease it instead of
  // snapping, and drop the transition again so dragging stays 1:1.
  const handleZoom = useCallback(() => {
    setAnimatingGeometry(true);
    toggleMaximize(state.id);
    window.setTimeout(() => setAnimatingGeometry(false), 420);
  }, [toggleMaximize, state.id]);

  /** Vector from the window's centre to its dock icon. */
  const aimAtDock = useCallback(() => {
    const target = dockTarget(state.id);
    const next = target
      ? { x: target.x - (state.x + state.w / 2), y: target.y - (state.y + state.h / 2) }
      : { x: 0, y: window.innerHeight - state.y };
    setGenie(next);
    return next;
  }, [state.id, state.x, state.y, state.w, state.h]);

  // Aim before the animation plays, so the first frame already knows the target.
  const handleMinimize = useCallback(() => {
    aimAtDock();
    toggleMinimize(state.id);
  }, [aimAtDock, toggleMinimize, state.id]);

  // "Hide all windows" minimizes without going through the button.
  useEffect(() => {
    if (state.minimized && !genie) aimAtDock();
  }, [state.minimized, genie, aimAtDock]);

  const onDragPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("button, a, input")) return;
      if (state.maximized) return;

      focus(state.id);
      dragState.current = { dx: e.clientX - state.x, dy: e.clientY - state.y };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focus, state.id, state.maximized, state.x, state.y]
  );

  const onDragPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState.current) return;
      const x = e.clientX - dragState.current.dx;
      const y = Math.max(MENU_BAR, e.clientY - dragState.current.dy);
      move(state.id, x, y);
    },
    [move, state.id]
  );

  const endDrag = useCallback((e: React.PointerEvent) => {
    dragState.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const onResizePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      focus(state.id);
      resizeState.current = { x: e.clientX, y: e.clientY, w: state.w, h: state.h };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focus, state.id, state.w, state.h]
  );

  const onResizePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const start = resizeState.current;
      if (!start) return;
      resize(
        state.id,
        Math.max(MIN_W, start.w + (e.clientX - start.x)),
        Math.max(MIN_H, start.h + (e.clientY - start.y))
      );
    },
    [resize, state.id]
  );

  return (
    <motion.section
      role="dialog"
      aria-label={state.title}
      onPointerDown={() => focus(state.id)}
      initial={{ opacity: 0, scaleX: 0.9, scaleY: 0.86, y: 22 }}
      animate={
        state.minimized
          ? {
              // Genie: the window stays solid while it narrows and stretches
              // down toward its dock icon, then vanishes at the very end.
              x: [0, (genie?.x ?? 0) * 0.45, genie?.x ?? 0],
              y: [0, (genie?.y ?? 300) * 0.5, genie?.y ?? 400],
              scaleX: [1, 0.55, 0.08],
              scaleY: [1, 0.72, 0.05],
              opacity: [1, 1, 0],
              borderRadius: [10, 20, 40],
              filter: ["blur(0px)", "blur(0.4px)", "blur(2px)"],
            }
          : {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              opacity: 1,
              borderRadius: 10,
              filter: "blur(0px)",
            }
      }
      exit={{ opacity: 0, scale: 0.94, y: 12, transition: { duration: 0.16 } }}
      transition={
        state.minimized
          ? { duration: 0.52, times: [0, 0.55, 1], ease: [[0.35, 0, 0.65, 0.2], [0.6, 0, 0.9, 1]] }
          : { type: "spring", stiffness: 300, damping: 26, mass: 0.8, opacity: { duration: 0.18 } }
      }
      style={
        mounted
          ? {
              left: state.x,
              top: state.y,
              width: state.w,
              height: state.h,
              zIndex: 30 + state.z,
              transformOrigin: "50% 100%",
              pointerEvents: state.minimized ? "none" : "auto",
            }
          : { zIndex: 30 + state.z, transformOrigin: "50% 100%" }
      }
      className={cn(
        "mac-window fixed flex flex-col overflow-hidden",
        animatingGeometry &&
          "transition-[left,top,width,height] duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        // Pre-hydration fallback: a centred sheet that fits any viewport.
        !mounted && "inset-x-3 top-10 bottom-24 mx-auto max-w-[980px]",
        isFocused ? "mac-window-focused" : "opacity-[0.99]"
      )}
    >
      <header
        onPointerDown={onDragPointerDown}
        onPointerMove={onDragPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => {
          play("pop");
          handleZoom();
        }}
        className={cn(
          "mac-titlebar relative flex h-10 shrink-0 select-none items-center gap-2 px-2.5",
          state.maximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        )}
      >
        <TrafficLights
          onClose={() => close(state.id)}
          onMinimize={handleMinimize}
          onZoom={handleZoom}
        />

        <div className="pointer-events-none absolute inset-x-0 flex flex-col items-center leading-tight">
          <span className={cn("text-[12.5px] font-medium tracking-tight", !isFocused && "text-foreground/50")}>
            {state.title}
          </span>
          {state.subtitle && (
            <span className="hidden text-[10px] text-muted-foreground sm:block">{state.subtitle}</span>
          )}
        </div>

        {toolbar && <div className="z-10 ml-auto flex items-center gap-2">{toolbar}</div>}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>

      {!state.maximized && (
        <div
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={() => (resizeState.current = null)}
          className="absolute bottom-0 right-0 hidden h-4 w-4 cursor-nwse-resize sm:block"
          aria-hidden
        />
      )}
    </motion.section>
  );
}
