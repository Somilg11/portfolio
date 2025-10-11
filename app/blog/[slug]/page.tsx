// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/blog"));

  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const filePath = path.join(process.cwd(), "content/blog", `${params.slug}.md`);

  if (!fs.existsSync(filePath)) return notFound();

  const markdown = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(markdown);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-3xl mx-5 md:mx-auto my-10">
      <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-xl border border-slate-800 px-4 py-3 relative">
        <div className="absolute left-4 top-3 flex gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-red-400"></span>
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-400"></span>
          <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
        </div>
        <div className="flex items-center gap-4 mt-5 mb-2">
          {/* Space between dots and title */}
          <span className="text-base font-semibold text-slate-100 tracking-tight">{data.title}</span>
        </div>
        <p className="text-xs text-slate-400 mb-6">{data.date}</p>
        <article className="prose prose-invert" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </main>
  );
}
