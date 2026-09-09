# Project Scaffolding & Codebase Structure

This document provides a comprehensive structural guide to the files, folders, and component patterns across **EddiPRINCE.com**.

---

## 1. Directory Tree Overview

```
.
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignored files & directories
├── AGENTS.md                        # Persistent context & rules for AI coding agents
├── ARCHITECTURE.md                  # Comprehensive technical architecture
├── ARCHITECTURE - ESSENTIALS.md     # Fast-reference developer cheat sheet
├── GOOGLE AI STUDIO.md              # Google AI Studio platform runtime specifications
├── PRD.md                           # Product Requirements Document
├── SCAFFOLDING.md                   # This file (Codebase structure reference)
├── index.html                       # Entry HTML with typography, meta, & JSON-LD schema
├── metadata.json                    # AI Studio applet metadata & permissions
├── package.json                     # Dependencies, scripts, and package manifests
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite configuration (port 3000, plugins)
│
├── public/                          # Static public assets
│
└── src/                             # Application source code
    ├── main.tsx                     # React DOM entry point
    ├── App.tsx                      # Root shell, routing state, theme, & modals
    ├── index.css                    # Tailwind CSS v4 setup & dark mode custom variants
    ├── types.ts                     # Central TypeScript interfaces, enums, & types
    │
    ├── components/                  # Reusable UI & structural components
    │   ├── Breadcrumb.tsx           # Contextual navigation trail
    │   ├── ConnectedArchiveSection.tsx # Automatic cross-referencing archive cards
    │   ├── ContactModal.tsx         # Direct contact modal with email copy & form
    │   ├── Footer.tsx               # Site footer with brand, status, & directory links
    │   ├── GlobalSearchModal.tsx    # Cmd+K / / quick-find modal across all archive nodes
    │   ├── Header.tsx               # Sticky header with logo, navigation, search, & theme
    │   └── NewsletterSection.tsx    # Email newsletter / dispatch subscription box
    │
    ├── data/                        # Centralized content store & graph query engines
    │   ├── content.ts               # Core raw data (Projects, Notes, Lab, Milestones, Beliefs)
    │   └── archiveGraph.ts          # Bidirectional graph resolution & entity search engine
    │
    └── views/                       # Primary route views
        ├── AboutView.tsx            # Founder bio, 10-year vision, & core beliefs
        ├── BuildsView.tsx           # Projects listing & detailed architectural breakdowns
        ├── FieldNotesView.tsx       # Long-form essays with table of contents
        ├── HomeView.tsx             # Executive garden: featured projects, latest notes, & lab
        ├── JourneyView.tsx          # Chronological founder milestone log
        ├── LabView.tsx              # Hypothesis-driven experiments & failure logs
        ├── NowView.tsx              # Current active focus (/now page)
        └── ResourcesView.tsx        # Curated library of books, papers, & tools
```

---

## 2. File Responsibilities & Scaffolding Guidelines

### Core Root Files
- **`src/types.ts`**: The single source of truth for TypeScript types. When adding any new property to projects, notes, or experiments, update its interface here first.
- **`src/App.tsx`**: Manages global client state (`currentPage`, `selectedItemId`, `isDarkMode`, `isSearchOpen`, `isContactOpen`), keyboard shortcut listeners (`Cmd+K`, `/`), and route rendering.
- **`src/index.css`**: Configures Tailwind v4, custom CSS variables, custom font utilities, and `@custom-variant dark (&:where(.dark, .dark *));`.

### The Graph Engine (`src/data/`)
- **`src/data/content.ts`**: Holds the structured data collections (`PROJECTS`, `FIELD_NOTES`, `LAB_EXPERIMENTS`, `JOURNEY_MILESTONES`, `RESOURCES`, `BELIEFS`, `NOW_DATA`).
- **`src/data/archiveGraph.ts`**: Contains graph traversal logic (`getConnectedArchiveContext`, `searchArchive`, and entity getters by ID/slug).

### Component Scaffolding Pattern
When building new modular UI components:
1. Place in `/src/components/`.
2. Follow responsive mobile-first Tailwind design (`sm:`, `md:`, `lg:`).
3. Support both light and dark modes explicitly.
4. Ensure interactive elements have unique and meaningful `id` attributes.

### View Scaffolding Pattern
When adding a new section or view:
1. Define the route key in `PageRoute` inside `/src/types.ts`.
2. Create `src/views/MyNewView.tsx`.
3. Include the `Breadcrumb` component at the top of the view.
4. Include `ConnectedArchiveSection` where appropriate to tie into the knowledge graph.
5. Add the navigation link into `/src/components/Header.tsx` and `/src/components/Footer.tsx`.
6. Mount the view in `/src/App.tsx`'s view switch statement and update dynamic title synchronization.
