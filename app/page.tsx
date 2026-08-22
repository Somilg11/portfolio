import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import ProfileCard from "@/components/home-page/profile-card";
import LinksCard from "@/components/home-page/links-card";
import ProjectPoster from "@/components/home-page/project-poster";
import TechStackCard from "@/components/home-page/tech-stack-card";
import ToolsBoard from "@/components/home-page/tools-board";
import NotesCard, { type NotePreview } from "@/components/home-page/notes-card";

function recentNotes(): NotePreview[] {
  const blogDir = path.join(process.cwd(), "content/blog");

  return fs
    .readdirSync(blogDir)
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(blogDir, filename), "utf-8"));
      return { slug: filename.replace(".md", ""), title: data.title as string, date: data.date as string };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

export default function IndexPage() {
  const notes = recentNotes();

  return (
    <main className="mx-auto w-full max-w-[1400px] px-3 py-3 sm:px-5 sm:py-4">
      <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.9fr)_minmax(0,0.85fr)]">
        {/* Left — Skills */}
        <div className="order-3 flex min-w-0 flex-col lg:order-1">
          <TechStackCard />
        </div>

        {/* Centre — Profile + Desk */}
        <div className="order-1 flex min-w-0 flex-col gap-3 lg:order-2">
          <ProfileCard />
          <ToolsBoard />
        </div>

        {/* Right — Links, Projects, Notes */}
        <div className="order-2 flex min-w-0 flex-col gap-3 lg:order-3">
          <LinksCard />
          <ProjectPoster />
          <NotesCard notes={notes} />
        </div>
      </div>
    </main>
  );
}
