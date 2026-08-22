"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { MacWindow } from "@/components/mac/window";
import { AssetIcon } from "@/components/mac/app-icon";
import { useWindows } from "@/components/windows/window-manager";

export type NotePreview = { slug: string; title: string; date: string };

export default function NotesCard({ notes }: { notes: NotePreview[] }) {
  const { open } = useWindows();

  return (
    <MacWindow title="Notes" onZoom={() => open("blog")} bodyClassName="p-2.5" delay={0.2}>
      <button
        type="button"
        data-sound="none"
        onClick={() => open("blog")}
        className="group flex w-full items-center gap-2.5 rounded-mac p-1.5 text-left transition-colors duration-150 hover:bg-foreground/[0.05]"
      >
        <AssetIcon src="/mac-assets/images/blog.png" size={40} />
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-medium leading-tight">Writing</div>
          <div className="text-[11.5px] leading-tight text-muted-foreground">{notes.length} notes published</div>
        </div>
        <ArrowUpRight
          size={15}
          className="shrink-0 text-muted-foreground transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </button>

      <div className="mac-hairline my-2 h-px" />

      <ul className="space-y-0.5">
        {notes.map((note) => (
          <li key={note.slug}>
            <button
              type="button"
              data-sound="none"
              onClick={() => open(`post:${note.slug}`)}
              className="block w-full rounded-[6px] px-1.5 py-1 text-left transition-colors duration-150 hover:bg-foreground/[0.05]"
            >
              <div className="truncate text-[12px] leading-tight">{note.title}</div>
              <div className="text-[10.5px] leading-tight text-muted-foreground">
                {new Date(note.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </MacWindow>
  );
}
