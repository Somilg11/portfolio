import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const filePath = path.join(process.cwd(), "content/blog", `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return {};

  const { data } = matter(fs.readFileSync(filePath, "utf-8"));
  const url = `/blog/${params.slug}`;

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: url },
    keywords: data.tags,
    openGraph: {
      type: "article",
      url,
      title: data.title,
      description: data.description,
      publishedTime: data.date ? new Date(data.date).toISOString() : undefined,
      authors: ["Somil Gupta"],
      tags: data.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
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


