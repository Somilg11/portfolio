import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  tldr?: string[];
  html: string;
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/** Reads every post, newest first. Server-only — the results are handed to the client. */
export async function getPosts(): Promise<Post[]> {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8"));
      const processed = await remark().use(html).process(content);

      return {
        slug: filename.replace(".md", ""),
        title: (data.title as string) ?? filename,
        description: (data.description as string) ?? "",
        date: (data.date as string) ?? "",
        tags: (data.tags as string[]) ?? [],
        tldr: data.tldr as string[] | undefined,
        html: processed.toString(),
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md")).map((f) => f.replace(".md", ""));
}

export function getPostMeta(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data } = matter(fs.readFileSync(filePath, "utf-8"));
  return data as { title?: string; description?: string; date?: string; tags?: string[] };
}
