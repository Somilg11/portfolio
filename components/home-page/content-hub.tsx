"use client";

import React from "react";
import Link from "next/link";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel } from "@/components/ui/alert-dialog";


const hubItems = [
  {
    key: "experience",
    label: "Experience",
    emoji: "💼",
    bg: "bg-blue-600",
    content: <ExperienceOnly />,
  },
  {
    key: "achievements",
    label: "Achievements",
    emoji: "�",
    bg: "bg-amber-600",
    content: <AchievementsOnly />,
  },
  {
    key: "blog",
    label: "Blog",
    emoji: "📝",
    bg: "bg-fuchsia-600",
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">Latest writings</h3>
        <p className="text-zinc-400 text-sm mb-4">Head over to the blog for recent posts and updates.</p>
        <Link href="/blog" className="inline-block rounded-lg bg-zinc-100 text-zinc-900 px-4 py-2 font-medium hover:bg-white transition">Go to Blog</Link>
      </div>
    ),
  },
];

export default function ContentHub() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-950/80 to-zinc-900/80 shadow-xl border border-zinc-800 px-4 py-4 md:px-6 md:py-6 backdrop-blur-md w-full">
      {/* Header text like screenshot: show 'CURRENTLY COOKING' as plain text (no box) */}
      <div className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight mb-2">DAILY<br/>Tool<br/>STACK.</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {hubItems.map((item) => (
          <AlertDialog key={item.key}>
            <AlertDialogTrigger asChild>
              <button className={`rounded-2xl ${item.bg}/90 text-left px-4 py-6 shadow border border-zinc-800/50 hover:opacity-90 transition flex items-center justify-between`}>
                <span className="text-zinc-50 font-extrabold text-lg">{item.label}</span>
                <span className="text-2xl" aria-hidden>
                  {item.emoji}
                </span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-h-[80vh] overflow-y-auto bg-zinc-950/90 border-zinc-800">
              <AlertDialogHeader>
                <div className="flex items-center justify-between">
                  <AlertDialogTitle className="text-zinc-100">{item.label}</AlertDialogTitle>
                  <AlertDialogCancel className="h-8 w-8 rounded-full border border-zinc-700 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800">✕</AlertDialogCancel>
                </div>
              </AlertDialogHeader>
              <div>{item.content}</div>
            </AlertDialogContent>
          </AlertDialog>
        ))}
        {/* Blog extra rectangle within grid */}
        <Link href="/blog" className="rounded-2xl bg-zinc-700/80 text-zinc-100 px-4 py-6 font-bold tracking-tight text-center hover:bg-zinc-600 transition border border-zinc-600">Blog Posts</Link>
      </div>
      {/* Tools scroller at the bottom */}
      <div className="mt-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max pb-1">
          {['VS Code','Vercel','Figma','Notion','Linear','GitHub','Postman'].map((tool)=> (
            <span key={tool} className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 text-sm border border-zinc-700 whitespace-nowrap">{tool}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline-only sections to avoid duplicating full Experience UI
function ExperienceOnly() {
  return (
    <div className="space-y-4 p-2">
      <div className="relative px-4">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-zinc-700 rounded-full"></div>
        <div className="flex flex-col gap-8 pt-6 pb-2">
          <div className="relative flex items-start gap-4">
            <div className="absolute left-6 top-2 w-3 h-3 bg-blue-500 rounded-full border-2 border-zinc-900"></div>
            <div className="ml-12 rounded-xl bg-zinc-900/80 border border-zinc-800 shadow p-4 w-full">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-base text-slate-100">Software Engineer Intern</h2>
                <span className="text-xs text-zinc-400">May 2025 - July 2025</span>
              </div>
              <p className="text-blue-400 text-xs font-medium">Creova.in</p>
              <p className="text-zinc-400 mt-1 text-xs leading-relaxed">Worked as a software engineering intern, gaining hands-on experience in full-stack development and contributing to various projects.</p>
            </div>
          </div>
          <div className="relative flex items-start gap-4">
            <div className="absolute left-6 top-2 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
            <div className="ml-12 rounded-xl bg-zinc-900/80 border border-zinc-800 shadow p-4 w-full">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-base text-slate-100">Backend Lead</h2>
                <span className="text-xs text-zinc-400">Current</span>
              </div>
              <p className="text-green-400 text-xs font-medium">DevC - College Club</p>
              <p className="text-zinc-400 mt-1 text-xs leading-relaxed">Leading backend development initiatives, built college websites including alumni portal and maintaining various other platforms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AchievementsOnly() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 shadow p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🥈</span>
          <h3 className="font-semibold text-slate-100">Finalist - SIH 2024</h3>
          <span className="text-xs text-zinc-400">2024</span>
        </div>
        <p className="text-zinc-400 text-xs">Smart India Hackathon 2024</p>
      </div>
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 shadow p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <h3 className="font-semibold text-yellow-400">Winner - NMIT Hacks 25</h3>
          <span className="text-xs text-zinc-400">Winner</span>
        </div>
        <p className="text-zinc-400 text-xs">Hackathon Competition</p>
      </div>
      <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 shadow p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💻</span>
          <h3 className="font-semibold text-slate-100">Open Source Contributor</h3>
          <span className="text-xs text-zinc-400">Active</span>
        </div>
        <p className="text-zinc-400 text-xs">Contributing to various open source projects</p>
      </div>
    </div>
  )
}
