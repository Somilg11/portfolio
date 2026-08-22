import type { MetadataRoute } from "next";

/** Set NEXT_PUBLIC_SITE_URL in the deployment to the real domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gsomil.vercel.app").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
