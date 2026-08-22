import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SoundProvider } from "@/components/sound-provider";
import { MenuBar } from "@/components/mac/menu-bar";
import { Dock } from "@/components/mac/dock";
import { Spotlight } from "@/components/mac/spotlight";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gsomil.vercel.app"),
  title: {
    default: "somil",
    template: "%s — somil",
  },
  description: "Somil Gupta — full-stack engineer. Backends, systems and product UI.",
  openGraph: {
    title: "somil — portfolio",
    description: "Full-stack engineer. Backends, systems and product UI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
