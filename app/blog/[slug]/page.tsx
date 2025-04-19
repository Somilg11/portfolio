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
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-sm text-slate-500 mb-6">{data.date}</p>
      <article className="prose prose-invert" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
