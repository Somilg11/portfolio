import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `${projects.length} projects by Somil Gupta — storage engines, payment and ledger backends, web frameworks and full-stack products built with TypeScript, Rust, C++ and Python.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Somil Gupta",
    description: `${projects.length} systems, backend and product projects.`,
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
