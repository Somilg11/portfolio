import type { Metadata } from "next";
import { projectData } from "@/data/projectData";

export const metadata: Metadata = {
  title: "Projects",
  description: `A library of ${projectData.length} projects by Somil Gupta — web apps, AI tools and systems work built with Next.js, NestJS, Python and Rust.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Somil Gupta",
    description: `A library of ${projectData.length} web, AI and systems projects.`,
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
