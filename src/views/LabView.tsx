import React, { useState } from 'react';
import { PageRoute, LabStatus } from '../types';
import { LAB_EXPERIMENTS } from '../data/content';
import { Terminal, AlertTriangle, CheckCircle2, XCircle, Share2, Layers, BookOpen, Lightbulb } from 'lucide-react';
import { getConnectedArchiveContext } from '../data/archiveGraph';
import { Breadcrumb } from '../components/Breadcrumb';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ProgressiveDisclosureCard } from '../components/ProgressiveDisclosureCard';

interface LabViewProps {
  selectedExperimentId?: string;
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const LabView: React.FC<LabViewProps> = ({ selectedExperimentId, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filters = ['ALL', 'PLANNED', 'IN PROGRESS', 'EXPLORING', 'REFUTED'];

  const filteredExperiments = activeFilter === 'ALL'
    ? LAB_EXPERIMENTS
    : LAB_EXPERIMENTS.filter((exp) => exp.status === activeFilter);

  const getStatusBadge = (status: LabStatus) => {
    switch (status) {
      case 'COMPLETED':
      case 'VALIDATED':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
      case 'PLANNED':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
      case 'IN PROGRESS':
      case 'EXPLORING':
      case 'PROTOTYPE_SPIKE':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300';
      case 'REFUTED':
      case 'ABANDONED':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
    }
  };

  return (
    <div className="space-y-12 py-8 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="space-y-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
        <Breadcrumb
          items={[
            { label: 'The Lab', page: 'lab' },
            ...(selectedExperimentId
              ? [{ label: selectedExperimentId, active: true }]
              : []),
          ]}
          onNavigate={onNavigate}
        />
        <h1 className="font-serif-display text-4xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight">
          The Lab
        </h1>

        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
          An empirical laboratory where technical assumptions, algorithmic spikes, and product models are tested before committing to production. Incomplete and abandoned experiments are recorded with the same rigor as successes.
        </p>

        <div className="p-4 rounded-lg bg-neutral-100/60 dark:bg-[#121418]/60 border border-neutral-200/80 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <strong className="font-mono-code font-semibold">The Operating Principle:</strong> An experiment that quickly disproves an invalid assumption is a high-value outcome. It prevents squandering months building the wrong system.
        </div>

        {/* Status Filters (Horizontal touch rail on mobile, flex-wrap on desktop) */}
        <div className="pt-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:flex-wrap">
            {filters.map((st) => (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all whitespace-nowrap shrink-0 flex items-center active:scale-95 ${
                  activeFilter === st
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Experiments Notebook with 3-Level Progressive Disclosure */}
      <div className="space-y-6 sm:space-y-8">
        {filteredExperiments.map((exp) => {
          const archiveContext = getConnectedArchiveContext('EXPERIMENT', exp.id);
          const isSelected = selectedExperimentId === exp.id;

          return (
            <ProgressiveDisclosureCard
              key={exp.id}
              id={exp.id}
              className={isSelected ? 'ring-2 ring-amber-400/30 border-amber-400 dark:border-amber-600' : ''}
              level1={{
                title: exp.title,
                summary: `"${exp.hypothesis}"`,
                state: {
                  label: exp.status,
                  badgeClass: getStatusBadge(exp.status),
                  evidenceLevel: exp.evidenceLevel,
                },
                primaryAction: {
                  label: exp.relatedProject ? `View Project Architecture` : 'Review Methodology & Takeaways',
                  onClick: () => {
                    if (exp.relatedProject) {
                      onNavigate('builds', exp.relatedProject);
                    }
                  },
                  ariaLabel: `Action for ${exp.title}`,
                },
              }}
              level2={{
                tags: exp.tags,
                metadata: [
                  { label: 'Date', value: exp.date },
                  { label: 'Status', value: exp.status },
                  ...(exp.relatedProject ? [{ label: 'Related Project', value: exp.relatedProject }] : []),
                ],
                relatedWorkCount: archiveContext.totalCount,
                relatedWorkLabel: 'Archive connections',
              }}
              level3={{
                methodology: exp.process,
                technicalDetails: (
                  <div className="space-y-2">
                    <div>
                      <strong className="text-neutral-900 dark:text-neutral-100 font-semibold block text-xs font-mono-code uppercase">
                        Empirical Finding:
                      </strong>
                      <p className="mt-0.5">{exp.result}</p>
                    </div>
                    <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                      <strong className="text-amber-800 dark:text-amber-300 font-semibold block text-xs font-mono-code uppercase">
                        Takeaway & Decision Rule:
                      </strong>
                      <p className="mt-0.5 text-amber-900 dark:text-amber-200">{exp.lesson}</p>
                    </div>
                  </div>
                ),
                evidenceNotes: `Epistemic Status: ${exp.evidenceLevel}. Objective: ${exp.objective}. Documented objectively to prevent repeating failure modes.`,
                archiveLinks: [
                  ...archiveContext.projects.map((p) => ({
                    label: `Project: ${p.title}`,
                    onClick: () => onNavigate('builds', p.id),
                  })),
                  ...archiveContext.notes.map((n) => ({
                    label: `Note: ${n.title}`,
                    onClick: () => onNavigate('notes', n.slug),
                  })),
                ],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

