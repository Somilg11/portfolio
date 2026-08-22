"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { useWindows } from "@/components/windows/window-manager";

export function PostApp({ slug }: { slug: string }) {
  const { posts } = useWindows();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1 p-8 text-center">
        <p className="text-[15px] font-semibold">Note not found</p>
        <p className="text-[12.5px] text-muted-foreground">It may have been renamed or removed.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-[680px] px-5 py-6 sm:px-8 sm:py-8">
      <h1 className="text-[26px] font-semibold leading-[1.15] tracking-tight sm:text-[32px]">{post.title}</h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{post.description}</p>

      <div className="mac-hairline my-5 h-px" />

      <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </span>
        {post.tags.map((tag) => (
          <span key={tag} className="mac-pill">
            {tag}
          </span>
        ))}
      </div>

      {post.tldr && (
        <section className="mt-6 rounded-mac border border-border bg-background/50 p-4">
          <h2 className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">TL;DR</h2>
          <ul className="space-y-2">
            {post.tldr.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                <span className="text-[13.5px] leading-relaxed text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div
        className="prose prose-neutral mt-7 max-w-none dark:prose-invert
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-p:text-[14.5px] prose-p:leading-relaxed prose-p:text-foreground/85
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono-sf prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none
          prose-pre:rounded-mac prose-pre:border prose-pre:border-border prose-pre:bg-muted/50 prose-pre:text-foreground
          prose-li:text-[14.5px] prose-li:text-foreground/85
          prose-img:rounded-mac"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
