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
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog 📝</h1>
      <ul className="space-y-4">
        {posts.map(({ slug, frontmatter }) => (
          <li key={slug} className="border-b pb-2">
            <Link href={`/blog/${slug}`} className="text-xl text-blue-600 hover:underline">
              {frontmatter.title}
            </Link>
            <p className="text-sm text-slate-500">{frontmatter.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
