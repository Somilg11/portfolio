"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PostClientWrapper({ data, contentHtml }: { data: any, contentHtml: string }) {
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white pb-32">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-12 sm:pt-24">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
            {data.title}
          </h1>
          <p className="text-zinc-400 text-xl sm:text-2xl leading-relaxed">
            {data.description}
          </p>
        </header>

        {/* Post Info Bar */}
        <div className="flex items-center justify-between py-6 border-y border-zinc-900 mb-12">
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
            <Calendar size={16} />
            <span>{new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          <Button 
            onClick={handleShare}
            variant="outline" 
            size="sm"
            className="bg-zinc-950 border-zinc-800 hover:bg-zinc-900 text-zinc-300 gap-2 h-9 px-4 rounded-lg"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
            {copied ? "Copied!" : "Share"}
          </Button>
        </div>

        {/* TL;DR Section */}
        {data.tldr && (
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              TL;DR
            </h3>
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 sm:p-8">
              <ul className="space-y-4">
                {data.tldr.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 text-zinc-300 leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Article Content */}
        <article 
          className="prose prose-invert prose-zinc max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-p:text-zinc-300 prose-p:leading-relaxed 
            prose-strong:text-white prose-a:text-white prose-a:underline
            prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-zinc-800
            prose-li:text-zinc-300"
          dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />
      </div>

      {/* Floating TL;DR Status Pill */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-full shadow-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-bold tracking-tight text-white uppercase">TL;DR</span>
          <div className="w-px h-4 bg-zinc-800 mx-1" />
          <div className="relative w-5 h-5">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-zinc-800"
              />
              <motion.circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="50.26"
                style={{ pathLength: scrollYProgress }}
                className="text-white"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
