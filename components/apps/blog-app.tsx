"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { SearchIcon } from "@/components/mac/asset-icons";
import { useWindows } from "@/components/windows/window-manager";

export function BlogApp() {
  const { posts, open } = useWindows();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      posts.filter((post) =>
        `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
      ),
    [posts, query]
  );

  return (
    <div className="flex min-h-full flex-col">
      <div className="mac-sidebar sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border/70 p-2.5">
        <span className="text-[12px] text-muted-foreground">{filtered.length} notes</span>
        <div className="relative w-[200px]">
          <SearchIcon size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            data-sound="tick"
            className="mac-focus h-7 w-full rounded-full border border-border bg-background/70 pl-7 pr-3 text-[12.5px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3.5 sm:p-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-semibold">Nothing here yet</p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">Try another search term.</p>
          </div>
        ) : (
          filtered.map((post, i) => (
            <motion.button
              key={post.slug}
              type="button"
              data-sound="none"
              onClick={() => open(`post:${post.slug}`)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="group flex flex-col gap-2 rounded-mac border border-border bg-background/40 p-3.5 text-left transition-colors duration-200 hover:bg-foreground/[0.04]"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[16px] font-semibold leading-snug tracking-tight">{post.title}</h2>
                <ArrowRight
                  size={15}
                  className="mt-1 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </div>

              <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{post.description}</p>

              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar size={11} />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="mac-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}
