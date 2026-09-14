# System Architecture Document

## 1. Architecture Overview

EddiPRINCE.com is designed as a **client-side single-page application (SPA)** optimized for instantaneous transitions, editorial typography, and bidirectional graph querying without server round-trip latency.

### Technology Stack
- **Framework:** React 18+ with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4 with custom dark mode class variants
- **Icons:** `lucide-react`
- **Typography:** Instrument Serif (Display/Editorial), Plus Jakarta Sans (Interface/Body), JetBrains Mono (Metadata/Code)
- **State Management:** Reactive React hooks with `localStorage` synchronization for user preferences
- **Deployment Platform:** Google AI Studio / Cloud Run container with Nginx reverse proxy

---

## 2. Component Hierarchy & Layout Structure

```
App.tsx (Root State, Theme, Page Router, Global Listeners)
│
├── Header.tsx (Brand Logo, Navigation Links, Search Trigger, Dark Mode Toggle)
│
├── Main View Area (Dynamic based on currentPage state)
│   ├── HomeView.tsx
│   ├── BuildsView.tsx (List & Detail view for Projects)
│   ├── FieldNotesView.tsx (List & Article reader with TOC)
│   ├── LabView.tsx (List & Experiment detail cards)
│   ├── JourneyView.tsx (Chronological timeline filters)
│   ├── NowView.tsx (Active focus tracker)
│   ├── ResourcesView.tsx (Categorized reading list & tools)
│   └── AboutView.tsx (Bio, 10-year vision, Core Beliefs)
│
├── ConnectedArchiveSection.tsx (Injected in views to display related entities)
│
├── Breadcrumb.tsx (Subtle path navigation for deep pages)
│
├── NewsletterSection.tsx (Dispatch subscription)
│
├── Footer.tsx (Site links, status, and copyright)
│
├── GlobalSearchModal.tsx (Portal modal: Cmd+K / / shortcut)
│
└── ContactModal.tsx (Portal modal: Direct messaging & email copy)
```

---

## 3. The Archive Knowledge Graph

All data is modeled centrally in `/src/data/content.ts` and queried via graph resolvers in `/src/data/archiveGraph.ts`.

### 3.1 Entity Types & Relations
The graph connects 6 primary entities:

```
                  ┌──────────────┐
                  │    PERSON    │
                  │ (EddiPRINCE) │
                  └───────┬──────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
    ┌───────────┐   ┌───────────┐   ┌───────────┐
    │  PROJECT  │◄─►│ FIELD NOTE│◄─►│  RESOURCE │
    └─────┬─────┘   └─────┬─────┘   └───────────┘
          │               │               ▲
          ▼               ▼               │
    ┌───────────┐   ┌───────────┐         │
    │    LAB    │◄─►│ MILESTONE │─────────┘
    │ EXPERIMENT│   └─────┬─────┘
    └───────────┘         │
          ▲               ▼
          │         ┌───────────┐
          └─────────┤   IDEA    │
                    │ (BELIEF)  │
                    └───────────┘
```

### 3.2 Graph Resolution (`archiveGraph.ts`)
The function `getConnectedArchiveContext(type, idOrSlug)` performs bidirectional index lookups:
1. Direct relation resolution: reads array properties (e.g. `relatedFieldNotes`, `relatedProjects`, `relatedResources`).
2. Inverse relation resolution: scans other collections to find references pointing back to the subject node.
3. De-duplication: sets are converted to fully hydrated typed objects.

---

## 4. State Management & Navigation

### 4.1 Client-Side Route State
Routing is maintained in top-level state without requiring external routing libraries, preventing broken iframe history or sub-path rewrites in sandbox environments:
- `currentPage: PageRoute` (`'home' | 'about' | 'builds' | 'lab' | 'notes' | 'journey' | 'now' | 'resources'`)
- `selectedItemId: string | undefined` (used for selecting a specific project or note detail)

### 4.2 Dynamic SEO & Title Synchronization
An effect in `App.tsx` updates `document.title` on every route change:
- Format: `<View Title> — EddiPRINCE`
- Base: `EddiPRINCE — Building My Future From Scratch`

### 4.3 Dark Mode Synchronization
The dark theme is handled via Tailwind CSS v4 class strategy:
- Root class: `document.documentElement.classList.toggle('dark', isDarkMode)`
- Browser UI: `document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light'`
- Persistence: Stored under key `'theme-mode'` in `localStorage`.
- CSS Mapping: Defined in `src/index.css` using `@custom-variant dark (&:where(.dark, .dark *));`.

---

## 5. Styling & Typography Architecture

### 5.1 Design Tokens
- **Backgrounds:**
  - Light: `#FBFBFA` (soft warm paper)
  - Dark: `#0E0F12` (deep obsidian)
- **Text & Foreground:**
  - Light: `#191919` (primary high contrast), `#525252` (secondary neutral)
  - Dark: `#E8E9ED` (primary soft white), `#A1A1AA` (secondary neutral)
- **Borders & Dividers:**
  - Light: `border-neutral-200`
  - Dark: `border-neutral-800`

### 5.2 Font Hierarchy
1. **Editorial Headings:** `font-serif-display` (`'Instrument Serif', Georgia, serif`)
2. **Body & Controls:** `font-sans-body` (`'Plus Jakarta Sans', system-ui, sans-serif`)
3. **Metadata, Tags, IDs, Timestamps:** `font-mono-code` (`'JetBrains Mono', monospace`)

---

## 6. Build & Deployment Pipeline

- Development: `npm run dev` (Vite dev server bound to port 3000)
- Production Build: `npm run build` (`vite build`) producing static files in `/dist`
- Type Check & Lint: `npm run lint` (`tsc --noEmit`)

---

## 7. Secure Integration & Serverless Edge Boundary

To protect external API secrets and visitor privacy:
- **Architecture**: A lightweight serverless boundary using Cloudflare Pages Functions / Workers (`/functions/api/*`).
- **Endpoints**:
  - `POST /api/newsletter`: Validates email formats and delivers to Beehiiv API v2 using server-side `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID`.
  - `POST /api/contact`: Implements honeypot spam detection, strict length and character validation, server-side timestamp generation, and dispatches to verified contact endpoints or transactional mailers without client-exposed secrets.
- **Client Security Guarantee**:
  - Zero private credentials, API tokens, or webhook secrets are placed in `VITE_*` variables.
  - Zero visitor PII (inquiry messages or subscriber emails) is stored in browser `localStorage`.
  - Honest failure states: No synthetic fake success responses; errors are reported truthfully to visitors with direct mail fallback.

