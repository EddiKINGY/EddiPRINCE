import React, { useState } from 'react';
import { PageRoute, LabStatus } from '../types';
import { LAB_EXPERIMENTS } from '../data/content';
import { Terminal, AlertTriangle, CheckCircle2, XCircle, Share2, Layers, BookOpen, Lightbulb } from 'lucide-react';
import { getConnectedArchiveContext } from '../data/archiveGraph';
import { Breadcrumb } from '../components/Breadcrumb';
import { EvidenceBadge } from '../components/EvidenceBadge';

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

      {/* Experiments Notebook */}
      <div className="space-y-6 sm:space-y-8">
        {filteredExperiments.map((exp) => {
          const archiveContext = getConnectedArchiveContext('EXPERIMENT', exp.id);
          const isSelected = selectedExperimentId === exp.id;

          return (
            <article
              key={exp.id}
              id={exp.id}
              className={`p-4 sm:p-6 md:p-8 rounded-xl border bg-white/50 dark:bg-[#121418]/50 space-y-4 sm:space-y-5 transition-all ${
                isSelected
                  ? 'border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/20 shadow-sm'
                  : 'border-neutral-200/80 dark:border-neutral-800'
              }`}
            >
              {/* Metadata bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded font-semibold ${getStatusBadge(exp.status)}`}>
                    {exp.status}
                  </span>
                  <EvidenceBadge level={exp.evidenceLevel} />
                  {exp.relatedProject && (
                    <button
                      onClick={() => onNavigate('builds', exp.relatedProject)}
                      className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-2"
                    >
                      Related Project: {exp.relatedProject}
                    </button>
                  )}
                </div>
                <span className="text-neutral-400">
                  {exp.date}
                </span>
              </div>

              {/* Title & Hypothesis */}
              <div className="space-y-2">
                <h2 className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100">
                  {exp.title}
                </h2>
                <div className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
                  Working Hypothesis
                </div>
                <p className="text-base text-neutral-800 dark:text-neutral-200 font-serif-display italic leading-relaxed">
                  "{exp.hypothesis}"
                </p>
              </div>

              {/* Methodology & Results */}
              <div className="space-y-3 pt-2 text-sm text-neutral-700 dark:text-neutral-300">
                <div className="space-y-1">
                  <div className="text-xs font-mono-code uppercase text-neutral-400 font-semibold">
                    Test Methodology & Protocol
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {exp.process}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-neutral-100/60 dark:bg-[#15181E] border border-neutral-200/80 dark:border-neutral-800 space-y-1">
                  <div className="text-xs font-mono-code uppercase text-neutral-500 dark:text-neutral-400 font-semibold">
                    Finding & Current Status
                  </div>
                  <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                    {exp.result}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 space-y-1">
                  <div className="text-xs font-mono-code uppercase text-amber-800 dark:text-amber-300 font-semibold">
                    Takeaway & Decision Rule
                  </div>
                  <p className="text-amber-900 dark:text-amber-200/90 leading-relaxed">
                    {exp.lesson}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-2 flex flex-wrap gap-1.5 border-t border-neutral-100 dark:border-neutral-800/80">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Connected Archive Context */}
              {archiveContext.totalCount > 0 && (
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    <Share2 className="w-3 h-3 text-neutral-400" />
                    <span>Connected Archive Context ({archiveContext.totalCount})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {archiveContext.projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onNavigate('builds', p.id)}
                        className="px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 hover:border-amber-400 flex items-center gap-1.5 transition-colors"
                      >
                        <Layers className="w-3 h-3 text-amber-600" />
                        <span>Project: {p.title}</span>
                      </button>
                    ))}
                    {archiveContext.notes.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => onNavigate('notes', n.slug)}
                        className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 text-blue-900 dark:text-blue-200 hover:border-blue-400 flex items-center gap-1.5 transition-colors"
                      >
                        <BookOpen className="w-3 h-3 text-blue-600" />
                        <span>Note: {n.title}</span>
                      </button>
                    ))}
                    {archiveContext.ideas.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => onNavigate('about', b.id)}
                        className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 flex items-center gap-1.5 transition-colors"
                      >
                        <Lightbulb className="w-3 h-3 text-amber-500" />
                        <span className="truncate max-w-[220px]">Principle: "{b.principle}"</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

