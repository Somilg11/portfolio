// app/blog/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/blog"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(
      path.join(process.cwd(), "content/blog", filename),
      "utf-8"
    );
    const { data } = matter(fileContent);

    return { slug, frontmatter: data };
  });

  return (
    <main className="max-w-3xl mx-5 md:mx-auto my-10">
  <div className="rounded-2xl bg-gradient-to-br  min-h-screen from-zinc-950 via-zinc-900 to-zinc-950 shadow-xl border border-zinc-800 px-4 py-3 relative">
        <div className="absolute left-4 top-3 flex gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-red-400"></span>
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400"></span>
          <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
        </div>
        <div className="flex items-center gap-4 mt-5 mb-6">
          {/* Space between dots and title */}
          <span className="text-base font-semibold text-zinc-100 tracking-tight">Blog <span className="text-sm">📝</span></span>
        </div>
        <ul className="space-y-4">
          {posts.map(({ slug, frontmatter }) => (
            <li key={slug} className="rounded-xl bg-zinc-900/80 shadow border border-zinc-800 px-4 py-3">
              <Link href={`/blog/${slug}`} className="text-lg text-zinc-100 font-semibold hover:text-blue-400 transition-colors">
                {frontmatter.title}
              </Link>
              <p className="text-xs text-zinc-400 mt-1">{frontmatter.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
