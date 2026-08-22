import React from "react";

/**
 * Glyphs in the shape language of macOS system apps.
 * Apple's own artwork can't be redistributed, so these are originals:
 * monochrome strokes on a 24×24 grid, drawn with currentColor so they read
 * on any tile tint.
 */

type GlyphProps = { size?: number; className?: string };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  xmlns: "http://www.w3.org/2000/svg",
  className,
});

/** Finder — the two-tone face, reduced to a mark. */
export function FinderGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.6" />
      <path d="M12 4.2v6" opacity="0.55" />
      <path d="M8.4 10.2v1.4M15.6 10.2v1.4" />
      <path d="M8 15.4c1.2 1.2 2.5 1.8 4 1.8s2.8-.6 4-1.8" />
    </svg>
  );
}

/** Folder with a raised tab. */
export function FolderGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3.4 8.2c0-1 .8-1.8 1.8-1.8h3.4l1.9 2.1h8.3c1 0 1.8.8 1.8 1.8v6.6c0 1-.8 1.8-1.8 1.8H5.2c-1 0-1.8-.8-1.8-1.8V8.2Z" />
    </svg>
  );
}

/** Mail — envelope with a folded flap. */
export function MailGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3.2" y="5.6" width="17.6" height="12.8" rx="2.6" />
      <path d="m4.8 8.4 7.2 5 7.2-5" />
    </svg>
  );
}

/** Notes — ruled page with a header band. */
export function NotesGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="4.4" y="3.4" width="15.2" height="17.2" rx="2.6" />
      <path d="M4.4 8h15.2" />
      <path d="M7.8 11.6h8.4M7.8 14.6h8.4M7.8 17.6h5" opacity="0.75" />
    </svg>
  );
}

/** Compass needle, Safari style. */
export function CompassGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m15.8 8.2-1.9 5.7-5.7 1.9 1.9-5.7 5.7-1.9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Work case with a handle. */
export function CaseGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3.2" y="6.8" width="17.6" height="12.6" rx="2.6" />
      <path d="M9 6.8V5.9c0-.9.7-1.6 1.6-1.6h2.8c.9 0 1.6.7 1.6 1.6v.9" />
      <path d="M3.2 12.6h17.6" opacity="0.75" />
    </svg>
  );
}

/** Trophy on a plinth. */
export function TrophyGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7.4 4.2h9.2v4.9a4.6 4.6 0 0 1-9.2 0V4.2Z" />
      <path d="M7.4 5.8H5.1v1a3 3 0 0 0 2.4 2.9M16.6 5.8h2.3v1a3 3 0 0 1-2.4 2.9" />
      <path d="M12 13.8v3.4M8.2 19.6h7.6" />
    </svg>
  );
}

/** Document with a folded corner. */
export function DocGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M6.2 5c0-1 .8-1.8 1.8-1.8h5.6l4.2 4.3v11.5c0 1-.8 1.8-1.8 1.8H8c-1 0-1.8-.8-1.8-1.8V5Z" />
      <path d="M13.4 3.4v3.4c0 .7.5 1.2 1.2 1.2h3.2" />
      <path d="M9.2 13h5.6M9.2 16h3.8" opacity="0.75" />
    </svg>
  );
}

/** Contact card. */
export function ContactGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3.2" y="4.8" width="17.6" height="14.4" rx="2.6" />
      <circle cx="9.4" cy="10.4" r="2" />
      <path d="M6.4 16c.6-1.5 1.7-2.3 3-2.3s2.4.8 3 2.3" />
      <path d="M15.4 9.8h3M15.4 12.8h3" opacity="0.75" />
    </svg>
  );
}

/** Terminal prompt. */
export function TerminalGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3.2" y="4.8" width="17.6" height="14.4" rx="2.6" />
      <path d="m7.6 9.8 2.7 2.5-2.7 2.5M13 14.8h3.6" />
    </svg>
  );
}

/** Activity graph. */
export function ChartGlyph({ size = 18, className }: GlyphProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3.2" y="4.8" width="17.6" height="14.4" rx="2.6" />
      <path d="m6.8 14.6 3-3.2 2.4 2.2 4-4.6" />
    </svg>
  );
}
