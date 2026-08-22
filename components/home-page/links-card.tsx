"use client";

import React from "react";
import { SiDiscord } from "react-icons/si";
import { ContactGlyph, MailGlyph } from "@/components/mac/glyphs";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/mac/asset-icons";
import { MacWindow } from "@/components/mac/window";
import { AppIcon, type Tone } from "@/components/mac/app-icon";

type Tile = { href: string; label: string; tone: Tone; icon: React.ReactNode };

const tiles: Tile[] = [
  { href: "https://github.com/Somilg11", label: "GitHub", tone: "graphite", icon: <GithubIcon size={19} /> },
  { href: "https://x.com/somil_1101", label: "X", tone: "graphite", icon: <TwitterIcon size={17} /> },
  { href: "mailto:gsomil93@gmail.com", label: "Mail", tone: "blue", icon: <MailGlyph size={19} /> },
  { href: "https://discord.com/kakashi_11_", label: "Discord", tone: "indigo", icon: <SiDiscord size={15} /> },
  { href: "https://www.linkedin.com/in/somil-1101s/", label: "LinkedIn", tone: "blue", icon: <LinkedinIcon size={19} /> },
  { href: "https://codolio.com/profile/strangecodes", label: "Codolio", tone: "teal", icon: <ContactGlyph size={19} /> },
];

export default function LinksCard() {
  return (
    <MacWindow title="Links" className="w-full" bodyClassName="p-2.5" delay={0.1}>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((tile) => (
          <a
            key={tile.label}
            href={tile.href}
            target={tile.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            title={tile.label}
            className="group flex flex-col items-center gap-1 rounded-mac p-1.5 transition-colors duration-150 hover:bg-foreground/[0.05]"
          >
            <AppIcon
              tone={tile.tone}
              size="md"
              className="transition-transform duration-150 ease-mac-spring group-hover:-translate-y-0.5 group-active:scale-95"
            >
              {tile.icon}
            </AppIcon>
            <span className="text-[10.5px] leading-none text-muted-foreground group-hover:text-foreground">
              {tile.label}
            </span>
          </a>
        ))}
      </div>
    </MacWindow>
  );
}
