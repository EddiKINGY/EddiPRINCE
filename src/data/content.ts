import {
  CurrentlyState,
  Project,
  LabExperiment,
  FieldNote,
  JourneyMilestone,
  NowData,
  ResourceItem,
  BeliefItem,
  SearchResult,
} from '../types';

export const CURRENTLY: CurrentlyState = {
  building: 'Tatashi Market',
  buildingDetail: 'Cross-border commerce verification & escrow architecture for emerging trade corridors.',
  buildingProjectId: 'tatashi-market',
  learning: 'AI-assisted product development',
  learningDetail: 'Testing cognitive leverage, code generation boundaries, and structured systems modeling.',
  exploring: 'Business systems and product design',
  exploringDetail: 'Incentive design in decentralized trade, logistics choke points, and payment rails.',
  writingAbout: 'Building from zero',
  writingAboutDetail: 'Deconstructing what it means to document an honest beginning without vanity metrics.',
};

export const BELIEFS: BeliefItem[] = [
  {
    id: 'b-1',
    principle: 'Compound effort beats sudden inspiration.',
    explanation: 'Consistent daily architectural iterations and steady documentation produce exponential leverage over a decade, while fleeting bursts of enthusiasm dissolve without trace.',
    relatedNotes: ['the-zero-state'],
    relatedProjects: ['tatashi-market'],
    relatedResources: ['res-02']
  },
  {
    id: 'b-2',
    principle: 'Intellectual honesty over synthetic prestige.',
    explanation: 'Pretending to have accomplished what you have not yet earned guarantees fragility. Embracing the zero state is the only way to build enduring competence.',
    relatedNotes: ['the-zero-state'],
    relatedExperiments: ['exp-004'],
    relatedResources: ['res-02']
  },
  {
    id: 'b-3',
    principle: 'Systems thinkers master complexity.',
    explanation: 'Isolated features are easy to assemble; durable businesses require understanding feedback loops, capital allocation, unit economics, and human incentives.',
    relatedProjects: ['tatashi-market'],
    relatedNotes: ['deconstructing-tatashi-market'],
    relatedExperiments: ['exp-003'],
    relatedResources: ['res-01']
  },
  {
    id: 'b-4',
    principle: 'Output precedes deep understanding.',
    explanation: 'Passive study creates an illusion of mastery. You only truly understand a database index, a customer bottleneck, or a market mechanic after you attempt to build it.',
    relatedProjects: ['tatashi-market'],
    relatedNotes: ['the-zero-state', 'ai-leverage-and-velocity'],
    relatedExperiments: ['exp-001', 'exp-004'],
    relatedResources: ['res-06']
  },
  {
    id: 'b-5',
    principle: 'Craft is an ethical stance.',
    explanation: 'Every clean interface, clear sentence, and disciplined data contract is a reflection of respect for the time and attention of the human on the other side.',
    relatedNotes: ['the-zero-state', 'ai-leverage-and-velocity'],
    relatedExperiments: ['exp-002'],
    relatedResources: ['res-05', 'res-07']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'tatashi-market',
    slug: 'tatashi-market',
    title: 'Tatashi Market',
    tagline: 'Cross-border digital commerce & verification protocol for emerging merchant networks.',
    shortDescription: 'An early-stage commerce infrastructure project exploring verified merchant identity, localized escrow settlement, and structured inventory discovery.',
    status: 'Early Development',
    evidenceLevel: 'HYPOTHESIS',
    category: 'Marketplace & Commerce',
    dateStarted: 'September 2026',
    problem: 'Cross-border commerce across emerging markets suffers from persistent trust deficits: informal WhatsApp-based trade lacks escrow protections, supplier identities are unverifiable before payment, and cross-currency settlement incurs predatory exchange fees.',
    motivation: 'I wanted to understand how trade rails function from first principles. Rather than building another generic shop, I am researching how identity verification and lightweight milestone escrow can remove existential risk for first-time cross-border buyers and suppliers.',
    vision: 'A resilient, low-overhead commercial exchange that turns informal micro-exporters into verifiable global merchants, supported by transparent transaction proofs and localized payment integrations.',
    currentStage: 'System domain modeling and payment state machine design (pre-code specification).',
    progressPercentage: 5,
    featured: true,
    technologies: [
      'TypeScript',
      'React / Vite',
      'Tailwind CSS',
      'PostgreSQL Schema Design',
      'Stripe & Mobile Money Rails',
      'Statechart Machines'
    ],
    lessonsLearned: [
      'Theoretical principle: Trust is mechanical and social before it is technological; no smart contract or database replaces clear dispute arbitration.',
      'System design insight: Starting with the database schema too early locks you into rigid assumptions; customer journey wireframes must define the data entities.',
      'Payment topology assumption: Payment rails in developing economies have distinct latency and failure modes that require asynchronous reconciliation queues.'
    ],
    timeline: [
      {
        date: 'August 2026',
        title: 'Problem Framing & Informal Trade Mapping',
        notes: 'Formulated initial problem hypotheses based on secondary research and observation of informal WhatsApp/agent trade corridors. Direct merchant discovery interviews planned.'
      },
      {
        date: 'September 2026',
        title: 'System Architecture & Data Entity Formulation',
        notes: 'Outlined core state machines for MerchantProfile, VerificationTier, EscrowContract, and ShipmentMilestone.'
      },
      {
        date: 'Upcoming',
        title: 'Interactive Supplier Verification Prototype',
        notes: 'Scoping the initial mobile-first verification onboarding flow for pilot merchant testing.'
      }
    ],
    relatedFieldNotes: ['deconstructing-tatashi-market', 'the-zero-state'],
    relatedExperiments: ['exp-001', 'exp-003'],
    relatedMilestones: ['jm-003', 'jm-002'],
    relatedIdeas: ['b-3', 'b-4'],
    relatedResources: ['res-01', 'res-04'],
    architectureNotes: 'The planned backend leverages an event-driven queue for payment webhook verification, tied to a multi-signature approval flow for escrow releases.',
    links: [
      { label: 'Architecture Notes', url: '#notes', type: 'notes' },
      { label: 'Read Case Study Note', url: 'field-note:deconstructing-tatashi-market', type: 'docs' }
    ]
  }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-001',
    slug: 'structured-invoice-llm-parsing',
    title: 'Evaluating Language Models for Irregular Merchant Receipt Digitization',
    hypothesis: 'Can small-footprint language models reliably parse irregular multi-currency paper receipts into strict TypeScript schemas without custom fine-tuning?',
    evidenceLevel: 'PLANNED',
    objective: 'Formulate a reproducible testing protocol to evaluate whether micro-merchants could digitize paper manifests using smartphone photos instead of manual ledger entry.',
    process: 'Planned Protocol: Compile a standardized evaluation set of ~50 diverse paper receipts (printed thermal paper, handwritten tallies, multi-currency invoices) and benchmark field extraction accuracy across zero-shot prompts with structured JSON schema outputs.',
    result: 'Protocol & schema defined. Benchmark execution is planned pending dataset compilation.',
    lesson: 'Core architectural hypothesis: Probabilistic extraction must always terminate in an explicit human-in-the-loop review step for accounting records rather than committing directly to a ledger.',
    status: 'PLANNED',
    date: 'August 2026',
    relatedProject: 'tatashi-market',
    relatedNotes: ['deconstructing-tatashi-market', 'ai-leverage-and-velocity'],
    relatedMilestones: ['jm-002'],
    relatedIdeas: ['b-4'],
    relatedResources: ['res-06'],
    tags: ['AI', 'Data Extraction', 'Validation', 'Commerce']
  },
  {
    id: 'exp-002',
    slug: 'client-side-instant-search-index',
    title: 'In-Memory Token Indexing for Zero-Latency Archive Retrieval',
    hypothesis: 'For personal sites and digital archives under 15,000 items, client-side normalized keyword indexing provides faster perceived retrieval (<10ms) than external cloud search APIs at zero hosting cost.',
    evidenceLevel: 'PROTOTYPE_SPIKE',
    objective: 'Evaluate latency, payload overhead, and search accuracy for eddiprince.com.',
    process: 'Constructed an in-memory normalized keyword index supporting prefix search, category weights, and multi-entity cross-referencing directly in the browser runtime.',
    result: 'Active in this application. Powers the global Cmd+K search modal with instant response times across the local archive graph.',
    lesson: 'Resist the urge to deploy serverless search clusters when client-side data structures completely solve the problem with superior UX.',
    status: 'IN PROGRESS',
    date: 'September 2026',
    relatedNotes: ['ai-leverage-and-velocity'],
    relatedIdeas: ['b-5'],
    relatedResources: ['res-03', 'res-08'],
    tags: ['Performance', 'Algorithms', 'UX', 'Architecture']
  },
  {
    id: 'exp-003',
    slug: 'offline-first-merchant-ledger',
    title: 'Local-First State Synchronization for Unstable Mobile Networks',
    hypothesis: 'Using IndexedDB with an append-only transaction log and logical sequence IDs allows market sellers to log sales with zero connectivity and reconcile deterministically when online.',
    evidenceLevel: 'HYPOTHESIS',
    objective: 'Explore architectural patterns to prevent transaction data loss during frequent network blackouts in commercial open-air markets.',
    process: 'Architectural exploration of local-first state machines and sequence vector logs for basic conflict resolution.',
    result: 'Conceptual design drafted. Isolated testbench implementation planned.',
    lesson: 'Timestamp-based conflict resolution fails under mobile clock drift; monotonic sequence IDs are required.',
    status: 'EXPLORING',
    date: 'September 2026',
    relatedProject: 'tatashi-market',
    relatedNotes: ['deconstructing-tatashi-market'],
    relatedIdeas: ['b-3'],
    relatedResources: ['res-01'],
    tags: ['Local-First', 'Databases', 'Resilience']
  },
  {
    id: 'exp-004',
    slug: 'pure-client-license-key-drm',
    title: 'Browser-Only Cryptographic Access Key Enforcement',
    hypothesis: 'Can a static web app using Web Crypto API enforce time-decayed offline access keys without a validation server?',
    evidenceLevel: 'REFUTED',
    objective: 'Analyze whether digital assets can be distributed with access control without maintaining a persistent server.',
    process: 'Theoretical modeling and security boundary analysis of client-side JavaScript execution.',
    result: 'Hypothesis disproven. Client-side execution in a browser is inherently inspectable and bypassable via standard developer tools; code running on the client cannot securely police itself.',
    lesson: 'Client-side DRM is security theater. If access restrictions matter, verification must live on an authoritative backend; otherwise, rely on trust or open distribution.',
    status: 'REFUTED',
    date: 'July 2026',
    relatedNotes: ['the-zero-state'],
    relatedIdeas: ['b-2', 'b-4'],
    tags: ['Cryptography', 'Security', 'Web Standards']
  }
];

export const FIELD_NOTES: FieldNote[] = [
  {
    id: 'fn-001',
    slug: 'the-zero-state',
    title: 'The Zero State: Why I Chose to Document from Scratch',
    subtitle: 'On resisting the impulse to simulate authority and choosing the compounding leverage of public learning.',
    author: 'EddiPRINCE',
    publicationDate: 'September 5, 2026',
    updatedDate: 'September 5, 2026',
    category: 'BUILDING',
    tags: ['philosophy', 'building-in-public', 'craft', 'foundations'],
    readingTime: '5 min read',
    featured: true,
    summary: 'The modern internet rewards performative competence. Here is why starting from genuine zero—with transparent experiments and empty vanity metrics—is the only sustainable strategy for a future founder.',
    tableOfContents: [
      { id: 'the-temptation-of-false-gravity', label: 'The Temptation of False Gravity', level: 2 },
      { id: 'the-mechanics-of-compounding', label: 'The Mechanics of Compounding', level: 2 },
      { id: 'what-this-site-actually-is', label: 'What This Site Actually Is', level: 2 },
      { id: 'the-rules-of-engagement', label: 'The Rules of Engagement', level: 2 }
    ],
    content: [
      '### The Temptation of False Gravity',
      'The easiest thing to do when launching a personal domain in 2026 is to dress it in the borrowed authority of people ten years ahead of you. You buy the template with the bold typography, write an ambiguous tagline about "scaling impactful ecosystems," sprinkle three fabricated customer testimonials with circular avatar photos, and pretend you are already the person you hope to become.',
      'This practice is pervasive because it works in the short term. It satisfies our fragile egos and allows us to hide behind jargon. But it carries a fatal cost: once you pretend to know, you forfeit the license to ask naive, profound questions. You trade genuine curiosity for the exhausting burden of maintaining an illusion.',
      'I am intentionally choosing the opposite path. I do not have a venture-backed startup. I do not have millions in revenue. I do not have a roster of Fortune 500 logos. What I do have is intense curiosity, the willingness to sit with hard problems until they yield, and the discipline to write down what I discover along the way.',
      '### The Mechanics of Compounding',
      'Knowledge does not accumulate in a straight line. When you read a paper, build a prototype, fail a deployment, and honestly record why it failed, you create an intellectual artifact. Over six months, that artifact looks like modest notes. Over six years, it becomes a distinct body of work that no one can counterfeit.',
      'Documenting from scratch is not performative vulnerability; it is technical hygiene. Writing forces fuzzy intuitions into clear propositions. When I state an experiment hypothesis in the Lab or describe a merchant friction point in Tatashi Market, I am forced to clarify my own thinking.',
      '### What This Site Actually Is',
      'This website, eddiprince.com, is my personal digital headquarters. It is not an electronic résumé designed to pass an automated recruiter filter. It is an active workshop, an editorial journal, and an engineering logbook.',
      'It is structured to hold whatever I build over the next two decades: experiments that failed in four days, long-term software systems, economic models, field observations on emerging commerce, and reflections on living an intentional life.',
      '### The Rules of Engagement',
      'To keep this space authentic as it grows, I have established three non-negotiable rules:',
      '1. **Zero synthetic prestige:** I will never publish fake testimonials, inflated metrics, or vague claims of authority. If a project is at 10% completion, it will say 10%. If an experiment was abandoned because my assumption was flawed, the failure will be recorded openly.',
      '2. **Craft in every detail:** Sparsity of content is not an excuse for sloppiness. Clean typography, thoughtful contrast, fast load times, and respectful tone are table stakes.',
      '3. **Action before publishing:** Writing follows building, not the other way around. Words exist to clarify and compound what has been tested in practice.',
      'This is page one. Welcome to the journey.'
    ],
    relatedProjects: ['tatashi-market'],
    relatedArticles: ['deconstructing-tatashi-market', 'ai-leverage-and-velocity'],
    relatedMilestones: ['jm-001', 'jm-004'],
    relatedIdeas: ['b-1', 'b-2'],
    relatedResources: ['res-02']
  },
  {
    id: 'fn-002',
    slug: 'deconstructing-tatashi-market',
    title: 'Deconstructing Tatashi Market: Architecture Before Line One',
    subtitle: 'Scoping a cross-border commerce system by identifying where trust actually breaks down.',
    author: 'EddiPRINCE',
    publicationDate: 'September 2, 2026',
    updatedDate: 'September 4, 2026',
    category: 'BUSINESS',
    tags: ['systems', 'commerce', 'tatashi-market', 'architecture'],
    readingTime: '7 min read',
    featured: true,
    summary: 'A first-principles breakdown of why informal cross-border trade stalls, and how decomposing the transaction lifecycle reveals what software should—and should not—try to solve.',
    tableOfContents: [
      { id: 'the-informal-trade-paradox', label: 'The Informal Trade Paradox', level: 2 },
      { id: 'the-three-points-of-failure', label: 'The Three Points of Failure', level: 2 },
      { id: 'why-pure-software-fails-here', label: 'Why Pure Software Fails Here', level: 2 },
      { id: 'architectural-hypotheses', label: 'Architectural Hypotheses for Tatashi', level: 2 }
    ],
    content: [
      '### The Informal Trade Paradox',
      'Every day, tens of thousands of micro-merchants conduct cross-border commerce across West Africa, East Africa, and Asian trading hubs. The volume is enormous—hundreds of millions of dollars annually in apparel, electronics, agricultural goods, and manufactured components.',
      'Yet virtually none of this trade happens on conventional e-commerce platforms like Amazon or Alibaba. Instead, it occurs in the chaotic trenches of WhatsApp status updates, voice notes, fragmented courier referrals, and informal money-transfer agents. Why does formal software struggle to capture this commerce?',
      'Because conventional platforms assume an institutional substrate that simply does not exist in informal corridors: predictable postal addresses, standardized dispute courts, uniform credit scoring, and frictionless banking rails. When software assumes institutions that do not exist, users abandon the software and return to personal relationships.',
      '### The Three Points of Failure',
      'When you trace a single trade between an independent supplier in Lagos or Nairobi and a buyer across a border, you find three distinct fracture points:',
      '1. **The Asymmetric Information Chasm:** The buyer cannot verify whether the product shown on a video call is the exact inventory packed into the shipping container. The seller cannot verify whether the buyer actually has liquid funds or will demand steep discounts upon arrival.',
      '2. **The Settlement Trap:** If the buyer pays upfront, they bear 100% of the counterparty risk. If the seller ships without upfront payment, they risk complete default. Standard card payments are prone to chargeback fraud, while bank wires take days and incur 8-12% cumulative exchange losses.',
      '3. **The Transit Black Hole:** Once goods are handed to informal freight consolidators, tracking ceases. Neither party knows if an item is clearing customs, impounded, or in transit.',
      '### Why Pure Software Fails Here',
      'The naive software engineer looks at this problem and says: "Let us build a decentralized smart contract on a blockchain!" or "Let us make an online storefront with Stripe checkout!"',
      'Both approaches fail because code cannot inspect physical boxes in a customs yard. Software cannot compel an informal clearing agent to release a pallet. The problem is socio-technical, not purely algorithmic.',
      '### Architectural Hypotheses for Tatashi',
      'With Tatashi Market, I am exploring a much more grounded system architecture:',
      '- **Decoupled Identity & Tiered Verification:** Rather than requiring full formal corporate incorporation on day one, suppliers build a verifiable track record through micro-transactions backed by counter-signed receiver confirmations.',
      '- **Asynchronous Multi-Step Escrow:** Funds are locked in a local currency account with transparent release conditions tied to freight weigh-in and physical handoff milestones.',
      '- **Lightweight Webhook Notifications:** Instead of forcing merchants to install a heavy native app with high data consumption, the system integrates seamlessly into their existing communications flows.',
      'Building this will be slow and full of messy real-world edge cases. That is precisely why it is worth pursuing.'
    ],
    relatedProjects: ['tatashi-market'],
    relatedArticles: ['the-zero-state'],
    relatedExperiments: ['exp-001', 'exp-003'],
    relatedMilestones: ['jm-003'],
    relatedIdeas: ['b-3'],
    relatedResources: ['res-01', 'res-04']
  },
  {
    id: 'fn-003',
    slug: 'ai-leverage-and-velocity',
    title: 'Cognitive Leverage: AI as an Acceleration Engine, Not an Intellectual Crutch',
    subtitle: 'How learning velocity changes when you treat modern AI models as relentless sparring partners rather than answer generators.',
    author: 'EddiPRINCE',
    publicationDate: 'August 28, 2026',
    updatedDate: 'August 30, 2026',
    category: 'TECHNOLOGY',
    tags: ['ai', 'learning', 'mental-models', 'craft'],
    readingTime: '5 min read',
    featured: false,
    summary: 'The biggest danger of generative AI for a beginning builder is intellectual atrophy. Here is how I structure my workflows to maximize comprehension while retaining speed.',
    tableOfContents: [
      { id: 'the-trap-of-instant-code', label: 'The Trap of Instant Code', level: 2 },
      { id: 'the-socratic-sandbox-method', label: 'The Socratic Sandbox Method', level: 2 },
      { id: 'compounding-taste', label: 'Compounding Architectural Taste', level: 2 }
    ],
    content: [
      '### The Trap of Instant Code',
      'When an AI model can generate fifty lines of TypeScript or a working database migration in three seconds, the temptation is to become a passive compiler of prompts. You type what you want, paste the result, see the test pass, and move on.',
      'If your goal is to pump out disposable landing pages for affiliate traffic, this approach is fine. But if your goal is to become an exceptional founder and technical architect, it is poison.',
      'When you paste code you do not deeply comprehend, you are borrowing technical debt from your future self at usurious interest rates. When the system breaks under high load or an unhandled edge case in production, you will not have the cognitive scaffolding to diagnose it.',
      '### The Socratic Sandbox Method',
      'Instead of using AI to replace thought, I use it as a relentless sparring partner. My prompt structure is rarely "Write this component for me." Instead, it looks like:',
      '- "Here is my proposed database schema for merchant escrow. Critique this design from the perspective of high-frequency concurrency locks."',
      '- "Explain the memory trade-offs between an inverted index and a prefix trie for a dataset of 20,000 items in the browser."',
      '- "Quiz me on how distributed consensus handles network partitions until I can defend every choice."',
      '### Compounding Architectural Taste',
      'Taste is the ability to recognize elegance, economy, and robustness before execution begins. It cannot be downloaded; it is forged by comparing bad ideas to better ones.',
      'By using AI models to rapidly generate counter-arguments, simulate failure scenarios, and walk through unfamiliar domain landscapes, my learning velocity has increased tenfold. Not because the AI writes the future for me, but because it accelerates the speed at which I can test my own understanding.'
    ],
    relatedProjects: ['tatashi-market'],
    relatedArticles: ['the-zero-state'],
    relatedExperiments: ['exp-001', 'exp-002'],
    relatedIdeas: ['b-4', 'b-5'],
    relatedResources: ['res-06', 'res-07']
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'jm-004',
    date: '2026-09-05',
    formattedMonth: 'September 2026',
    title: 'Started EddiPRINCE.com — The Digital Headquarters',
    type: 'project_started',
    evidenceLevel: 'PROTOTYPE_SPIKE',
    description: 'Launched the personal digital headquarters at eddiprince.com to anchor my identity, projects, experiments, and writing as I build from scratch.',
    context: 'Built with a commitment to zero synthetic prestige, meticulous typography, and complete public accountability.',
    relatedNotes: ['the-zero-state'],
    relatedIdeas: ['b-1', 'b-2'],
    relatedRoute: { page: 'notes', id: 'the-zero-state', label: 'Read Manifesto Note' }
  },
  {
    id: 'jm-003',
    date: '2026-09-02',
    formattedMonth: 'September 2026',
    title: 'Formalized Tatashi Market Architecture Spec',
    type: 'breakthrough',
    evidenceLevel: 'HYPOTHESIS',
    description: 'Decomposed the core entities for cross-border trade verification: MerchantProfile, VerificationTier, EscrowOrder, and DisputeLog.',
    context: 'Transitioned from informal notebook scribbles to formal domain modeling and state machine charts.',
    relatedProjects: ['tatashi-market'],
    relatedNotes: ['deconstructing-tatashi-market'],
    relatedIdeas: ['b-3'],
    relatedRoute: { page: 'builds', id: 'tatashi-market', label: 'View Project Details' }
  },
  {
    id: 'jm-002',
    date: '2026-08-18',
    formattedMonth: 'August 2026',
    title: 'Framed Lab Experiment #001: Structured Invoice Parsing Protocol',
    type: 'experiment',
    evidenceLevel: 'PLANNED',
    description: 'Outlined the test protocol and structured schema constraints to evaluate whether language models can reliably digitize irregular merchant paper receipts.',
    context: 'Established the architectural principle that probabilistic extraction requires human confirmation for accounting records.',
    relatedProjects: ['tatashi-market'],
    relatedExperiments: ['exp-001'],
    relatedNotes: ['deconstructing-tatashi-market', 'ai-leverage-and-velocity'],
    relatedRoute: { page: 'lab', id: 'exp-001', label: 'Read Experiment Protocol' }
  },
  {
    id: 'jm-001',
    date: '2026-07-15',
    formattedMonth: 'July 2026',
    title: 'The Decision to Build in the Open',
    type: 'decision',
    evidenceLevel: 'IDEA',
    description: 'Made the foundational commitment to reject vanity resume templates and instead document my entire founder trajectory publicly from zero.',
    context: 'Decided that compounding real work and public learning will be the long-term engine of my future companies.',
    relatedNotes: ['the-zero-state'],
    relatedIdeas: ['b-1', 'b-2'],
    relatedResources: ['res-02']
  }
];

export const NOW_DATA: NowData = {
  lastUpdated: 'September 5, 2026',
  building: [
    {
      title: 'Tatashi Market (V0.1 Architecture)',
      desc: 'Formulating the verification state machines and database topology for cross-border merchant escrow.',
      linkRoute: 'builds',
      linkId: 'tatashi-market'
    },
    {
      title: 'EddiPRINCE.com Digital Headquarters',
      desc: 'Refining the design system, knowledge archive, and build logs to scale cleanly over the next decade.',
      linkRoute: 'home'
    }
  ],
  learning: [
    {
      title: 'Distributed Systems & Transaction Isolation',
      desc: 'Studying how consensus, two-phase commits, and asynchronous reconciliation function in unreliable network topologies.'
    },
    {
      title: 'Modern AI-Assisted Architecture',
      desc: 'Testing how language model workflows can accelerate conceptual prototyping without eroding technical rigor.'
    }
  ],
  exploring: [
    {
      title: 'Informal African & Cross-Border Trade Corridors',
      desc: 'Analyzing how currency volatility, informal transport hubs, and social networks shape commerce in Lagos, Nairobi, and Accra.'
    },
    {
      title: 'Digital Garden Taxonomy & Knowledge Graph Architecture',
      desc: 'Investigating how personal publications can seamlessly link thoughts, experiments, code commits, and business outcomes.'
    }
  ],
  reading: [
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      status: 'Currently Reading (Chapter 7: Transactions)',
      note: 'Essential foundation for understanding data consistency, replication lag, and partition tolerances.',
      resourceId: 'res-01'
    },
    {
      title: 'Poor Charlie’s Almanack',
      author: 'Charles T. Munger',
      status: 'Continuous Reference',
      note: 'Masterclass on multidisciplinary mental models, cognitive biases, and inversion.'
    }
  ],
  thinkingAbout: [
    'How simple, repeatable habits compound into unassailable advantages over a 10-year horizon.',
    'Why the most critical enterprise problems are socio-technical rather than purely computational.',
    'How to design digital products that treat user attention as a scarce and sacred resource.'
  ],
  next: [
    'Complete the interactive supplier onboarding wireframe prototype for Tatashi Market.',
    'Publish Field Note #004 on statecharts in financial workflows.',
    'Begin field interviews with two cross-border logistics forwarding agents.'
  ]
};

export const RESOURCES: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'Designing Data-Intensive Applications',
    description: 'The definitive handbook on the architectures, trade-offs, and internal mechanics of modern databases and distributed systems.',
    url: 'https://dataintensive.net',
    category: 'BOOKS',
    tags: ['Architecture', 'Distributed Systems', 'Databases', 'Backend'],
    recommendationLevel: 'Essential / Foundation',
    notes: 'Required reading for anyone planning to build data-handling software. Martin Kleppmann demystifies replication, partitioning, transactions, and consensus with unparalleled clarity.',
    relatedProjects: ['tatashi-market'],
    relatedNotes: ['deconstructing-tatashi-market'],
    relatedExperiments: ['exp-003'],
    relatedIdeas: ['b-3']
  },
  {
    id: 'res-02',
    title: 'Paul Graham Essays',
    description: 'Timeless essays on startups, writing, independent thinking, craft, and the nature of ambitious work.',
    url: 'https://paulgraham.com/articles.html',
    category: 'BUSINESS',
    tags: ['Startups', 'Writing', 'Thinking', 'Foundations'],
    recommendationLevel: 'Essential / Foundation',
    notes: 'Particularly "Do Things That Don\'t Scale", "How to Do Great Work", and "Maker\'s Schedule, Manager\'s Schedule". Clean, unpretentious prose.',
    relatedNotes: ['the-zero-state'],
    relatedIdeas: ['b-1', 'b-2']
  },
  {
    id: 'res-03',
    title: 'Crafting Interpreters',
    description: 'A complete handbook on designing and implementing programming languages and compilers from scratch.',
    url: 'https://craftinginterpreters.com',
    category: 'DEVELOPMENT',
    tags: ['Compilers', 'Computer Science', 'Craft', 'Languages'],
    recommendationLevel: 'High Impact',
    notes: 'Bob Nystrom demonstrates what world-class technical pedagogy looks like. Building a tree-walk interpreter and bytecode VM builds deep intuition.',
    relatedExperiments: ['exp-002'],
    relatedIdeas: ['b-5']
  },
  {
    id: 'res-04',
    title: 'Stripe Press',
    description: 'Ideas for progress: books on scientific discovery, economic history, infrastructure, and ambitious engineering.',
    url: 'https://press.stripe.com',
    category: 'BOOKS',
    tags: ['Progress', 'History', 'Engineering', 'Economics'],
    recommendationLevel: 'High Impact',
    notes: 'Titles like "Working in Public" by Nadia Eghbal and "The Revolt of The Public" by Martin Gurri provide rare strategic altitude.',
    relatedProjects: ['tatashi-market'],
    relatedNotes: ['deconstructing-tatashi-market']
  },
  {
    id: 'res-05',
    title: 'Refactoring UI',
    description: 'A practical, developer-friendly guide to visual design, visual hierarchy, spacing, and typography without fluff.',
    url: 'https://refactoringui.com',
    category: 'DESIGN',
    tags: ['UI', 'Visual Hierarchy', 'Typography', 'Frontend'],
    recommendationLevel: 'Essential / Foundation',
    notes: 'Adam Wathan and Steve Schoger break down visual decisions into actionable heuristics that any technical builder can immediately apply.',
    relatedIdeas: ['b-5']
  },
  {
    id: 'res-06',
    title: 'Anthropic Prompt Engineering & Constitutional AI Research',
    description: 'Technical guidance on prompt structuring, chain-of-thought elicitation, and safety boundaries for language models.',
    url: 'https://docs.anthropic.com',
    category: 'AI',
    tags: ['AI', 'Prompt Engineering', 'LLMs', 'Systems'],
    recommendationLevel: 'Field Reference',
    notes: 'Clear, empirical breakdown of system prompt constraints and multi-shot prompting patterns.',
    relatedExperiments: ['exp-001'],
    relatedNotes: ['ai-leverage-and-velocity'],
    relatedIdeas: ['b-4']
  },
  {
    id: 'res-07',
    title: 'Bret Victor — Inventing on Principle',
    description: 'A legendary presentation on creators living by a guiding principle and inventing tools that collapse the feedback loop.',
    url: 'https://worrydream.com',
    category: 'CREATORS',
    tags: ['Invention', 'Human-Computer Interaction', 'Vision', 'Craft'],
    recommendationLevel: 'Essential / Foundation',
    notes: 'Radically reshaped my understanding of what software interfaces can be. Creators need immediate, tactile feedback on what they make.',
    relatedNotes: ['ai-leverage-and-velocity'],
    relatedIdeas: ['b-5']
  },
  {
    id: 'res-08',
    title: 'Tailwind CSS Documentation & Source',
    description: 'A utility-first CSS framework and design system architecture.',
    url: 'https://tailwindcss.com',
    category: 'TOOLS',
    tags: ['CSS', 'Frontend', 'Design Systems', 'Web'],
    recommendationLevel: 'High Impact',
    notes: 'Beyond being a productive CSS utility, studying Tailwind’s design token constraints teaches you the discipline of constrained palettes.',
    relatedExperiments: ['exp-002']
  }
];

// Inverted Search Index for Global Search
export function performGlobalSearch(query: string): SearchResult[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const results: SearchResult[] = [];

  // Search Projects
  for (const p of PROJECTS) {
    const text = `${p.title} ${p.tagline} ${p.shortDescription} ${p.category} ${p.technologies.join(' ')} ${p.problem} ${p.vision}`.toLowerCase();
    if (text.includes(clean)) {
      results.push({
        id: `project-${p.id}`,
        title: p.title,
        snippet: p.shortDescription,
        type: 'Build',
        targetPage: 'builds',
        targetId: p.id,
        meta: `${p.status} • ${p.category}`
      });
    }
  }

  // Search Field Notes
  for (const n of FIELD_NOTES) {
    const text = `${n.title} ${n.subtitle} ${n.summary} ${n.category} ${n.tags.join(' ')} ${n.content.join(' ')}`.toLowerCase();
    if (text.includes(clean)) {
      results.push({
        id: `note-${n.id}`,
        title: n.title,
        snippet: n.summary,
        type: 'Field Note',
        targetPage: 'notes',
        targetId: n.slug,
        meta: `${n.category} • ${n.readingTime}`
      });
    }
  }

  // Search Lab Experiments
  for (const exp of LAB_EXPERIMENTS) {
    const text = `${exp.title} ${exp.hypothesis} ${exp.objective} ${exp.lesson} ${exp.tags.join(' ')}`.toLowerCase();
    if (text.includes(clean)) {
      results.push({
        id: `lab-${exp.id}`,
        title: exp.title,
        snippet: exp.hypothesis,
        type: 'Lab',
        targetPage: 'lab',
        targetId: exp.id,
        meta: `Status: ${exp.status}`
      });
    }
  }

  // Search Journey Milestones
  for (const m of JOURNEY_MILESTONES) {
    const text = `${m.title} ${m.description} ${m.context || ''} ${m.formattedMonth}`.toLowerCase();
    if (text.includes(clean)) {
      results.push({
        id: `journey-${m.id}`,
        title: m.title,
        snippet: m.description,
        type: 'Journey',
        targetPage: 'journey',
        targetId: m.id,
        meta: `${m.formattedMonth} • ${m.type}`
      });
    }
  }

  // Search Resources
  for (const r of RESOURCES) {
    const text = `${r.title} ${r.description} ${r.notes} ${r.category} ${r.tags.join(' ')}`.toLowerCase();
    if (text.includes(clean)) {
      results.push({
        id: `res-${r.id}`,
        title: r.title,
        snippet: r.description,
        type: 'Resource',
        targetPage: 'resources',
        targetId: r.id,
        meta: `${r.category} • ${r.recommendationLevel}`
      });
    }
  }

  // Search Principles & Ideas
  for (const b of BELIEFS) {
    const text = `${b.principle} ${b.explanation}`.toLowerCase();
    if (text.includes(clean)) {
      results.push({
        id: `idea-${b.id}`,
        title: b.principle,
        snippet: b.explanation,
        type: 'Idea',
        targetPage: 'about',
        targetId: b.id,
        meta: 'Principle / Foundational Stance'
      });
    }
  }

  return results;
}
