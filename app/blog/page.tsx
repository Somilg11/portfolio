import React from "react";
import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { HomeBento } from "@/components/home-page/home-bento";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes and deep dives on backend engineering, networking, git and building software — written by Somil Gupta.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Somil Gupta",
    description: "Notes and deep dives on backend engineering and developer tooling.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return <HomeBento notes={posts.slice(0, 3).map(({ slug, title, date }) => ({ slug, title, date }))} />;
}
