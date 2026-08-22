import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogListClient } from "@/components/blog/blog-list-client";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  const posts = files
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <BlogListClient posts={posts} />;
}
