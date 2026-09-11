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
  PLANNED: {
    level: 'PLANNED',
    label: 'Planned Protocol',
    shortLabel: 'Planned',
    badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    description: 'Scoped protocol or planned inquiry; benchmark or live execution has not yet occurred.',
    isEmpirical: false,
  },
  IN_PROGRESS: {
    level: 'IN_PROGRESS',
    label: 'In Progress',
    shortLabel: 'In Progress',
    badgeClass: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    description: 'Active design modeling, architectural specification, or early draft in progress.',
    isEmpirical: false,
  },
  PROTOTYPE: {
    level: 'PROTOTYPE',
    label: 'Prototype',
    shortLabel: 'Prototype',
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    description: 'Working code prototype running in an isolated testbench or local client.',
    isEmpirical: true,
  },
  PRIVATE_TEST: {
    level: 'PRIVATE_TEST',
    label: 'Private Test',
    shortLabel: 'Private Test',
    badgeClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    description: 'Internal testing sandbox evaluated under controlled local conditions.',
    isEmpirical: true,
  },
  SHIPPED: {
    level: 'SHIPPED',
    label: 'Shipped',
    shortLabel: 'Shipped',
    badgeClass: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    description: 'Publicly released software running live in a production environment.',
    isEmpirical: true,
  },
  MEASURED: {
    level: 'MEASURED',
    label: 'Measured',
    shortLabel: 'Measured',
    badgeClass: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    description: 'Empirically quantified with verifiable, recorded metrics.',
    isEmpirical: true,
  },
  VERIFIED: {
    level: 'VERIFIED',
    label: 'Verified',
    shortLabel: 'Verified',
    badgeClass: 'bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    description: 'Independently corroborated or audited with reproducible proof.',
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
  HYPOTHESIS: {
    level: 'HYPOTHESIS',
    label: 'Hypothesis',
    shortLabel: 'Hypothesis',
    badgeClass: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    description: 'Formally stated proposition awaiting empirical testing or benchmark validation.',
    isEmpirical: false,
  },
  PROTOTYPE_SPIKE: {
    level: 'PROTOTYPE',
    label: 'Prototype',
    shortLabel: 'Prototype',
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    description: 'Exploratory code prototype running in an isolated testbench or local client.',
    isEmpirical: true,
  },
  OBSERVATION: {
    level: 'OBSERVATION',
    label: 'Field Observation',
    shortLabel: 'Observation',
    badgeClass: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    description: 'Qualitative observation or secondary domain analysis.',
    isEmpirical: false,
  },
  VALIDATED: {
    level: 'VALIDATED',
    label: 'Empirically Validated',
    shortLabel: 'Validated',
    badgeClass: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    description: 'Tested with reproducible evidence, benchmarks, or live deployments.',
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
