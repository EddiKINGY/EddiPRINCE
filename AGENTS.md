# Agent Instructions & Guidelines (AGENTS.md)

This file persists context, rules, and operational guidelines for AI coding assistants working in the **EddiPRINCE.com** codebase.

---

## 1. Brand Identity & Persona

- **Brand Name**: Always use **`EddiPRINCE`** (exact casing). Never alter to "Eddi Prince" or any lowercased variations.
- **Tone of Voice**: Editorial, cerebral, objective, humble, and authentic. 
- **Voice Archetype**: A technical founder and systems thinker documenting real learning from day zero.
- **Anti-Pattern**: Ban generic SaaS buzzwords ("supercharge", "unleash", "skyrocket") and synthetic authority (fake testimonials, exaggerated revenue numbers, fabricated enterprise logos).

---

## 2. Technical Architecture & Constraints

- **Client-Side SPA Architecture**: The application is a client-side React SPA with custom internal view routing (`currentPage`, `selectedItemId`).
- **No Unsolicited Backends**: Do NOT add Express servers, SQL instances, or background database servers unless the user explicitly requests one.
- **Port 3000 Mandate**: The development environment mandates port `3000` bound to `0.0.0.0`.
- **Styling**: Tailwind CSS v4. Always maintain class-based dark mode compatibility (`@custom-variant dark (&:where(.dark, .dark *));` in `src/index.css`).
- **Typography Pairing**:
  - `font-serif-display`: Instrument Serif (headings & editorial titles)
  - `font-sans-body`: Plus Jakarta Sans (body, UI, and navigation)
  - `font-mono-code`: JetBrains Mono (timestamps, tags, code snippets, metadata)

---

## 3. The Digital Archive Graph Rules

When editing or adding content to `src/data/content.ts`:
1. Every new item must include cross-referencing fields (`relatedProjects`, `relatedNotes`, `relatedExperiments`, `relatedMilestones`, `relatedIdeas`, `relatedResources`).
2. Graph queries are handled by `src/data/archiveGraph.ts`. When extending types in `src/types.ts`, ensure `ArchiveEntityType` is updated accordingly.
3. Views should include the `Breadcrumb` component for hierarchical navigation and the `ConnectedArchiveSection` for deep cross-linking.

---

## 4. Verification Workflow

Before completing any task:
1. Run `lint_applet` (`tsc --noEmit`) to catch any TypeScript type mismatches early.
2. Run `compile_applet` to confirm the production build completes cleanly.
3. Verify dark mode visual contrast and responsiveness across mobile and desktop viewports.
