export type ProjectCategory = "product" | "backend" | "systems" | "ai";

export type ProjectShot = {
  src: string;
  caption: string;
};

export type ProjectHighlight = {
  title: string;
  body: string;
};

export type Project = {
  /** Stable id; also the folder under /public/projects that holds the shots. */
  slug: string;
  title: string;
  /** One line for cards, lists and Spotlight. */
  tagline: string;
  /** A short paragraph for the detail view. */
  summary: string;
  /** Explaining cards: how it works and what is interesting about it. */
  highlights: ProjectHighlight[];
  stack: string[];
  categories: ProjectCategory[];
  year: number;
  repo: string;
  live?: string;
  docs?: string;
  cover: string;
  gallery?: ProjectShot[];
};

export const categoryLabels: Record<ProjectCategory, string> = {
  product: "Product",
  backend: "Backend",
  systems: "Systems",
  ai: "AI",
};

const shot = (slug: string, file: string) => `/projects/${slug}/${file}`;

/** Newest first. */
export const projects: Project[] = [
  {
    slug: "mini-revenant",
    title: "revenant mini",
    tagline: "Autonomous revenue recovery control plane for payments.",
    summary:
      "Revenant watches a payment stream, decides which failures are worth money, proves why, and refuses to act when acting loses. One loop over the event stream: detect, diagnose, quantify, decide, gate, act, verify, learn.",
    highlights: [
      {
        title: "Finds the failure the dashboard hides",
        body: "Splits acceptance by dimension, so an 8-hour collapse in international cards (8.8% to 29.6% failures) shows up instead of being averaged into a few points.",
      },
      {
        title: "Acts only when it pays",
        body: "Each failed payment gets a rupee value, and a policy gate must approve a fix before it runs. Retries are idempotent, so nothing is charged twice.",
      },
      {
        title: "Measured, not claimed",
        body: "₹17.2L incremental revenue over blind retries with fewer interventions, and international acceptance from 67.9% to 84.8%, on held-out data.",
      },
      {
        title: "Postgres does the heavy lifting",
        body: "Outbox with SKIP LOCKED, partial unique indexes as business rules and LISTEN/NOTIFY inside the writing transaction. 336 unit and 98 integration tests.",
      },
    ],
    stack: ["Bun", "TypeScript", "Hono", "PostgreSQL", "Next.js", "AI SDK", "Zod"],
    categories: ["backend", "ai"],
    year: 2026,
    repo: "https://github.com/Somilg11/mini-revenant",
    cover: shot("mini-revenant", "cover.jpg"),
    gallery: [
      { src: shot("mini-revenant", "cover.jpg"), caption: "Command center" },
      { src: shot("mini-revenant", "incident.jpg"), caption: "Incident diagnosis" },
      { src: shot("mini-revenant", "recovery.jpg"), caption: "Recovery and verification" },
    ],
  },
  {
    slug: "slowfw",
    title: "slowfw",
    tagline: "SlowAPI: one Python handler, served over WSGI and ASGI.",
    summary:
      "A Python web framework that is a WSGI application and an ASGI application at the same time. Express ergonomics, FastAPI typing and NestJS structure, with zero required runtime dependencies. Write the handler that fits the work and pick the server later.",
    highlights: [
      {
        title: "No sync-vs-async lock-in",
        body: "The same file runs under gunicorn and uvicorn. Sync handlers work on ASGI, async handlers work on WSGI, with no shim or rewrite.",
      },
      {
        title: "Picks the cheapest path per route",
        body: "At registration it checks whether a route's whole chain (middleware, guards, pipes, dependencies) is synchronous. A fully sync WSGI request never creates an event loop.",
      },
      {
        title: "One long-lived loop per process",
        body: "Async connection pools and locks survive across requests on a gunicorn worker, instead of an asyncio.run per request.",
      },
    ],
    stack: ["Python", "WSGI", "ASGI", "OpenAPI"],
    categories: ["systems"],
    year: 2026,
    repo: "https://github.com/Somilg11/slowfw",
    docs: "https://somilg11.github.io/slowfw/",
    cover: shot("slowfw", "cover.jpg"),
  },
  {
    slug: "lithos",
    title: "lithos",
    tagline: "LSM-tree key-value storage engine in C++17, served through Rust.",
    summary:
      "An embeddable key-value database built around a Log-Structured Merge Tree. The engine is C++17, exposed through a Rust cxx FFI bridge and an Axum REST API, and monitored from a Next.js telemetry dashboard.",
    highlights: [
      {
        title: "Write path",
        body: "Every write hits a write-ahead log, then a skip-list memtable. Full memtables flush to sorted string tables at L0.",
      },
      {
        title: "Background compaction",
        body: "SSTables merge down through L0, L1 and L2, keeping reads bounded as data grows. Blocks are compressed on disk.",
      },
      {
        title: "Bloom filters on reads",
        body: "Each table carries a Bloom filter, so lookups skip files that cannot hold the key.",
      },
      {
        title: "Rust around C++",
        body: "A zero-cost cxx bridge exposes the engine to Rust safely; Axum serves it and the dashboard shows the engine live.",
      },
    ],
    stack: ["C++", "Rust", "Axum", "Next.js", "TypeScript"],
    categories: ["systems"],
    year: 2026,
    repo: "https://github.com/Somilg11/lithos",
    cover: shot("lithos", "cover.jpg"),
    gallery: [
      { src: shot("lithos", "cover.jpg"), caption: "Telemetry dashboard" },
      { src: shot("lithos", "visualizer.jpg"), caption: "Storage engine visualizer" },
      { src: shot("lithos", "simulation.jpg"), caption: "LSM tree simulation" },
    ],
  },
  {
    slug: "guts",
    title: "guts",
    tagline: "Schema validation for Node.js, compiled to native Rust.",
    summary:
      "A structural schema validation library with a fluent, Zod-like JavaScript API and a native Rust engine behind it. Schemas compile once into Rust enum blueprints, so hot paths skip JavaScript parsing entirely. Published on npm as guts-validator.",
    highlights: [
      {
        title: "Compile once, validate fast",
        body: "Schema shapes become optimised Rust variants at instantiation, avoiding the V8 JIT bailouts and GC churn of tree-walking validators.",
      },
      {
        title: "Streaming AI output",
        body: "Validates incomplete JSON chunks from LLM streams, repairing missing closing syntax on the fly instead of crashing mid-stream.",
      },
      {
        title: "Coercion and precise errors",
        body: "Coerces stringified numbers and booleans inside native loops, and reports nested paths like routing.table.0.gateway.",
      },
    ],
    stack: ["Rust", "NAPI-RS", "Node.js", "TypeScript"],
    categories: ["systems"],
    year: 2026,
    repo: "https://github.com/Somilg11/guts",
    live: "https://guts-validator.vercel.app/",
    cover: shot("guts", "cover.jpg"),
  },
  {
    slug: "unimeds",
    title: "unimeds",
    tagline: "Multi-tenant healthcare SaaS for patients, doctors and clinics.",
    summary:
      "Book doctors at nearby clinics, keep medical records in one private place, and give clinics a calm way to run bookings, schedules and their team. Four roles: patient, doctor, clinic admin and super admin.",
    highlights: [
      {
        title: "Four roles, one platform",
        body: "Patients book and share records per visit, doctors get a mobile-first day view, clinic admins run the front desk and team, and a super admin onboards clinics.",
      },
      {
        title: "Scheduling that holds up",
        body: "Slots are computed in each clinic's timezone, a database constraint prevents double-booking, and booking rules are enforced server-side.",
      },
      {
        title: "Private by construction",
        body: "The browser never holds the API token, every request is authorised per role and clinic, and medical files stream only after an access check.",
      },
    ],
    stack: ["Next.js", "Express", "PostgreSQL", "Drizzle", "TanStack Query", "Tailwindcss"],
    categories: ["product"],
    year: 2026,
    repo: "https://github.com/Somilg11/unimeds",
    cover: shot("unimeds", "cover.jpg"),
    gallery: [
      { src: shot("unimeds", "cover.jpg"), caption: "Landing page" },
      { src: shot("unimeds", "clinic-overview.jpg"), caption: "Clinic overview" },
      { src: shot("unimeds", "doctor-directory.jpg"), caption: "Find a doctor" },
    ],
  },
  {
    slug: "mirage",
    title: "mirage",
    tagline: "Prediction market with a real central limit order book.",
    summary:
      "A full-stack paper-trading prediction market. Trade Yes/No shares on real-world events with price-time priority matching, escrowed balances, live order books and price history, with Solana wallet sign-in.",
    highlights: [
      {
        title: "A real order book",
        body: "One YES/NO book with price-time priority and self-trade prevention. Crossing orders settle by transfer, by minting a YES+NO pair, or by merging one.",
      },
      {
        title: "Escrow everywhere",
        body: "Buys lock cash and sells lock shares; cancelling refunds immediately. Resolution refunds open orders and pays $1.00 per winning share.",
      },
      {
        title: "Market-grade UI",
        body: "Depth-shaded ladders, charts built from real trades, a bottom-sheet ticket on mobile and a sticky trade panel on desktop.",
      },
    ],
    stack: ["TypeScript", "Bun", "Express", "React", "PostgreSQL", "Prisma", "Turborepo"],
    categories: ["product", "backend"],
    year: 2026,
    repo: "https://github.com/Somilg11/mirage",
    cover: shot("mirage", "cover.jpg"),
    gallery: [
      { src: shot("mirage", "cover.jpg"), caption: "Markets" },
      { src: shot("mirage", "market.jpg"), caption: "Market and order book" },
    ],
  },
  {
    slug: "quote",
    title: "quote",
    tagline: "Minimal Notion-style workspace with a built-in MCP server.",
    summary:
      "A self-hosted document workspace: nested pages, a block editor, real-time collaboration, workspaces and invites, and public share links. It exposes its own MCP server, so Claude, ChatGPT, Gemini, Cursor and VS Code can search, read and write pages directly.",
    highlights: [
      {
        title: "Collaboration without a realtime server",
        body: "Documents are Yjs CRDTs. Clients append updates to a log in Postgres and poll adaptively (1.2s active, 30s hidden), trading a second of latency for zero realtime infrastructure.",
      },
      {
        title: "Local-first editing",
        body: "Pages render from IndexedDB before the network answers, and queued edits replay after a dropped connection.",
      },
      {
        title: "MCP for your assistants",
        body: "JSON-RPC over streamable HTTP with tools to list, search, read, create, update and share pages. Tokens are hashed at rest and revocable.",
      },
    ],
    stack: ["Next.js", "TypeScript", "TipTap", "Yjs", "PostgreSQL", "Prisma"],
    categories: ["product", "ai"],
    year: 2026,
    repo: "https://github.com/Somilg11/quote",
    live: "https://quotemini.vercel.app/",
    cover: shot("quote", "cover.jpg"),
  },
  {
    slug: "nodal",
    title: "nodal",
    tagline: "Visual DAG orchestrator for AI and media workflows.",
    summary:
      "A drag-and-drop canvas for building automation graphs. Nodes for text, LLM calls, image and video upload, cropping and frame extraction are wired together and executed as a DAG on Trigger.dev background queues.",
    highlights: [
      {
        title: "Topological execution",
        body: "The orchestrator walks the graph, runs independent branches in parallel and waits on upstream results before each node fires.",
      },
      {
        title: "Media and vision pipelines",
        body: "Uploads stream to Transloadit; FFmpeg steps crop images or extract video frames, and Gemini analyses the result.",
      },
      {
        title: "Replayable history",
        body: "Every run is stored in Postgres, and the sidebar restores each node's output for inspection.",
      },
    ],
    stack: ["Next.js", "TypeScript", "React Flow", "Trigger.dev", "PostgreSQL", "Prisma", "Gemini"],
    categories: ["product", "ai"],
    year: 2026,
    repo: "https://github.com/Somilg11/nodal",
    live: "https://nodal-workflow.vercel.app/",
    cover: shot("nodal", "cover.jpg"),
    gallery: [
      { src: shot("nodal", "cover.jpg"), caption: "Workflow canvas" },
      { src: shot("nodal", "image-analysis.jpg"), caption: "Image analysis flow" },
      { src: shot("nodal", "video-analysis.jpg"), caption: "Video analysis flow" },
    ],
  },
  {
    slug: "ledger-api",
    title: "ledger api",
    tagline: "Double-entry banking ledger API with idempotent transfers.",
    summary:
      "A production-style banking ledger in TypeScript. Every rupee that moves produces a balanced pair of journal entries, and the system can prove at any moment that total debits equal total credits. Ships with a React simulation console.",
    highlights: [
      {
        title: "Double-entry by default",
        body: "Transfers run in MongoDB multi-document transactions and always write two balanced journal legs; an admin check proves the books balance.",
      },
      {
        title: "Idempotent transfers",
        body: "Replaying a request with the same key returns the same transaction and moves the balance once, backed by Redis.",
      },
      {
        title: "Holds",
        body: "A hold reduces available balance while settled balance and the journal stay untouched until it is captured.",
      },
    ],
    stack: ["TypeScript", "Express", "MongoDB", "Redis", "React", "Docker"],
    categories: ["backend"],
    year: 2026,
    repo: "https://github.com/Somilg11/ledger_api",
    cover: shot("ledger-api", "cover.jpg"),
    gallery: [
      { src: shot("ledger-api", "cover.jpg"), caption: "Dashboard" },
      { src: shot("ledger-api", "idempotent-replay.jpg"), caption: "Idempotent replay" },
      { src: shot("ledger-api", "ledger.jpg"), caption: "Journal" },
    ],
  },
  {
    slug: "nautilus",
    title: "nautilus",
    tagline: "Open-source canvas to design, simulate and explain architecture.",
    summary:
      "A browser-only system design tool where a diagram is a real directed graph, so it can be simulated, load-tested, reviewed by AI and diffed as JSON. No accounts, no backend, no lock-in.",
    highlights: [
      {
        title: "Flow simulation",
        body: "Watch requests traverse the architecture step by step; cycles, dangling edges and isolated nodes are reported instead of failing silently.",
      },
      {
        title: "Load, capacity and cost",
        body: "Give nodes capacity, latency and price, push traffic through and see p95 latency, bottlenecks, replica sizing and the monthly bill.",
      },
      {
        title: "Failure injection and AI review",
        body: "Take a node out and see what survives. A bring-your-own-key assistant can design, extend or review the canvas.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "React Flow", "Tailwindcss"],
    categories: ["product", "ai"],
    year: 2025,
    repo: "https://github.com/Somilg11/nautilus",
    live: "https://nautilusss.vercel.app/",
    cover: shot("nautilus", "cover.jpg"),
  },
  {
    slug: "impulse",
    title: "impulse",
    tagline: "Browser API client for REST and WebSocket, built for teams.",
    summary:
      "Test REST and WebSocket APIs in the browser, share collections with your team, switch environments in a keystroke, and still reach the server running on your laptop.",
    highlights: [
      {
        title: "Browser first, proxy fallback",
        body: "Requests go from the browser first and fall back to a server proxy only on transport failure, so both localhost and CORS-less APIs are reachable.",
      },
      {
        title: "Hardened proxy",
        body: "The proxy is authenticated, rate limited and size capped, and every target and redirect hop is checked against private ranges after DNS resolution.",
      },
      {
        title: "Team workflow",
        body: "Shared workspaces with roles, environments with variable substitution, Postman v2.1 import and export, and a collection runner.",
      },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Zustand", "Monaco", "Socket"],
    categories: ["product"],
    year: 2025,
    repo: "https://github.com/Somilg11/impulse",
    live: "https://impulse-api.vercel.app/",
    cover: shot("impulse", "cover.jpg"),
    gallery: [
      { src: shot("impulse", "cover.jpg"), caption: "Workspace" },
      { src: shot("impulse", "environments.jpg"), caption: "Environments" },
      { src: shot("impulse", "runner.jpg"), caption: "Collection runner" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
