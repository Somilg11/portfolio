"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { SearchIcon } from "@/components/mac/asset-icons";
import { PageWindow } from "@/components/mac/page-window";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      posts.filter((post) =>
        `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
      ),
    [posts, query]
  );

  return (
    <PageWindow
      title="Blog"
      subtitle={`${filtered.length} notes`}
      bodyClassName="p-0"
      toolbar={
        <div className="relative hidden sm:block sm:w-[200px]">
          <SearchIcon size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            data-sound="tick"
            className="mac-focus h-7 w-full rounded-full border border-border bg-background/70 pl-7 pr-3 text-[12.5px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      }
    >
      <div className="p-3 sm:p-5">
        {/* mobile search */}
        <div className="relative mb-4 sm:hidden">
          <SearchIcon size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes"
            data-sound="tick"
            className="mac-focus h-9 w-full rounded-full border border-border bg-background/70 pl-7 pr-3 text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[17px] font-semibold">Nothing here yet</p>
            <p className="mt-1 text-[13px] text-muted-foreground">Try another search term.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  data-sound="swoosh"
                  className="group flex flex-col gap-2 rounded-mac border border-border bg-background/50 p-4 shadow-mac-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-mac-2"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-[17px] font-semibold leading-snug tracking-tight sm:text-[19px]">
                      {post.title}
                    </h2>
                    <ArrowRight
                      size={15}
                      className="mt-1 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </div>

                  <p className="line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <span className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                      <Calendar size={11} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="mac-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageWindow>
  );
}
