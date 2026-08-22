"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Check, Share2 } from "lucide-react";
import { TrafficLights } from "@/components/mac/traffic-lights";
import { useSound } from "@/components/sound-provider";

export interface PostData {
  title: string;
  description: string;
  date: string;
  tldr?: string[];
  [key: string]: unknown;
}

export function PostClientWrapper({ data, contentHtml }: { data: PostData; contentHtml: string }) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { play } = useSound();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      play("success");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      play("error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[900px] px-3 py-4 sm:px-6 sm:py-6">
      <motion.article
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className="mac-window overflow-hidden"
      >
        {/* Title bar with reading progress */}
        <header className="mac-titlebar sticky top-7 z-20 flex h-11 items-center gap-3 px-3">
          <TrafficLights
            onClose={() => { play("swoosh"); router.push("/blog"); }}
            onMinimize={() => { play("swoosh"); router.push("/blog"); }}
            onZoom={() => play("pop")}
          />

          <div className="pointer-events-none absolute inset-x-0 flex justify-center">
            <span className="max-w-[55%] truncate text-[13px] font-semibold tracking-tight">{data.title}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            data-sound="none"
            className="mac-button ml-auto gap-1.5"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
          </button>

          <motion.div
            style={{ scaleX }}
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-primary"
          />
        </header>

        <div className="px-5 py-7 sm:px-10 sm:py-10">
          <Link
            href="/blog"
            data-sound="swoosh"
            className="group mb-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            All notes
          </Link>

          <h1 className="text-[30px] font-semibold leading-[1.12] tracking-tight sm:text-[42px]">
            {data.title}
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground sm:text-[18px]">
            {data.description}
          </p>

          <div className="mac-hairline my-6 h-px" />

          <div className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
            <Calendar size={13} />
            {new Date(data.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>

          {data.tldr && (
            <section className="mt-8 rounded-mac border border-border bg-background/60 p-5 shadow-mac-1">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                TL;DR
              </h2>
              <ul className="space-y-2.5">
                {data.tldr.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span className="text-[14px] leading-relaxed text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div
            className="prose prose-neutral mt-10 max-w-none dark:prose-invert
              prose-headings:font-semibold prose-headings:tracking-tight
              prose-p:leading-relaxed prose-p:text-foreground/85
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono-sf prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none
              prose-pre:rounded-mac prose-pre:border prose-pre:border-border prose-pre:bg-muted/50 prose-pre:text-foreground
              prose-li:text-foreground/85
              prose-img:rounded-mac"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </motion.article>
    </div>
  );
}
