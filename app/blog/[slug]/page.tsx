import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostMeta, getPostSlugs, getPosts } from "@/lib/posts";
import { HomeBento } from "@/components/home-page/home-bento";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const data = getPostMeta(params.slug);
  if (!data) return {};

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
    twitter: { card: "summary_large_image", title: data.title, description: data.description },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!getPostMeta(params.slug)) return notFound();

  const posts = await getPosts();
  return <HomeBento notes={posts.slice(0, 3).map(({ slug, title, date }) => ({ slug, title, date }))} />;
}
