# Product Requirements Document (PRD)

## 1. Executive Summary

**Product Name:** EddiPRINCE.com  
**Vision:** A living digital archive, personal knowledge headquarters, and founder build log documenting the journey from zero to scale.  
**Primary Archetype:** Personal Knowledge Graph + Editorial Publication + Founder Build Log.  
**Target Audience:** Fellow founders, engineers, researchers, prospective collaborators, investors, and curious learners exploring AI, commerce, and systems architecture.  

EddiPRINCE.com rejects "synthetic prestige"—inflated traction metrics, fake logos, and borrowed authority. Instead, it provides an authentic, compounding intellectual record of real projects, architectural experiments, field notes, milestones, resources, and core beliefs.

---

## 2. Core Philosophy & Guiding Principles

1. **Radical Honesty & Zero Synthetic Prestige**: Every project status, metric, and timeline reflects genuine state (e.g., prototypes are labeled prototypes; abandoned hypotheses document their failures).
2. **Action Before Publishing**: Writing and conceptual models follow real engineering and testing, not vice versa.
3. **The Compounding Digital Garden**: Artifacts are not isolated blog posts or portfolio cards—they are interconnected nodes in a personal archive graph.
4. **Editorial Craft**: High-contrast typography, generous negative space, warm-neutral palettes, and distraction-free readability.
5. **Human & Thoughtful Tone**: Objective, curious, and reflective—free from buzzword-heavy corporate speak or generic SaaS marketing copy.

---

## 3. Core Graph Model & Entity Taxonomy

The digital archive revolves around seven core connected entities:

| Entity | Description | Primary View | Graph Role |
| :--- | :--- | :--- | :--- |
| **PERSON** | EddiPRINCE (founder, builder, creator) | `/about`, `/now` | Central author & steward |
| **PROJECT** | Software products, marketplaces, and systems | `/builds` (detail: `/build-detail`) | Practical execution & architecture |
| **ARTICLE** | Field notes, analytical essays, architectural breakdowns | `/notes` (detail: `/note-detail`) | Long-form intellectual synthesis |
| **EXPERIMENT** | Lab hypotheses, tests, prototypes, and failure logs | `/lab` (detail: `/lab-detail`) | Scientific iteration & rapid learning |
| **MILESTONE** | Chronological founder progress log from day zero | `/journey` | Ground-truth timeline & historical record |
| **RESOURCE** | Curated books, research papers, frameworks, and tools | `/resources` | Foundational inputs & reference library |
| **IDEA** | Core beliefs, mental models, and operating principles | `/about` (Core Beliefs) | Philosophical baseline guiding decisions |

### Relationship Rules
- **Projects** cite related Field Notes, Experiments, Milestones, Ideas, and Resources.
- **Field Notes** reference parent Projects, predecessor Experiments, and formative Resources.
- **Experiments** link to their target Project, generating Notes and Milestones.
- **Milestones** anchor to Projects, Field Notes, or Experiments launched on that date.
- **Resources & Ideas** cross-link to the practical work they inspired.

---

## 4. Key Functional Modules

### 4.1 Home (`/home`)
- **Hero & Identity**: Clean editorial declaration of purpose, current status badge ("Available for strategic collaboration & advisory"), and quick actions.
- **Archive Navigation**: Instant paths into Builds, Lab, Field Notes, Journey, Now, and Resources.
- **Featured Flagship Project**: Deep dive into current focus (e.g., *Tatashi Market*), highlighting status, architecture, and live artifacts.
- **Recent Field Notes & Active Lab Tests**: Highlighting the latest publications and hypothesis tests.
- **Core Principles**: Compact preview of foundational axioms.

### 4.2 Builds & Projects (`/builds`)
- **Listing View**: Filterable by category (*Marketplace & Commerce*, *AI & Systems*, *Developer Tools*, etc.) and status (*In Progress*, *Prototype*, *Early Development*).
- **Detail View**:
  - Problem statement, solution architecture, technical stack badges.
  - Development timeline and roadmap.
  - Outbound links (GitHub repository, live demo, design docs).
  - **Connected in the Archive**: Automated list of related field notes, lab tests, milestones, and principles.

### 4.3 The Lab (`/lab`)
- **Hypothesis-Driven Experimentation**: Each experiment includes Hypothesis, Test Methodology, Outcome, Confidence Level, and Status (*Active*, *Validated*, *Inconclusive*, *Archived*).
- **Failure Transparency**: Failed or invalidated experiments are preserved with honest post-mortems.
- **Graph Connections**: Direct links to projects influenced by the experiment.

### 4.4 Field Notes (`/notes`)
- **Editorial Long-Form Essays**: Formatted with serif typography for immersion, reading time indicators, table of contents, and tagged categories.
- **In-Text Cross-References**: In-line callouts and breadcrumbs back to the archive.
- **Author Attribution**: Exclusively authored by **EddiPRINCE**.

### 4.5 The Journey (`/journey`)
- **Milestone Timeline**: Chronological log starting from Day Zero (September 2026).
- **Categorization**: Filters for *Ideas*, *Projects Started*, *Launches*, *Failures*, and *Lessons*.
- **Metrics Transparency**: Honest tracking of real progress without manufactured vanity stats.

### 4.6 /now Page (`/now`)
- Following Derek Sivers' `/now` movement:
  - What EddiPRINCE is actively building this week.
  - Active learning topics and research papers.
  - Books and essays currently on the reading list.
  - Current intellectual questions and next milestones.

### 4.7 Curated Resources (`/resources`)
- Categorized archive of books, whitepapers, software libraries, and mental models.
- "Why it matters" commentary explaining how each resource shaped EddiPRINCE's work.

### 4.8 About & Core Beliefs (`/about`)
- Biography and background without exaggerated resumes.
- "What I'm building towards" 10-year vision.
- The 6 foundational operating principles with related project links.

### 4.9 Global Search (`Cmd+K` / `/`)
- Instant modal searching across all 6 entity types.
- Keyboard navigation (Arrow keys + Enter), categorized badges, and instant jumping.

### 4.10 Direct Communication & Contact Modal
- Quick copy email (`davidabbahinnocent@gmail.com`).
- Direct message dispatch interface with topic selection (Collaboration, Architecture, General Inquiry).

---

## 5. Non-Functional Requirements

- **Performance**: Instant client-side routing; asset footprint minimal; zero heavy dependencies.
- **Accessibility**: WCAG AA compliant contrast ratios in both light and dark modes. Keyboard navigation for all modals and search.
- **Theming**: System-aware light/dark mode with manual toggle; persistent in `localStorage`; eliminates flash of unstyled theme.
- **SEO & Social**: Dynamic page `<title>` updating per route; OpenGraph and Twitter card metadata; Schema.org JSON-LD Person and WebSite markup.
