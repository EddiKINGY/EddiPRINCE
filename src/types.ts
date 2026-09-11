export type PageRoute = 
  | 'home' 
  | 'about' 
  | 'builds' 
  | 'lab' 
  | 'notes' 
  | 'writing'
  | 'journey' 
  | 'now' 
  | 'resources'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'trust'
  | 'not-found'
  | 'build-detail'
  | 'note-detail'
  | 'lab-detail';

/**
 * TRUTH & EVIDENCE MODEL
 * Distinctly classifies the epistemic status of all artifacts across the archive:
 * IDEA | PLANNED | IN_PROGRESS | PROTOTYPE | PRIVATE_TEST | SHIPPED | MEASURED | VERIFIED
 * Guarantees that conceptual models, hypotheses, or planned work are never presented as completed outcomes.
 */
export type EvidenceLevel =
  | 'IDEA'              // Conceptual exploration or philosophical thesis
  | 'PLANNED'           // Scoped protocol or planned inquiry; not yet executed
  | 'IN_PROGRESS'       // Active architecture spike or ongoing inquiry
  | 'PROTOTYPE'         // Working code prototype in testbench or client
  | 'PRIVATE_TEST'      // Scoped local testbench or internal evaluation
  | 'SHIPPED'           // Publicly released and functional
  | 'MEASURED'          // Formally quantified with reproducible metrics
  | 'VERIFIED'          // Independently corroborated or audited
  | 'REFUTED'           // Formally tested and disproven
  // Aliases for backwards compatibility:
  | 'HYPOTHESIS'
  | 'PROTOTYPE_SPIKE'
  | 'OBSERVATION'
  | 'VALIDATED';

export interface EvidenceBasis {
  level: EvidenceLevel;
  methodology?: string;       // How the assertion is or will be tested
  evidenceNotes?: string;     // Explicit disclosure of current evidence limits
}

export type BuildStatus = 
  | 'Early Development' 
  | 'In Progress' 
  | 'Prototype' 
  | 'Shipped' 
  | 'Paused';

export type BuildCategory = 
  | 'Marketplace & Commerce' 
  | 'AI & Systems' 
  | 'Developer Tools' 
  | 'Media & Publication'
  | 'Infrastructure';

export interface ProjectTimelineItem {
  date: string;
  title: string;
  notes: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'demo' | 'preview' | 'docs' | 'notes';
}

export type ArchiveEntityType = 
  | 'project' 
  | 'note' 
  | 'lab' 
  | 'milestone' 
  | 'resource' 
  | 'idea'
  | 'PROJECT'
  | 'ARTICLE'
  | 'NOTE'
  | 'EXPERIMENT'
  | 'LAB'
  | 'MILESTONE'
  | 'RESOURCE'
  | 'IDEA';

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  status: BuildStatus;
  evidenceLevel: EvidenceLevel;
  category: BuildCategory;
  dateStarted: string;
  problem: string;
  motivation: string;
  vision: string;
  currentStage: string;
  progressPercentage: number;
  featured: boolean;
  technologies: string[];
  lessonsLearned: string[];
  timeline: ProjectTimelineItem[];
  relatedFieldNotes: string[];
  relatedExperiments?: string[];
  relatedMilestones?: string[];
  relatedIdeas?: string[];
  relatedResources?: string[];
  architectureNotes: string;
  links: ProjectLink[];
}

export type LabStatus = 
  | 'IDEA'
  | 'PLANNED'
  | 'EXPLORING' 
  | 'IN PROGRESS' 
  | 'PROTOTYPE_SPIKE'
  | 'VALIDATED' 
  | 'REFUTED'
  | 'COMPLETED' 
  | 'ABANDONED';

export interface LabExperiment {
  id: string;
  slug: string;
  title: string;
  hypothesis: string;
  evidenceLevel: EvidenceLevel;
  objective: string;
  process: string;
  result: string;
  lesson: string;
  status: LabStatus;
  date: string;
  relatedProject?: string;
  relatedNotes?: string[];
  relatedMilestones?: string[];
  relatedIdeas?: string[];
  relatedResources?: string[];
  tags: string[];
}

export type NoteCategory = 
  | 'BUILDING' 
  | 'IDEAS' 
  | 'LEARNING' 
  | 'BUSINESS' 
  | 'TECHNOLOGY' 
  | 'CREATIVITY' 
  | 'LIFE';

export interface TableOfContentsItem {
  id: string;
  label: string;
  level: number;
}

export interface FieldNote {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  publicationDate: string;
  updatedDate: string;
  category: NoteCategory;
  tags: string[];
  readingTime: string;
  featured: boolean;
  summary: string;
  content: string[]; // paragraph blocks / markdown-style sections
  tableOfContents: TableOfContentsItem[];
  relatedProjects: string[];
  relatedArticles: string[];
  relatedExperiments?: string[];
  relatedMilestones?: string[];
  relatedIdeas?: string[];
  relatedResources?: string[];
}

export type MilestoneType = 
  | 'idea' 
  | 'project_started' 
  | 'product_launched' 
  | 'experiment' 
  | 'lesson' 
  | 'failure' 
  | 'breakthrough' 
  | 'decision';

export interface JourneyMilestone {
  id: string;
  date: string; // ISO or YYYY-MM
  formattedMonth: string; // e.g. "September 2026"
  title: string;
  type: MilestoneType;
  evidenceLevel?: EvidenceLevel;
  description: string;
  context?: string;
  relatedProjects?: string[];
  relatedNotes?: string[];
  relatedExperiments?: string[];
  relatedIdeas?: string[];
  relatedResources?: string[];
  relatedRoute?: {
    page: PageRoute;
    id?: string;
    label: string;
  };
}

export interface CurrentlyState {
  building: string;
  buildingDetail: string;
  buildingProjectId?: string;
  learning: string;
  learningDetail: string;
  exploring: string;
  exploringDetail: string;
  writingAbout: string;
  writingAboutDetail: string;
}

export type ResourceCategory = 
  | 'AI' 
  | 'DEVELOPMENT' 
  | 'DESIGN' 
  | 'BUSINESS' 
  | 'BOOKS' 
  | 'LEARNING' 
  | 'TOOLS' 
  | 'CREATORS';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  tags: string[];
  recommendationLevel: 'Essential / Foundation' | 'High Impact' | 'Field Reference';
  notes: string;
  relatedProjects?: string[];
  relatedNotes?: string[];
  relatedExperiments?: string[];
  relatedIdeas?: string[];
}

export interface NowData {
  lastUpdated: string;
  building: { title: string; desc: string; linkRoute?: PageRoute; linkId?: string }[];
  learning: { title: string; desc: string }[];
  exploring: { title: string; desc: string }[];
  reading: { title: string; author: string; status: string; note: string; resourceId?: string }[];
  thinkingAbout: string[];
  next: string[];
}

export interface BeliefItem {
  id: string;
  principle: string;
  explanation: string;
  relatedProjects?: string[];
  relatedNotes?: string[];
  relatedExperiments?: string[];
  relatedResources?: string[];
}

export interface ConnectedArchiveContext {
  projects: Project[];
  notes: FieldNote[];
  experiments: LabExperiment[];
  milestones: JourneyMilestone[];
  resources: ResourceItem[];
  ideas: BeliefItem[];
  totalCount: number;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  type: 'Build' | 'Field Note' | 'Lab' | 'Journey' | 'Resource' | 'Idea';
  targetPage: PageRoute;
  targetId?: string;
  meta: string;
}
