import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";
import { SITE_URL } from "./robots";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/experience`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/achievements`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogDir = path.join(process.cwd(), "content/blog");
  const posts = fs.readdirSync(blogDir).map((filename) => {
    const { data } = matter(fs.readFileSync(path.join(blogDir, filename), "utf-8"));
    return {
      url: `${SITE_URL}/blog/${filename.replace(".md", "")}`,
      lastModified: data.date ? new Date(data.date) : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    };
  });

  return [...routes, ...posts];
}
