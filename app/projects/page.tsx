import React from "react";
import { getPosts } from "@/lib/posts";
import { HomeBento } from "@/components/home-page/home-bento";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/app/robots";

export default async function Page() {
  const posts = await getPosts();

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Somil Gupta",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: project.title,
      description: project.tagline,
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([listJsonLd, breadcrumbJsonLd]) }}
      />
      <HomeBento notes={posts.slice(0, 3).map(({ slug, title, date }) => ({ slug, title, date }))} />
    </>
  );
}
