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

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const { data } = matter(fileContent);

    return { 
      slug, 
      title: data.title, 
      description: data.description, 
      date: data.date,
      tags: data.tags || []
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white pb-20">
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight uppercase tracking-tighter">Blog</h1>
          <p className="text-zinc-400 text-lg">
            Thoughts, tutorials, and deep dives into technology.
          </p>
        </div>

        {/* Blog Posts List */}
        <BlogListClient posts={posts} />
      </div>
    </main>
  );
}


