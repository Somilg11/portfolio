import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import { getProject, projects } from "@/data/projects";
import { SITE_URL } from "@/app/robots";
import { HomeBento } from "@/components/home-page/home-bento";

interface ProjectPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  const url = `/projects/${project.slug}`;
  const title = `${project.title} — ${project.tagline}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    keywords: project.stack,
    openGraph: {
      type: "article",
      url,
      title,
      description: project.summary,
      images: [{ url: project.cover, alt: `${project.title} preview` }],
    },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [project.cover] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  const posts = await getPosts();
  const url = `${SITE_URL}/projects/${project.slug}`;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    codeRepository: project.repo,
    url: project.live ?? url,
    image: `${SITE_URL}${project.cover}`,
    keywords: project.stack,
    author: { "@type": "Person", name: "Somil Gupta", url: SITE_URL },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([projectJsonLd, breadcrumbJsonLd]) }}
      />
      <HomeBento notes={posts.slice(0, 3).map(({ slug, title, date }) => ({ slug, title, date }))} />
    </>
  );
}
