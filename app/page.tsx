import React from "react";
import { getPosts } from "@/lib/posts";
import { HomeBento } from "@/components/home-page/home-bento";

export default async function IndexPage() {
  const posts = await getPosts();
  return <HomeBento notes={posts.slice(0, 3).map(({ slug, title, date }) => ({ slug, title, date }))} />;
}
