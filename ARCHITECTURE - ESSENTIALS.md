# Architecture Essentials

A fast-reference guide for maintaining, extending, and developing EddiPRINCE.com.

---

## 1. Non-Negotiable Invariants

1. **Brand Identity**: Always spell and format the brand as **`EddiPRINCE`**. Never revert to "Eddi Prince" or any lowercased variations.
2. **Zero Synthetic Metrics**: Never inject fabricated user numbers, fake logos, or synthetic prestige. All projects, experiments, and milestones reflect their honest state.
3. **No Unsolicited Infrastructure**: Keep the application purely client-side SPA. Do not add express backends or remote databases unless explicitly requested by the user.
4. **Graph Discipline**: When adding any new piece of content, connect it to at least one other entity in the archive (e.g. a note must link to a project or milestone).
5. **Port & Server Rule**: Dev server must always run on port `3000` (host `0.0.0.0`).

---

## 2. Content Creation Cheat Sheet

All data resides in `src/data/content.ts`.

### Adding a Project (`PROJECTS`)
```ts
{
  id: 'unique-id',
  slug: 'url-slug',
  title: 'Project Name',
  tagline: 'One sentence explanation',
  description: 'Detailed description...',
  status: 'In Progress' | 'Prototype' | 'Early Development' | 'Shipped' | 'Paused',
  category: 'Marketplace & Commerce' | 'AI & Systems' | 'Developer Tools',
  tags: ['tag1', 'tag2'],
  completionPercentage: 35, // Honest percentage
  startDate: 'September 2026',
  featured: true,
  problemStatement: 'What problem does this solve?',
  solutionOverview: 'How does the architecture address it?',
  techStack: ['TypeScript', 'React', 'Tailwind CSS'],
  timeline: [{ date: 'September 2026', title: 'Milestone', notes: 'Notes' }],
  links: [{ label: 'GitHub', url: 'https://...', type: 'github' }],
  // Graph Relations:
  relatedFieldNotes: ['fn-slug-or-id'],
  relatedExperiments: ['lab-slug-or-id'],
  relatedMilestones: ['milestone-id'],
  relatedIdeas: ['b-1'],
  relatedResources: ['res-01']
}
```

### Adding a Field Note (`FIELD_NOTES`)
```ts
{
  id: 'fn-004',
  slug: 'my-new-note',
  title: 'Article Title',
  subtitle: 'Subtitle explaining the premise',
  author: 'EddiPRINCE',
  publicationDate: 'September 10, 2026',
  updatedDate: 'September 10, 2026',
  category: 'BUILDING' | 'TECHNOLOGY' | 'BUSINESS' | 'LIFE',
  tags: ['architecture', 'learning'],
  readingTime: '4 min read',
  featured: false,
  summary: 'Short abstract',
  tableOfContents: [{ id: 'section-id', label: 'Section Label', level: 2 }],
  content: ['### Section Label', 'Paragraph text...'],
  // Graph Relations:
  relatedProjects: ['tatashi-market'],
  relatedArticles: ['the-zero-state'],
  relatedExperiments: [],
  relatedMilestones: [],
  relatedIdeas: ['b-1'],
  relatedResources: ['res-02']
}
```

### Adding an Experiment (`LAB_EXPERIMENTS`)
```ts
{
  id: 'lab-004',
  slug: 'cache-invalidation-test',
  title: 'Experiment Title',
  hypothesis: 'If we do X, then Y will occur because Z.',
  status: 'ACTIVE' | 'VALIDATED' | 'INCONCLUSIVE' | 'ARCHIVED',
  confidence: 'MEDIUM' | 'HIGH' | 'LOW',
  dateStarted: 'September 2026',
  lastUpdated: 'September 2026',
  category: 'SYSTEMS' | 'COMMERCE' | 'AI',
  summary: 'Executive summary of findings',
  learnings: ['Key finding 1', 'Key finding 2'],
  relatedProject: 'tatashi-market',
  relatedNotes: ['deconstructing-tatashi-market']
}
```

---

## 3. Dark Mode Conventions

- Always test both light (`#FBFBFA`) and dark (`#0E0F12`) themes.
- Classes must use Tailwind dark variants: `text-neutral-900 dark:text-neutral-100`, `bg-white dark:bg-[#15171C]`, `border-neutral-200 dark:border-neutral-800`.
- Do NOT use arbitrary bright neon text in dark mode. Maintain WCAG AA legibility with warm/cool grays.

---

## 4. Key Shell & Validation Commands

```bash
# Verify TypeScript syntax and imports
npm run lint

# Build full production static assets
npm run build
```
