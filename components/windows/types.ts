import type { Post } from "@/lib/posts";

export type WindowId =
  | "projects"
  | "experience"
  | "achievements"
  | "blog"
  | "shortcuts"
  | `post:${string}`;

export type WindowRect = { x: number; y: number; w: number; h: number };

export type WindowState = WindowRect & {
  id: WindowId;
  title: string;
  subtitle?: string;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** Rect to restore to when un-maximizing. */
  restore?: WindowRect;
};

export type WindowsContextValue = {
  windows: WindowState[];
  posts: Post[];
  open: (id: WindowId) => void;
  close: (id: WindowId) => void;
  closeAll: () => void;
  focus: (id: WindowId) => void;
  toggleMinimize: (id: WindowId) => void;
  minimizeAll: () => void;
  toggleMaximize: (id: WindowId) => void;
  isOpen: (id: WindowId) => boolean;
  focused: WindowId | null;
  move: (id: WindowId, x: number, y: number) => void;
  resize: (id: WindowId, w: number, h: number) => void;
};

/** Path each window maps to, so the address bar and deep links stay in sync. */
export function pathForWindow(id: WindowId): string {
  if (id.startsWith("post:")) return `/blog/${id.slice(5)}`;
  if (id === "shortcuts") return "/";
  return `/${id}`;
}

export function windowForPath(pathname: string): WindowId | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/projects") return "projects";
  if (clean === "/experience") return "experience";
  if (clean === "/achievements") return "achievements";
  if (clean === "/blog") return "blog";
  if (clean.startsWith("/blog/")) return `post:${clean.slice("/blog/".length)}`;
  return null;
}
