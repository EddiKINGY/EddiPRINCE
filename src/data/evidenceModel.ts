import { EvidenceLevel } from '../types';

export interface EvidenceMeta {
  level: EvidenceLevel;
  label: string;
  shortLabel: string;
  badgeClass: string;
  description: string;
  isEmpirical: boolean;
}

export const EVIDENCE_LEVEL_CONFIG: Record<EvidenceLevel, EvidenceMeta> = {
  IDEA: {
    level: 'IDEA',
    label: 'Idea / Thesis',
    shortLabel: 'Idea',
    badgeClass: 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700',
    description: 'Conceptual exploration, mental model, or philosophical thesis.',
    isEmpirical: false,
  },
  HYPOTHESIS: {
    level: 'HYPOTHESIS',
    label: 'Theoretical Hypothesis',
    shortLabel: 'Hypothesis',
    badgeClass: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    description: 'Formally stated proposition awaiting empirical testing or benchmark validation.',
    isEmpirical: false,
  },
  PLANNED: {
    level: 'PLANNED',
    label: 'Planned Protocol',
    shortLabel: 'Planned',
    badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    description: 'Scoped testing protocol or methodology; benchmark execution not yet performed.',
    isEmpirical: false,
  },
  IN_PROGRESS: {
    level: 'IN_PROGRESS',
    label: 'Active Exploration',
    shortLabel: 'In Progress',
    badgeClass: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    description: 'Investigation or implementation currently running in early draft stage.',
    isEmpirical: false,
  },
  OBSERVATION: {
    level: 'OBSERVATION',
    label: 'Field Observation',
    shortLabel: 'Observation',
    badgeClass: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    description: 'Qualitative field observation, secondary research, or domain interview.',
    isEmpirical: true,
  },
  PROTOTYPE_SPIKE: {
    level: 'PROTOTYPE_SPIKE',
    label: 'Prototype Spike',
    shortLabel: 'Prototype',
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    description: 'Exploratory code prototype running in an isolated testbench or live in this app.',
    isEmpirical: true,
  },
  VALIDATED: {
    level: 'VALIDATED',
    label: 'Empirically Validated',
    shortLabel: 'Validated',
    badgeClass: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    description: 'Tested with reproducible evidence, benchmarks, or live production deployments.',
    isEmpirical: true,
  },
  REFUTED: {
    level: 'REFUTED',
    label: 'Hypothesis Disproven',
    shortLabel: 'Refuted',
    badgeClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    description: 'Formally tested or evaluated and shown to be invalid or infeasible.',
    isEmpirical: true,
  },
};

export function getEvidenceMeta(level: EvidenceLevel): EvidenceMeta {
  return EVIDENCE_LEVEL_CONFIG[level] || EVIDENCE_LEVEL_CONFIG.IDEA;
}

/**
 * Validates that an item does not claim completed or validated status
 * without an explicit empirical methodology.
 */
export function validateTruthContract(item: {
  title: string;
  status: string;
  evidenceLevel: EvidenceLevel;
  result?: string;
}): { valid: boolean; warning?: string } {
  if ((item.status === 'COMPLETED' || item.evidenceLevel === 'VALIDATED') && !EVIDENCE_LEVEL_CONFIG[item.evidenceLevel].isEmpirical) {
    return {
      valid: false,
      warning: `Truth Violation: "${item.title}" is marked as COMPLETED/VALIDATED but has non-empirical evidence level "${item.evidenceLevel}".`,
    };
  }
  return { valid: true };
}
