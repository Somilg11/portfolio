"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type DotFieldProps = {
  className?: string;
  /** Distance between pixels, in CSS px. */
  gap?: number;
  /** Pixel edge length, in CSS px. */
  pixel?: number;
};

/**
 * A field of square pixels that breathes in a slow diagonal wave and lights up
 * around the pointer. Canvas-drawn, so it stays sharp on retina and costs no
 * image bytes.
 */
export default function DotField({ className = "", gap = 8, pixel = 2 }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -999, y: -999 });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dark = resolvedTheme === "dark";
    const base = dark ? "255,255,255" : "0,0,0";
    const accent = dark ? "10,132,255" : "10,124,255";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let start = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      if (!start) start = now;
      const t = reduced ? 0 : (now - start) / 1000;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;

      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          const x = offsetX + cx * gap;
          const y = offsetY + cy * gap;

          // slow diagonal wave
          const wave = 0.5 + 0.5 * Math.sin(cx * 0.32 + cy * 0.22 - t * 1.1);
          let alpha = 0.1 + wave * 0.2;
          let size = pixel;
          let color = base;

          // pointer halo
          const dx = x - pointer.current.x;
          const dy = y - pointer.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 78) {
            const near = 1 - dist / 78;
            alpha += near * 0.65;
            size = pixel + near * 2.2;
            if (near > 0.35) color = accent;
          }

          ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`;
          ctx.fillRect(Math.round(x - size / 2), Math.round(y - size / 2), Math.round(size), Math.round(size));
        }
      }

      if (running) raf = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointer.current = { x: -999, y: -999 };
    };

    resize();

    // Only burn frames while the field is actually on screen.
    let running = false;
    const setRunning = (next: boolean) => {
      if (next === running) return;
      running = next;
      if (running) {
        start = 0;
        raf = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(raf);
      }
    };

    const visibility = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), {
      rootMargin: "120px",
    });
    visibility.observe(canvas);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      visibility.disconnect();
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [resolvedTheme, gap, pixel]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
