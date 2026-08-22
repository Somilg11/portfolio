/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Sparkles } from "lucide-react";
import { MacWindow } from "@/components/mac/window";

const rotatingWords = ["backends", "frontends", "design systems", "scalable systems"];

export default function ProfileCard() {
  const [now, setNow] = useState<Date | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    const words = window.setInterval(() => {
      setFading(true);
      window.setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setFading(false);
      }, 320);
    }, 2600);

    return () => {
      window.clearInterval(clock);
      window.clearInterval(words);
    };
  }, []);

  const time = now
    ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
    : "";

  return (
    <MacWindow
      title="somil — profile"
      className="h-full"
      bodyClassName="p-3.5 sm:p-4"
      delay={0.05}
    >
      <div className="flex items-start gap-3.5">
        <div className="relative shrink-0">
          <img
            src="/myprofileimage.png"
            alt="Somil"
            className="h-[60px] w-[60px] rounded-full object-cover ring-1 ring-black/10 dark:ring-white/10"
          />
          <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h1 className="text-[21px] font-semibold leading-none tracking-tight">somil</h1>
            <span className="text-[12px] text-muted-foreground">@gsomil</span>
          </div>

          <p className="mt-2 text-[15px] leading-snug">
            I build{" "}
            <span
              className={`font-semibold text-primary transition-all duration-300 ${
                fading ? "-translate-y-1 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              {rotatingWords[wordIndex]}
            </span>
          </p>

          <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
            Hey, I&apos;m Somil — a 22 year old engineer shipping production software from India.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="mac-pill">
              <MapPin size={11} /> India · IST
            </span>
            <span className="mac-pill">
              <Sparkles size={11} /> SDE Intern @ Recrivio
            </span>
          </div>
        </div>
      </div>

      <div className="mac-hairline my-3 h-px" />

      <div className="flex items-center justify-between text-[11.5px] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Available for work
        </span>
        <span suppressHydrationWarning className="font-mono-sf tabular-nums">
          {time}
        </span>
      </div>
    </MacWindow>
  );
}
