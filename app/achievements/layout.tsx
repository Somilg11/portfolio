import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Hackathon wins and recognitions — Smart India Hackathon 2024 finalist, NMIT Hacks 25 winner, and open source contributions by Somil Gupta.",
  alternates: { canonical: "/achievements" },
  openGraph: {
    title: "Achievements — Somil Gupta",
    description: "Hackathon wins, finals and open source work.",
    url: "/achievements",
    type: "website",
  },
};

export default function AchievementsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
