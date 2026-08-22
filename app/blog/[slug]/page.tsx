import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostMeta, getPostSlugs, getPosts } from "@/lib/posts";
import { SITE_URL } from "@/app/robots";
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
  const meta = getPostMeta(params.slug);
  if (!meta) return notFound();

  const posts = await getPosts();
  const url = `${SITE_URL}/blog/${params.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date ? new Date(meta.date).toISOString() : undefined,
    dateModified: meta.date ? new Date(meta.date).toISOString() : undefined,
    keywords: meta.tags,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: { "@type": "Person", name: "Somil Gupta", url: SITE_URL },
    publisher: { "@type": "Person", name: "Somil Gupta", url: SITE_URL },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: meta.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }}
      />
      <HomeBento notes={posts.slice(0, 3).map(({ slug, title, date }) => ({ slug, title, date }))} />
    </>
  );
}
