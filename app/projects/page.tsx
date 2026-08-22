import React from "react";
import { getPosts } from "@/lib/posts";
import { HomeBento } from "@/components/home-page/home-bento";
import { projectData } from "@/data/projectData";
import { SITE_URL } from "@/app/robots";

export default async function Page() {
  const posts = await getPosts();

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Somil Gupta",
    numberOfItems: projectData.length,
    itemListElement: [...projectData].reverse().map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: project.title,
      description: project.description,
      url: project.live || project.url,
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
