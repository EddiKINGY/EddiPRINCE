import {
  Project,
  FieldNote,
  LabExperiment,
  JourneyMilestone,
  ResourceItem,
  BeliefItem,
  ArchiveEntityType,
  ConnectedArchiveContext,
} from '../types';
import {
  PROJECTS,
  FIELD_NOTES,
  LAB_EXPERIMENTS,
  JOURNEY_MILESTONES,
  RESOURCES,
  BELIEFS,
} from './content';

// Fast lookup helpers
export function getProjectById(idOrSlug: string): Project | undefined {
  return PROJECTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function getFieldNoteById(idOrSlug: string): FieldNote | undefined {
  return FIELD_NOTES.find((n) => n.id === idOrSlug || n.slug === idOrSlug);
}

export function getLabExperimentById(idOrSlug: string): LabExperiment | undefined {
  return LAB_EXPERIMENTS.find((e) => e.id === idOrSlug || e.slug === idOrSlug);
}

export function getMilestoneById(id: string): JourneyMilestone | undefined {
  return JOURNEY_MILESTONES.find((m) => m.id === id);
}

export function getResourceById(id: string): ResourceItem | undefined {
  return RESOURCES.find((r) => r.id === id);
}

export function getBeliefById(id: string): BeliefItem | undefined {
  return BELIEFS.find((b) => b.id === id);
}

// Global Archive Statistics
export function getArchiveOverview() {
  return {
    totalProjects: PROJECTS.length,
    totalNotes: FIELD_NOTES.length,
    totalExperiments: LAB_EXPERIMENTS.length,
    totalMilestones: JOURNEY_MILESTONES.length,
    totalResources: RESOURCES.length,
    totalPrinciples: BELIEFS.length,
  };
}

/**
 * Universal Bidirectional Graph Resolver
 * Resolves explicit relationships plus reverse references across all 6 artifact types.
 */
export function getConnectedArchiveContext(
  type: ArchiveEntityType,
  idOrSlug: string
): ConnectedArchiveContext {
  const norm = type.toLowerCase();
  const normalizedType = (norm === 'article' ? 'note' : norm === 'experiment' ? 'lab' : norm) as
    | 'project'
    | 'note'
    | 'lab'
    | 'milestone'
    | 'resource'
    | 'idea';

  const projectSet = new Set<string>();
  const noteSet = new Set<string>();
  const experimentSet = new Set<string>();
  const milestoneSet = new Set<string>();
  const resourceSet = new Set<string>();
  const ideaSet = new Set<string>();

  // Helper to match target ID or Slug
  const isMatch = (val?: string) => val === idOrSlug;
  const inArray = (arr?: string[]) => arr && arr.includes(idOrSlug);

  // 1. If currently inspecting a PROJECT
  if (normalizedType === 'project') {
    const project = getProjectById(idOrSlug);
    if (project) {
      project.relatedFieldNotes?.forEach((n) => noteSet.add(n));
      project.relatedExperiments?.forEach((e) => experimentSet.add(e));
      project.relatedMilestones?.forEach((m) => milestoneSet.add(m));
      project.relatedIdeas?.forEach((i) => ideaSet.add(i));
      project.relatedResources?.forEach((r) => resourceSet.add(r));
    }
  }

  // 2. If currently inspecting a FIELD NOTE
  if (normalizedType === 'note') {
    const note = getFieldNoteById(idOrSlug);
    if (note) {
      note.relatedProjects?.forEach((p) => projectSet.add(p));
      note.relatedArticles?.forEach((n) => noteSet.add(n));
      note.relatedExperiments?.forEach((e) => experimentSet.add(e));
      note.relatedMilestones?.forEach((m) => milestoneSet.add(m));
      note.relatedIdeas?.forEach((i) => ideaSet.add(i));
      note.relatedResources?.forEach((r) => resourceSet.add(r));
    }
  }

  // 3. If currently inspecting a LAB EXPERIMENT
  if (normalizedType === 'lab') {
    const exp = getLabExperimentById(idOrSlug);
    if (exp) {
      if (exp.relatedProject) projectSet.add(exp.relatedProject);
      exp.relatedNotes?.forEach((n) => noteSet.add(n));
      exp.relatedMilestones?.forEach((m) => milestoneSet.add(m));
      exp.relatedIdeas?.forEach((i) => ideaSet.add(i));
      exp.relatedResources?.forEach((r) => resourceSet.add(r));
    }
  }

  // 4. If currently inspecting a MILESTONE
  if (normalizedType === 'milestone') {
    const ms = getMilestoneById(idOrSlug);
    if (ms) {
      ms.relatedProjects?.forEach((p) => projectSet.add(p));
      ms.relatedNotes?.forEach((n) => noteSet.add(n));
      ms.relatedExperiments?.forEach((e) => experimentSet.add(e));
      ms.relatedIdeas?.forEach((i) => ideaSet.add(i));
      ms.relatedResources?.forEach((r) => resourceSet.add(r));
      if (ms.relatedRoute) {
        if (ms.relatedRoute.page === 'builds' && ms.relatedRoute.id) projectSet.add(ms.relatedRoute.id);
        if (ms.relatedRoute.page === 'notes' && ms.relatedRoute.id) noteSet.add(ms.relatedRoute.id);
        if (ms.relatedRoute.page === 'lab' && ms.relatedRoute.id) experimentSet.add(ms.relatedRoute.id);
      }
    }
  }

  // 5. If currently inspecting a RESOURCE
  if (normalizedType === 'resource') {
    const res = getResourceById(idOrSlug);
    if (res) {
      res.relatedProjects?.forEach((p) => projectSet.add(p));
      res.relatedNotes?.forEach((n) => noteSet.add(n));
      res.relatedExperiments?.forEach((e) => experimentSet.add(e));
      res.relatedIdeas?.forEach((i) => ideaSet.add(i));
    }
  }

  // 6. If currently inspecting an IDEA (BELIEF)
  if (normalizedType === 'idea') {
    const belief = getBeliefById(idOrSlug);
    if (belief) {
      belief.relatedProjects?.forEach((p) => projectSet.add(p));
      belief.relatedNotes?.forEach((n) => noteSet.add(n));
      belief.relatedExperiments?.forEach((e) => experimentSet.add(e));
      belief.relatedResources?.forEach((r) => resourceSet.add(r));
    }
  }

  // REVERSE GRAPH TRAVERSAL:
  // Check all other items across the archive to find any that reference this entity
  PROJECTS.forEach((p) => {
    if (type !== 'project' && p.id !== idOrSlug && p.slug !== idOrSlug) {
      if (
        (type === 'note' && inArray(p.relatedFieldNotes)) ||
        (type === 'lab' && inArray(p.relatedExperiments)) ||
        (type === 'milestone' && inArray(p.relatedMilestones)) ||
        (type === 'idea' && inArray(p.relatedIdeas)) ||
        (type === 'resource' && inArray(p.relatedResources))
      ) {
        projectSet.add(p.id);
      }
    }
  });

  FIELD_NOTES.forEach((n) => {
    if (type !== 'note' && n.id !== idOrSlug && n.slug !== idOrSlug) {
      if (
        (type === 'project' && inArray(n.relatedProjects)) ||
        (type === 'lab' && inArray(n.relatedExperiments)) ||
        (type === 'milestone' && inArray(n.relatedMilestones)) ||
        (type === 'idea' && inArray(n.relatedIdeas)) ||
        (type === 'resource' && inArray(n.relatedResources))
      ) {
        noteSet.add(n.slug);
      }
    }
  });

  LAB_EXPERIMENTS.forEach((e) => {
    if (type !== 'lab' && e.id !== idOrSlug && e.slug !== idOrSlug) {
      if (
        (type === 'project' && isMatch(e.relatedProject)) ||
        (type === 'note' && inArray(e.relatedNotes)) ||
        (type === 'milestone' && inArray(e.relatedMilestones)) ||
        (type === 'idea' && inArray(e.relatedIdeas)) ||
        (type === 'resource' && inArray(e.relatedResources))
      ) {
        experimentSet.add(e.id);
      }
    }
  });

  JOURNEY_MILESTONES.forEach((m) => {
    if (type !== 'milestone' && m.id !== idOrSlug) {
      if (
        (type === 'project' && (inArray(m.relatedProjects) || m.relatedRoute?.id === idOrSlug)) ||
        (type === 'note' && (inArray(m.relatedNotes) || m.relatedRoute?.id === idOrSlug)) ||
        (type === 'lab' && (inArray(m.relatedExperiments) || m.relatedRoute?.id === idOrSlug)) ||
        (type === 'idea' && inArray(m.relatedIdeas)) ||
        (type === 'resource' && inArray(m.relatedResources))
      ) {
        milestoneSet.add(m.id);
      }
    }
  });

  RESOURCES.forEach((r) => {
    if (type !== 'resource' && r.id !== idOrSlug) {
      if (
        (type === 'project' && inArray(r.relatedProjects)) ||
        (type === 'note' && inArray(r.relatedNotes)) ||
        (type === 'lab' && inArray(r.relatedExperiments)) ||
        (type === 'idea' && inArray(r.relatedIdeas))
      ) {
        resourceSet.add(r.id);
      }
    }
  });

  BELIEFS.forEach((b) => {
    if (type !== 'idea' && b.id !== idOrSlug) {
      if (
        (type === 'project' && inArray(b.relatedProjects)) ||
        (type === 'note' && inArray(b.relatedNotes)) ||
        (type === 'lab' && inArray(b.relatedExperiments)) ||
        (type === 'resource' && inArray(b.relatedResources))
      ) {
        ideaSet.add(b.id);
      }
    }
  });

  // Materialize into resolved entities
  const resolvedProjects: Project[] = [];
  projectSet.forEach((pid) => {
    const item = getProjectById(pid);
    if (item && item.id !== idOrSlug && item.slug !== idOrSlug) resolvedProjects.push(item);
  });

  const resolvedNotes: FieldNote[] = [];
  noteSet.forEach((nid) => {
    const item = getFieldNoteById(nid);
    if (item && item.id !== idOrSlug && item.slug !== idOrSlug) resolvedNotes.push(item);
  });

  const resolvedExperiments: LabExperiment[] = [];
  experimentSet.forEach((eid) => {
    const item = getLabExperimentById(eid);
    if (item && item.id !== idOrSlug && item.slug !== idOrSlug) resolvedExperiments.push(item);
  });

  const resolvedMilestones: JourneyMilestone[] = [];
  milestoneSet.forEach((mid) => {
    const item = getMilestoneById(mid);
    if (item && item.id !== idOrSlug) resolvedMilestones.push(item);
  });

  const resolvedResources: ResourceItem[] = [];
  resourceSet.forEach((rid) => {
    const item = getResourceById(rid);
    if (item && item.id !== idOrSlug) resolvedResources.push(item);
  });

  const resolvedIdeas: BeliefItem[] = [];
  ideaSet.forEach((bid) => {
    const item = getBeliefById(bid);
    if (item && item.id !== idOrSlug) resolvedIdeas.push(item);
  });

  return {
    projects: resolvedProjects,
    notes: resolvedNotes,
    experiments: resolvedExperiments,
    milestones: resolvedMilestones,
    resources: resolvedResources,
    ideas: resolvedIdeas,
    totalCount:
      resolvedProjects.length +
      resolvedNotes.length +
      resolvedExperiments.length +
      resolvedMilestones.length +
      resolvedResources.length +
      resolvedIdeas.length,
  };
}
