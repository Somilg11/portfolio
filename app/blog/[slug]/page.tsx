import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import { PostClientWrapper, PostData } from "@/components/blog/post-client";

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
    <PostClientWrapper 
      data={data as PostData} 
      contentHtml={contentHtml} 
    />
  );
}


