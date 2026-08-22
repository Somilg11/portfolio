"use client";

import React from "react";

const groups: { label: string; rows: [string, string][] }[] = [
  {
    label: "Navigation",
    rows: [
      ["Spotlight search", "⌘K"],
      ["Home / desktop", "⌘1"],
      ["Projects", "⌘2"],
      ["Experience", "⌘3"],
      ["Achievements", "⌘4"],
      ["Blog", "⌘5"],
    ],
  },
  {
    label: "Windows",
    rows: [
      ["Close window", "⌘W"],
      ["Minimize window", "⌘M"],
      ["Zoom window", "double-click title bar"],
      ["Hide all windows", "⌥⌘H"],
      ["Move window", "drag title bar"],
      ["Resize window", "drag bottom-right corner"],
    ],
  },
  {
    label: "Actions",
    rows: [
      ["Download resume", "⌘S"],
      ["Print", "⌘P"],
      ["Toggle appearance", "menu bar · View"],
      ["Toggle interface sounds", "menu bar · speaker"],
    ],
  },
];

export function ShortcutsApp() {
  return (
    <div className="space-y-5 p-5">
      {groups.map((group) => (
        <section key={group.label}>
          <h2 className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {group.label}
          </h2>
          <dl className="space-y-1">
            {group.rows.map(([label, keys]) => (
              <div key={label} className="flex items-center justify-between gap-4 text-[13px]">
                <dt className="text-foreground/85">{label}</dt>
                <dd className="shrink-0 rounded-[5px] border border-border bg-background/60 px-1.5 py-0.5 text-[11.5px] text-muted-foreground">
                  {keys}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
