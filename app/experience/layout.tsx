import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Software engineering roles held by Somil Gupta — SDE intern at Recrivio and Creova, backend lead at DevC — with the stack and impact of each.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience — Somil Gupta",
    description: "Engineering roles, stacks and shipped work from 2023 onwards.",
    url: "/experience",
    type: "profile",
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
