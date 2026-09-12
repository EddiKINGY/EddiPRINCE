import { PageRoute } from '../types';
import { PROJECTS, FIELD_NOTES, LAB_EXPERIMENTS } from '../data/content';

export interface RouteSeoMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  author?: string;
}

const BASE_URL = 'https://eddiprince.com';
const DEFAULT_AUTHOR = 'Eddi Prince';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/og-default.jpg`;

export function getRouteSeo(page: PageRoute, itemId?: string): RouteSeoMeta {
  switch (page) {
    case 'home':
      return {
        title: 'Eddi Prince — Building Ideas Into Systems',
        description: 'Personal digital headquarters and public archive of Eddi Prince. Documenting software architectures, day-zero learning, and commerce systems from scratch.',
        canonical: `${BASE_URL}/`,
        ogTitle: 'Eddi Prince — Building Ideas Into Systems',
        ogDescription: 'Personal digital headquarters and public archive of Eddi Prince. Documenting software architectures, day-zero learning, and commerce systems from scratch.',
        ogUrl: `${BASE_URL}/`,
        ogImage: `${BASE_URL}/og/og-home.jpg`,
        ogImageAlt: 'Eddi Prince — Building Ideas Into Systems',
        twitterTitle: 'Eddi Prince — Building Ideas Into Systems',
        twitterDescription: 'Personal digital headquarters and public archive of Eddi Prince. Documenting software architectures, day-zero learning, and commerce systems from scratch.',
        twitterImage: `${BASE_URL}/og/og-home.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };

    case 'about':
      return {
        title: 'About Eddi Prince — Creator, Builder & Founder-in-Progress',
        description: "Foundations, operating principles, and the anti-prestige philosophy behind Eddi Prince's journey building software from the zero state.",
        canonical: `${BASE_URL}/about`,
        ogTitle: 'About Eddi Prince — Creator, Builder & Founder-in-Progress',
        ogDescription: "Foundations, operating principles, and the anti-prestige philosophy behind Eddi Prince's journey building software from the zero state.",
        ogUrl: `${BASE_URL}/about`,
        ogImage: `${BASE_URL}/og/og-about.jpg`,
        ogImageAlt: 'About Eddi Prince — Foundations & Craft',
        twitterTitle: 'About Eddi Prince — Creator, Builder & Founder-in-Progress',
        twitterDescription: "Foundations, operating principles, and the anti-prestige philosophy behind Eddi Prince's journey building software from the zero state.",
        twitterImage: `${BASE_URL}/og/og-about.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };

    case 'builds':
    case 'build-detail': {
      if (itemId) {
        const project = PROJECTS.find((p) => p.id === itemId);
        if (project) {
          const detailTitle = `${project.title} — Builds | Eddi Prince`;
          const detailDesc = project.shortDescription || project.tagline;
          const isTatashi = project.id === 'tatashi-market';
          const projectOgImage = isTatashi
            ? `${BASE_URL}/og/og-project-tatashi-market.jpg`
            : `${BASE_URL}/og/og-builds.jpg`;

          return {
            title: detailTitle,
            description: detailDesc,
            canonical: `${BASE_URL}/builds/${project.id}`,
            ogTitle: detailTitle,
            ogDescription: detailDesc,
            ogUrl: `${BASE_URL}/builds/${project.id}`,
            ogImage: projectOgImage,
            ogImageAlt: `${project.title} — Status: ${project.status}`,
            twitterTitle: detailTitle,
            twitterDescription: detailDesc,
            twitterImage: projectOgImage,
            twitterCard: 'summary_large_image',
            author: DEFAULT_AUTHOR,
          };
        }
      }
      return {
        title: 'Builds — Eddi Prince',
        description: 'Production systems, working prototypes, and technical architectures built by Eddi Prince, including Tatashi Market for emerging merchant trade.',
        canonical: `${BASE_URL}/builds`,
        ogTitle: 'Builds — Eddi Prince',
        ogDescription: 'Production systems, working prototypes, and technical architectures built by Eddi Prince, including Tatashi Market for emerging merchant trade.',
        ogUrl: `${BASE_URL}/builds`,
        ogImage: `${BASE_URL}/og/og-builds.jpg`,
        ogImageAlt: 'Builds & Systems Architecture — Eddi Prince',
        twitterTitle: 'Builds — Eddi Prince',
        twitterDescription: 'Production systems, working prototypes, and technical architectures built by Eddi Prince, including Tatashi Market for emerging merchant trade.',
        twitterImage: `${BASE_URL}/og/og-builds.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };
    }

    case 'writing':
    case 'notes':
    case 'note-detail': {
      if (itemId) {
        const note = FIELD_NOTES.find((n) => n.slug === itemId || n.id === itemId);
        if (note) {
          const noteTitle = `${note.title} — Writing | Eddi Prince`;
          const noteDesc = note.summary;
          let noteOgImage = `${BASE_URL}/og/og-writing.jpg`;

          if (note.slug === 'the-zero-state' || note.id === 'fn-001') {
            noteOgImage = `${BASE_URL}/og/og-note-the-zero-state.jpg`;
          } else if (note.slug === 'deconstructing-tatashi-market' || note.id === 'fn-002') {
            noteOgImage = `${BASE_URL}/og/og-note-deconstructing-tatashi-market.jpg`;
          } else if (note.slug === 'ai-leverage-and-velocity' || note.id === 'fn-003') {
            noteOgImage = `${BASE_URL}/og/og-note-ai-leverage-and-velocity.jpg`;
          }

          return {
            title: noteTitle,
            description: noteDesc,
            canonical: `${BASE_URL}/writing/${note.slug}`,
            ogTitle: noteTitle,
            ogDescription: noteDesc,
            ogUrl: `${BASE_URL}/writing/${note.slug}`,
            ogImage: noteOgImage,
            ogImageAlt: `${note.title} — Eddi Prince`,
            twitterTitle: noteTitle,
            twitterDescription: noteDesc,
            twitterImage: noteOgImage,
            twitterCard: 'summary_large_image',
            author: DEFAULT_AUTHOR,
          };
        }
      }
      return {
        title: 'Writing — Eddi Prince',
        description: 'Field notes, architectural essays, and deconstructions on distributed systems, AI leverage, and building software from day zero.',
        canonical: `${BASE_URL}/writing`,
        ogTitle: 'Writing — Eddi Prince',
        ogDescription: 'Field notes, architectural essays, and deconstructions on distributed systems, AI leverage, and building software from day zero.',
        ogUrl: `${BASE_URL}/writing`,
        ogImage: `${BASE_URL}/og/og-writing.jpg`,
        ogImageAlt: 'Field Notes & Architectural Essays — Eddi Prince',
        twitterTitle: 'Writing — Eddi Prince',
        twitterDescription: 'Field notes, architectural essays, and deconstructions on distributed systems, AI leverage, and building software from day zero.',
        twitterImage: `${BASE_URL}/og/og-writing.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };
    }

    case 'journey':
      return {
        title: 'The Journey — Eddi Prince',
        description: 'An honest chronological timeline documenting day-zero milestones, pivotal architectural choices, and lessons learned in the open.',
        canonical: `${BASE_URL}/journey`,
        ogTitle: 'The Journey — Eddi Prince',
        ogDescription: 'An honest chronological timeline documenting day-zero milestones, pivotal architectural choices, and lessons learned in the open.',
        ogUrl: `${BASE_URL}/journey`,
        ogImage: `${BASE_URL}/og/og-journey.jpg`,
        ogImageAlt: 'The Journey: Timeline from Day Zero — Eddi Prince',
        twitterTitle: 'The Journey — Eddi Prince',
        twitterDescription: 'An honest chronological timeline documenting day-zero milestones, pivotal architectural choices, and lessons learned in the open.',
        twitterImage: `${BASE_URL}/og/og-journey.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };

    case 'now':
      return {
        title: 'Now (/now) — Eddi Prince',
        description: 'What Eddi Prince is currently building, learning, exploring, and reading during the active cycle, updated regularly.',
        canonical: `${BASE_URL}/now`,
        ogTitle: 'Now (/now) — Eddi Prince',
        ogDescription: 'What Eddi Prince is currently building, learning, exploring, and reading during the active cycle, updated regularly.',
        ogUrl: `${BASE_URL}/now`,
        ogImage: `${BASE_URL}/og/og-now.jpg`,
        ogImageAlt: 'What I am Doing Now — Eddi Prince',
        twitterTitle: 'Now (/now) — Eddi Prince',
        twitterDescription: 'What Eddi Prince is currently building, learning, exploring, and reading during the active cycle, updated regularly.',
        twitterImage: `${BASE_URL}/og/og-now.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };

    case 'lab':
    case 'lab-detail': {
      if (itemId) {
        const exp = LAB_EXPERIMENTS.find((e) => e.id === itemId || e.slug === itemId);
        if (exp) {
          const expTitle = `${exp.title} — The Lab | Eddi Prince`;
          const expDesc = exp.hypothesis;
          return {
            title: expTitle,
            description: expDesc,
            canonical: `${BASE_URL}/lab/${exp.slug || exp.id}`,
            ogTitle: expTitle,
            ogDescription: expDesc,
            ogUrl: `${BASE_URL}/lab/${exp.slug || exp.id}`,
            ogImage: `${BASE_URL}/og/og-lab.jpg`,
            ogImageAlt: `The Lab: ${exp.title} — Eddi Prince`,
            twitterTitle: expTitle,
            twitterDescription: expDesc,
            twitterImage: `${BASE_URL}/og/og-lab.jpg`,
            twitterCard: 'summary_large_image',
            author: DEFAULT_AUTHOR,
          };
        }
      }
      return {
        title: 'The Lab — Eddi Prince',
        description: 'Falsifiable technical hypotheses, isolated code prototypes, and empirical investigations in distributed networks, AI, and security.',
        canonical: `${BASE_URL}/lab`,
        ogTitle: 'The Lab — Eddi Prince',
        ogDescription: 'Falsifiable technical hypotheses, isolated code prototypes, and empirical investigations in distributed networks, AI, and security.',
        ogUrl: `${BASE_URL}/lab`,
        ogImage: `${BASE_URL}/og/og-lab.jpg`,
        ogImageAlt: 'The Lab: Hypotheses & Experiments — Eddi Prince',
        twitterTitle: 'The Lab — Eddi Prince',
        twitterDescription: 'Falsifiable technical hypotheses, isolated code prototypes, and empirical investigations in distributed networks, AI, and security.',
        twitterImage: `${BASE_URL}/og/og-lab.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };
    }

    case 'resources':
      return {
        title: 'Curated Resources — Eddi Prince',
        description: "Books, foundational papers, developer tools, and mental models that shape Eddi Prince's architectural thinking.",
        canonical: `${BASE_URL}/resources`,
        ogTitle: 'Curated Resources — Eddi Prince',
        ogDescription: "Books, foundational papers, developer tools, and mental models that shape Eddi Prince's architectural thinking.",
        ogUrl: `${BASE_URL}/resources`,
        ogImage: `${BASE_URL}/og/og-resources.jpg`,
        ogImageAlt: 'Curated Resources & Foundations — Eddi Prince',
        twitterTitle: 'Curated Resources — Eddi Prince',
        twitterDescription: "Books, foundational papers, developer tools, and mental models that shape Eddi Prince's architectural thinking.",
        twitterImage: `${BASE_URL}/og/og-resources.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };

    case 'contact':
      return {
        title: 'Contact & Inquiries — Eddi Prince',
        description: 'Direct electronic channels to contact Eddi Prince for technical dialogue, architecture reviews, or inquiries.',
        canonical: `${BASE_URL}/contact`,
        ogTitle: 'Contact & Inquiries — Eddi Prince',
        ogDescription: 'Direct electronic channels to contact Eddi Prince for technical dialogue, architecture reviews, or inquiries.',
        ogUrl: `${BASE_URL}/contact`,
        ogImage: `${BASE_URL}/og/og-contact.jpg`,
        ogImageAlt: 'Contact & Inquiries — Eddi Prince',
        twitterTitle: 'Contact & Inquiries — Eddi Prince',
        twitterDescription: 'Direct electronic channels to contact Eddi Prince for technical dialogue, architecture reviews, or inquiries.',
        twitterImage: `${BASE_URL}/og/og-contact.jpg`,
        twitterCard: 'summary_large_image',
        author: DEFAULT_AUTHOR,
      };

    case 'privacy':
      return {
        title: 'Privacy & Data Ethics — Eddi Prince',
        description: 'Zero-surveillance privacy commitment: no tracking beacons, no third-party analytics pixels, and local-only client preferences.',
        canonical: `${BASE_URL}/privacy`,
        ogTitle: 'Privacy & Data Ethics — Eddi Prince',
        ogDescription: 'Zero-surveillance privacy commitment: no tracking beacons, no third-party analytics pixels, and local-only client preferences.',
        ogUrl: `${BASE_URL}/privacy`,
        ogImage: DEFAULT_OG_IMAGE,
        ogImageAlt: 'Privacy & Data Ethics — Eddi Prince',
        twitterTitle: 'Privacy & Data Ethics — Eddi Prince',
        twitterDescription: 'Zero-surveillance privacy commitment: no tracking beacons, no third-party analytics pixels, and local-only client preferences.',
        twitterImage: DEFAULT_OG_IMAGE,
        twitterCard: 'summary',
        author: DEFAULT_AUTHOR,
      };

    case 'terms':
      return {
        title: 'Terms of Use — Eddi Prince',
        description: 'Professional usage conditions and intellectual property disclosures for EddiPRINCE.com and upcoming software builds.',
        canonical: `${BASE_URL}/terms`,
        ogTitle: 'Terms of Use — Eddi Prince',
        ogDescription: 'Professional usage conditions and intellectual property disclosures for EddiPRINCE.com and upcoming software builds.',
        ogUrl: `${BASE_URL}/terms`,
        ogImage: DEFAULT_OG_IMAGE,
        ogImageAlt: 'Terms of Use — Eddi Prince',
        twitterTitle: 'Terms of Use — Eddi Prince',
        twitterDescription: 'Professional usage conditions and intellectual property disclosures for EddiPRINCE.com and upcoming software builds.',
        twitterImage: DEFAULT_OG_IMAGE,
        twitterCard: 'summary',
        author: DEFAULT_AUTHOR,
      };

    case 'trust':
      return {
        title: 'Trust & Operating Standards — Eddi Prince',
        description: 'Open source licensing, operating standards, technical colophon, and epistemic benchmarks for eddiprince.com.',
        canonical: `${BASE_URL}/trust`,
        ogTitle: 'Trust & Operating Standards — Eddi Prince',
        ogDescription: 'Open source licensing, operating standards, technical colophon, and epistemic benchmarks for eddiprince.com.',
        ogUrl: `${BASE_URL}/trust`,
        ogImage: DEFAULT_OG_IMAGE,
        ogImageAlt: 'Trust & Operating Standards — Eddi Prince',
        twitterTitle: 'Trust & Operating Standards — Eddi Prince',
        twitterDescription: 'Open source licensing, operating standards, technical colophon, and epistemic benchmarks for eddiprince.com.',
        twitterImage: DEFAULT_OG_IMAGE,
        twitterCard: 'summary',
        author: DEFAULT_AUTHOR,
      };

    case 'not-found':
    default:
      return {
        title: "404: This page doesn't exist — Eddi Prince",
        description: 'The requested artifact or route could not be located in the digital archive. Explore builds, read field notes, or return home.',
        canonical: `${BASE_URL}/404`,
        ogTitle: "404: This page doesn't exist — Eddi Prince",
        ogDescription: 'The requested artifact or route could not be located in the digital archive. Explore builds, read field notes, or return home.',
        ogUrl: `${BASE_URL}/404`,
        ogImage: DEFAULT_OG_IMAGE,
        ogImageAlt: "404: This page doesn't exist — Eddi Prince",
        twitterTitle: "404: This page doesn't exist — Eddi Prince",
        twitterDescription: 'The requested artifact or route could not be located in the digital archive.',
        twitterImage: DEFAULT_OG_IMAGE,
        twitterCard: 'summary',
        author: DEFAULT_AUTHOR,
      };
  }
}

/**
 * Dynamically updates document title and head meta tags for runtime client-side navigation.
 */
export function applySeoMeta(meta: RouteSeoMeta): void {
  if (typeof document === 'undefined') return;

  // Title
  document.title = meta.title;

  // Meta helper
  const setMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attributeName, attributeValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard description & author
  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
  if (meta.author) {
    setMetaTag('meta[name="author"]', 'name', 'author', meta.author);
  }

  // Canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonical);

  // Open Graph Core
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.ogTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.ogDescription);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', meta.ogUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');

  // Open Graph Image
  const ogImg = meta.ogImage || DEFAULT_OG_IMAGE;
  const ogAlt = meta.ogImageAlt || meta.title;
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImg);
  setMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', ogImg);
  setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/jpeg');
  setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
  setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
  setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', ogAlt);

  // Twitter / X Cards
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.twitterTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.twitterDescription);
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', meta.twitterCard || 'summary_large_image');
  const twImg = meta.twitterImage || ogImg;
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', twImg);
  setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', ogAlt);
}
