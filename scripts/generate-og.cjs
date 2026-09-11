const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.join(__dirname, '..', 'public', 'og');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine = 34) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function createOgSvg({
  badge,
  badgeColor = '#3B82F6',
  badgeBg = '#1E293B',
  title,
  subtitle,
  statusNotice = null,
  routePath = '',
  brandName = 'EDDI PRINCE',
}) {
  const titleLines = wrapText(title, title.length > 40 ? 32 : 36);
  const subtitleLines = subtitle ? wrapText(subtitle, 54) : [];

  const titleFontSize = titleLines.length > 2 ? 44 : 50;
  const titleLineHeight = titleFontSize + 14;
  const titleStartY = 240;

  const subtitleStartY = titleStartY + (titleLines.length * titleLineHeight) + 12;
  const subtitleFontSize = 22;
  const subtitleLineHeight = 32;

  // Build title tspans
  const titleSvg = titleLines.map((line, idx) => {
    return `<text x="80" y="${titleStartY + idx * titleLineHeight}" fill="#F9FAFB" font-family="Liberation Sans, -apple-system, sans-serif" font-size="${titleFontSize}" font-weight="700" letter-spacing="-0.5">${escapeXml(line)}</text>`;
  }).join('\n    ');

  // Build subtitle tspans
  const subtitleSvg = subtitleLines.map((line, idx) => {
    return `<text x="80" y="${subtitleStartY + idx * subtitleLineHeight}" fill="#9CA3AF" font-family="Liberation Sans, -apple-system, sans-serif" font-size="${subtitleFontSize}" font-weight="400">${escapeXml(line)}</text>`;
  }).join('\n    ');

  // Status Notice box (for projects or verified states)
  let statusBoxSvg = '';
  if (statusNotice) {
    const boxY = subtitleLines.length > 0
      ? subtitleStartY + (subtitleLines.length * subtitleLineHeight) + 20
      : titleStartY + (titleLines.length * titleLineHeight) + 24;

    statusBoxSvg = `
    <!-- Status Callout -->
    <g transform="translate(80, ${boxY})">
      <rect width="900" height="64" rx="10" fill="#13161F" stroke="#2A303F" stroke-width="1.5" />
      <circle cx="28" cy="32" r="6" fill="${statusNotice.dotColor || '#3B82F6'}" />
      <text x="48" y="29" fill="#E5E7EB" font-family="Liberation Sans, sans-serif" font-size="16" font-weight="700">${escapeXml(statusNotice.label)}</text>
      <text x="48" y="49" fill="#9CA3AF" font-family="Liberation Sans, sans-serif" font-size="14">${escapeXml(statusNotice.description)}</text>
    </g>`;
  }

  // Calculate badge width
  const badgeWidth = Math.max(140, badge.length * 10 + 36);

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0D11" />
      <stop offset="100%" stop-color="#141720" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Frame border -->
  <rect x="36" y="36" width="1128" height="558" rx="20" fill="none" stroke="#222631" stroke-width="2" />

  <!-- Header Section -->
  <text x="80" y="108" fill="#FFFFFF" font-family="Liberation Sans, -apple-system, sans-serif" font-size="28" font-weight="800" letter-spacing="2.5">${escapeXml(brandName)}</text>

  <!-- Category Badge -->
  <g transform="translate(${1120 - badgeWidth}, 78)">
    <rect width="${badgeWidth}" height="40" rx="8" fill="${badgeBg}" stroke="${badgeColor}" stroke-width="1.5" />
    <text x="${badgeWidth / 2}" y="25" fill="#E2E8F0" font-family="Liberation Mono, monospace" font-size="14" font-weight="700" text-anchor="middle" letter-spacing="1">${escapeXml(badge)}</text>
  </g>

  <!-- Divider Line -->
  <line x1="80" y1="145" x2="1120" y2="145" stroke="#1F232F" stroke-width="1.5" />

  <!-- Main Content: Title -->
  ${titleSvg}

  <!-- Main Content: Subtitle -->
  ${subtitleSvg}

  <!-- Optional Status Notice -->
  ${statusBoxSvg}

  <!-- Footer Section -->
  <line x1="80" y1="520" x2="1120" y2="520" stroke="#1F232F" stroke-width="1.5" />
  <text x="80" y="556" fill="#6B7280" font-family="Liberation Mono, monospace" font-size="18">https://eddiprince.com${escapeXml(routePath)}</text>
  <text x="1120" y="556" fill="#4B5563" font-family="Liberation Sans, -apple-system, sans-serif" font-size="16" font-weight="500" text-anchor="end">Building Ideas Into Systems</text>
</svg>`;
}

const IMAGES = [
  {
    filename: 'og-default.jpg',
    badge: 'DIGITAL ARCHIVE',
    badgeColor: '#3B82F6',
    badgeBg: '#1E293B',
    title: 'Building Ideas Into Systems',
    subtitle: 'Personal digital headquarters and public archive. Documenting software architectures, day-zero learning, and commerce systems from scratch.',
    routePath: '',
  },
  {
    filename: 'og-home.jpg',
    badge: 'DIGITAL ARCHIVE',
    badgeColor: '#3B82F6',
    badgeBg: '#1E293B',
    title: 'Eddi Prince — Building Ideas Into Systems',
    subtitle: 'Personal digital headquarters & architectural archive. Real projects, honest learning, and systems built from day zero.',
    routePath: '/',
  },
  {
    filename: 'og-about.jpg',
    badge: 'ABOUT & PRINCIPLES',
    badgeColor: '#8B5CF6',
    badgeBg: '#2E1065',
    title: 'About Eddi Prince — Foundations & Craft',
    subtitle: 'Operating principles, the zero-state discipline, and the anti-prestige philosophy behind building software from scratch.',
    routePath: '/about',
  },
  {
    filename: 'og-builds.jpg',
    badge: 'PRODUCTION BUILDS',
    badgeColor: '#10B981',
    badgeBg: '#064E3B',
    title: 'Builds & Systems Architecture',
    subtitle: 'Production software systems, architectural design specifications, and working code prototypes built in the open.',
    routePath: '/builds',
  },
  {
    filename: 'og-project-tatashi-market.jpg',
    badge: 'COMMERCE SYSTEM',
    badgeColor: '#10B981',
    badgeBg: '#064E3B',
    title: 'Tatashi Market: Cross-Border Verification Protocol',
    subtitle: 'Commerce infrastructure exploring merchant identity, localized milestone escrow, and trade settlement for emerging markets.',
    statusNotice: {
      label: 'STATUS: EARLY DEVELOPMENT (PRE-CODE SPECIFICATION)',
      description: 'System domain modeling and payment state machine design in progress. No fake volume or vanity metrics.',
      dotColor: '#F59E0B',
    },
    routePath: '/builds/tatashi-market',
  },
  {
    filename: 'og-writing.jpg',
    badge: 'FIELD NOTES',
    badgeColor: '#F59E0B',
    badgeBg: '#451A03',
    title: 'Field Notes & Architectural Essays',
    subtitle: 'In-depth essays on distributed systems, building from zero, AI leverage, and technical philosophy.',
    routePath: '/writing',
  },
  {
    filename: 'og-note-the-zero-state.jpg',
    badge: 'FIELD NOTE • ESSAY',
    badgeColor: '#F59E0B',
    badgeBg: '#451A03',
    title: 'The Zero State: Why I Chose to Document from Scratch',
    subtitle: 'On resisting the impulse to simulate authority and choosing the compounding leverage of public learning.',
    statusNotice: {
      label: 'AUTHOR: EDDI PRINCE • 5 MIN READ',
      description: 'Published in Field Notes • Building in Public, Craft, Foundations',
      dotColor: '#10B981',
    },
    routePath: '/writing/the-zero-state',
  },
  {
    filename: 'og-note-deconstructing-tatashi-market.jpg',
    badge: 'FIELD NOTE • ARCHITECTURE',
    badgeColor: '#F59E0B',
    badgeBg: '#451A03',
    title: 'Deconstructing Tatashi Market: Architecture Before Line One',
    subtitle: 'Scoping a cross-border commerce system by identifying where trust actually breaks down in informal trade.',
    statusNotice: {
      label: 'AUTHOR: EDDI PRINCE • 7 MIN READ',
      description: 'Published in Field Notes • Commerce Systems, Escrow, Trust Mechanics',
      dotColor: '#10B981',
    },
    routePath: '/writing/deconstructing-tatashi-market',
  },
  {
    filename: 'og-note-ai-leverage-and-velocity.jpg',
    badge: 'FIELD NOTE • ENGINEERING',
    badgeColor: '#F59E0B',
    badgeBg: '#451A03',
    title: 'Cognitive Leverage: AI as an Acceleration Engine',
    subtitle: 'How learning velocity compounds when treating modern models as relentless sparring partners rather than answer generators.',
    statusNotice: {
      label: 'AUTHOR: EDDI PRINCE • 6 MIN READ',
      description: 'Published in Field Notes • Cognitive Velocity, Architecture, Learning',
      dotColor: '#10B981',
    },
    routePath: '/writing/ai-leverage-and-velocity',
  },
  {
    filename: 'og-lab.jpg',
    badge: 'EMPIRICAL LAB',
    badgeColor: '#EC4899',
    badgeBg: '#500724',
    title: 'The Lab: Hypotheses & Experiments',
    subtitle: 'Falsifiable technical investigations, code benchmarks, and empirical spikes in distributed networks, AI, and security.',
    routePath: '/lab',
  },
  {
    filename: 'og-journey.jpg',
    badge: 'CHRONOLOGY',
    badgeColor: '#6366F1',
    badgeBg: '#1E1B4B',
    title: 'The Journey: Timeline from Day Zero',
    subtitle: 'An honest chronological log documenting day-zero milestones, pivotal architectural choices, and lessons learned.',
    routePath: '/journey',
  },
  {
    filename: 'og-now.jpg',
    badge: 'ACTIVE FOCUS (/NOW)',
    badgeColor: '#14B8A6',
    badgeBg: '#042F2E',
    title: 'What I’m Doing Now (/now)',
    subtitle: 'Active development sprint priorities, technical reading list, and bandwidth allocation updated regularly.',
    routePath: '/now',
  },
  {
    filename: 'og-resources.jpg',
    badge: 'CURATED ARCHIVE',
    badgeColor: '#8B5CF6',
    badgeBg: '#2E1065',
    title: 'Curated Resources & Foundations',
    subtitle: 'Foundational books, technical papers, developer tools, and mental models shaping architectural thinking.',
    routePath: '/resources',
  },
  {
    filename: 'og-contact.jpg',
    badge: 'ELECTRONIC INBOX',
    badgeColor: '#3B82F6',
    badgeBg: '#1E293B',
    title: 'Contact & Direct Inquiries',
    subtitle: 'Direct electronic correspondence for technical collaboration, architecture reviews, and constructive sparring.',
    routePath: '/contact',
  },
];

async function generateAll() {
  console.log(`Starting Open Graph image generation into ${OUT_DIR}...`);

  for (const item of IMAGES) {
    const svg = createOgSvg(item);
    const destPathJpg = path.join(OUT_DIR, item.filename);
    const webpFilename = item.filename.replace(/\.jpg$/, '.webp');
    const destPathWebp = path.join(OUT_DIR, webpFilename);

    const svgBuffer = Buffer.from(svg);

    // High quality JPEG for Open Graph social crawlers
    await sharp(svgBuffer)
      .jpeg({
        quality: 90,
        mozjpeg: true,
      })
      .toFile(destPathJpg);

    // Highly optimized WebP for responsive in-app rendering
    await sharp(svgBuffer)
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(destPathWebp);

    console.log(`Generated: ${item.filename} & ${webpFilename}`);
  }

  // Also write og-default.jpg and og-default.webp to /public/ root mirrors
  const rootOgPath = path.join(__dirname, '..', 'public', 'og-image.jpg');
  fs.copyFileSync(path.join(OUT_DIR, 'og-default.jpg'), rootOgPath);
  const rootOgWebpPath = path.join(__dirname, '..', 'public', 'og-image.webp');
  fs.copyFileSync(path.join(OUT_DIR, 'og-default.webp'), rootOgWebpPath);
  console.log('Mirrored root og-image.jpg and og-image.webp');

  console.log('All OG images generated successfully!');
}

generateAll().catch((err) => {
  console.error('Failed to generate OG images:', err);
  process.exit(1);
});
