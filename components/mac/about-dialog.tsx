/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { TrafficLights } from "./traffic-lights";
import { useSound } from "@/components/sound-provider";
import { InfoIcon } from "./asset-icons";

const overview: [string, string][] = [
  ["Model", "Somil Gupta · Full-Stack Engineer"],
  ["Role", "SDE Intern @ Recrivio"],
  ["Focus", "Backends, systems, product UI"],
  ["Location", "India · IST (UTC+5:30)"],
  ["Since", "Shipping production software since 2023"],
  ["Status", "Available for work"],
];

const hardware: [string, string][] = [
  ["Machine", "MacBook Air M3"],
  ["Memory", "16 GB unified"],
  ["Storage", "512 GB SSD"],
  ["Also", "Snapdragon 7s Gen 2 · Dimensity 7000"],
  ["Shell", "zsh · Arch on WSL"],
  ["Editor", "VS Code · Claude Code · Opencode"],
];

const stack: [string, string][] = [
  ["Frontend", "React · Next.js · Tailwind · shadcn/ui"],
  ["Backend", "NestJS · Node.js · Express · FastAPI"],
  ["Data", "PostgreSQL · MongoDB · Redis · Prisma"],
  ["Infra", "Docker · AWS · Cloudflare Workers"],
  ["Languages", "TypeScript · Python · C++ · Go · Rust"],
];

const tabs = [
  { id: "overview", label: "Overview", rows: overview },
  { id: "hardware", label: "Hardware", rows: hardware },
  { id: "stack", label: "Stack", rows: stack },
] as const;

/** "About This Mac" panel — the system specs live here, not in the bento. */
export function AboutDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { play } = useSound();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const rows = tabs.find((t) => t.id === tab)!.rows;

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(v) => {
        play(v ? "open" : "close");
        onOpenChange(v);
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="mac-window fixed left-1/2 top-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-[430px] -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-mac-3 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <DialogPrimitive.Title className="sr-only">About This Developer</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            System overview, hardware and stack.
          </DialogPrimitive.Description>

          <header className="mac-titlebar flex h-8 items-center px-2.5">
            <DialogPrimitive.Close asChild>
              <span>
                <TrafficLights onClose={() => onOpenChange(false)} />
              </span>
            </DialogPrimitive.Close>
          </header>

          <div className="flex flex-col items-center px-6 pb-5 pt-5 text-center">
            <img
              src="/myprofileimage.png"
              alt="Somil"
              className="h-20 w-20 rounded-[18px] object-cover ring-1 ring-black/10 dark:ring-white/10"
            />
            <h2 className="mt-3 text-[19px] font-semibold tracking-tight">somil</h2>
            <p className="flex items-center gap-1 text-[11.5px] text-muted-foreground">
              <InfoIcon size={12} /> Portfolio 3.0 · build 2026.8
            </p>

            <div className="mt-4 flex w-full items-center gap-0.5 rounded-[8px] border border-border bg-background/60 p-0.5">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  data-sound="click"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex-1 rounded-[6px] px-2 py-1 text-[12px] font-medium transition-colors",
                    tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <dl className="mt-4 w-full space-y-1.5 text-left">
              {rows.map(([key, value]) => (
                <div key={key} className="flex gap-3 text-[12px]">
                  <dt className="w-[74px] shrink-0 text-right font-medium text-muted-foreground">{key}</dt>
                  <dd className="flex-1 text-foreground/90">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex w-full gap-2">
              <a className="mac-button flex-1" href="/resume.pdf" download="Somil_Gupta_Resume.pdf" data-sound="success">
                Resume…
              </a>
              <a className="mac-button mac-button-primary flex-1" href="mailto:gsomil93@gmail.com" data-sound="click">
                Get in touch
              </a>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
