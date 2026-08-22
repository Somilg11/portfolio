"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NotesGlyph } from "@/components/mac/glyphs";
import { MacWindow } from "@/components/mac/window";
import { AppIcon } from "@/components/mac/app-icon";

export type NotePreview = { slug: string; title: string; date: string };

export default function NotesCard({ notes }: { notes: NotePreview[] }) {
  return (
    <MacWindow title="Notes" href="/blog" bodyClassName="p-2.5" delay={0.2}>
      <Link
        href="/blog"
        data-sound="swoosh"
        className="group flex items-center gap-2.5 rounded-mac p-1.5 transition-colors duration-150 hover:bg-foreground/[0.05]"
      >
        <AppIcon tone="yellow" size="lg">
          <NotesGlyph size={20} />
        </AppIcon>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-medium leading-tight">Writing</div>
          <div className="text-[11.5px] leading-tight text-muted-foreground">{notes.length} notes published</div>
        </div>
        <ArrowUpRight
          size={15}
          className="shrink-0 text-muted-foreground transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </Link>

      <div className="mac-hairline my-2 h-px" />

      <ul className="space-y-0.5">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/blog/${note.slug}`}
              data-sound="tick"
              className="block rounded-[6px] px-1.5 py-1 transition-colors duration-150 hover:bg-foreground/[0.05]"
            >
              <div className="truncate text-[12px] leading-tight">{note.title}</div>
              <div className="text-[10.5px] leading-tight text-muted-foreground">
                {new Date(note.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </MacWindow>
  );
}
