import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SoundProvider } from "@/components/sound-provider";
import { MenuBar } from "@/components/mac/menu-bar";
import { Dock } from "@/components/mac/dock";
import { Spotlight } from "@/components/mac/spotlight";
import { SITE_URL } from "./robots";

// SF ships with macOS/iOS; Geist is only the fallback elsewhere, so it is
// loaded lazily with swap instead of blocking first paint.
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: false,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
});

const DESCRIPTION =
  "Somil Gupta — full-stack engineer from India building production backends, distributed systems and product UI with NestJS, Next.js, PostgreSQL and Docker.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Somil Gupta — Full-Stack Engineer",
    template: "%s — Somil Gupta",
  },
  description: DESCRIPTION,
  applicationName: "somil — portfolio",
  authors: [{ name: "Somil Gupta", url: SITE_URL }],
  creator: "Somil Gupta",
  publisher: "Somil Gupta",
  keywords: [
    "Somil Gupta",
    "full-stack engineer",
    "backend engineer",
    "software developer portfolio",
    "NestJS",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "India",
  ],
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Somil Gupta",
    title: "Somil Gupta — Full-Stack Engineer",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Somil Gupta — Full-Stack Engineer",
    description: DESCRIPTION,
    creator: "@somil_1101",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceef2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

/** Structured data so search engines read the site as a person + portfolio. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Somil Gupta",
  alternateName: "gsomil",
  url: SITE_URL,
  image: `${SITE_URL}/myprofileimage.png`,
  jobTitle: "Software Development Engineer",
  description: DESCRIPTION,
  email: "mailto:gsomil93@gmail.com",
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Recrivio" },
  knowsAbout: [
    "NestJS",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "System design",
  ],
  sameAs: [
    "https://github.com/Somilg11",
    "https://www.linkedin.com/in/somil-1101s/",
    "https://x.com/somil_1101",
    "https://codolio.com/profile/strangecodes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ghchart.rshah.org" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={
          {
            // Real SF on Apple hardware, Geist everywhere else.
            "--font-sf":
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", var(--font-geist-sans), "Segoe UI", system-ui, sans-serif',
            "--font-sf-mono":
              'ui-monospace, "SF Mono", SFMono-Regular, Menlo, var(--font-geist-mono), "Cascadia Code", monospace',
          } as React.CSSProperties
        }
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SoundProvider>
            {/* Desktop surface — flat colour, no image assets */}
            <div className="mac-desktop" aria-hidden />

            <MenuBar />

            <div className="min-h-[calc(100vh-1.75rem)] pt-7 pb-20">{children}</div>

            <Dock />
            <Spotlight />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
