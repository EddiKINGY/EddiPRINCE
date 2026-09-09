import React, { useState } from 'react';
import { PageRoute, MilestoneType, JourneyMilestone } from '../types';
import { JOURNEY_MILESTONES } from '../data/content';
import { Compass, ArrowRight, Flag, Calendar, Sparkles, AlertCircle, CheckCircle2, GitCommit, Split, Share2, Layers, BookOpen, FlaskConical, Lightbulb } from 'lucide-react';
import { getConnectedArchiveContext } from '../data/archiveGraph';
import { Breadcrumb } from '../components/Breadcrumb';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface JourneyViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const JourneyView: React.FC<JourneyViewProps> = ({ onNavigate }) => {
  const [activeType, setActiveType] = useState<string>('ALL');

  const types = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Projects', value: 'project_started' },
    { label: 'Experiments', value: 'experiment' },
    { label: 'Breakthroughs', value: 'breakthrough' },
    { label: 'Decisions', value: 'decision' },
  ];

  const filteredMilestones = activeType === 'ALL'
    ? JOURNEY_MILESTONES
    : JOURNEY_MILESTONES.filter((m) => m.type === activeType);

  const getMilestoneIcon = (type: MilestoneType) => {
    switch (type) {
      case 'project_started':
        return <GitCommit className="w-3.5 h-3.5 text-amber-500" />;
      case 'breakthrough':
        return <Sparkles className="w-3.5 h-3.5 text-purple-500" />;
      case 'experiment':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'decision':
        return <Split className="w-3.5 h-3.5 text-sky-500" />;
      default:
        return <Flag className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      
      {/* Header */}
      <div className="space-y-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
        <Breadcrumb items={[{ label: 'The Journey', active: true }]} onNavigate={onNavigate} />
        <h1 className="font-serif-display text-4xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight">
          The Journey
        </h1>

        <div className="text-xl sm:text-2xl font-serif-display italic text-neutral-700 dark:text-neutral-300">
          "The compound timeline from zero."
        </div>

        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
          Every meaningful endeavor begins without momentum. This chronological timeline documents the real sequence of technical decisions, architectural breakthroughs, experiments, and lessons learned.
        </p>

        {/* Filter controls (Horizontal touch rail on mobile, flex-wrap on desktop) */}
        <div className="pt-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:flex-wrap">
            {types.map((t) => (
              <button
                key={t.value}
                onClick={() => setActiveType(t.value)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all whitespace-nowrap shrink-0 flex items-center active:scale-95 ${
                  activeType === t.value
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline entries */}
      <div className="relative pl-6 sm:pl-8 border-l border-neutral-200/80 dark:border-neutral-800 space-y-8 sm:space-y-10 ml-4 sm:ml-2">
        {filteredMilestones.map((m) => (
          <div key={m.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#0E0F12] border border-neutral-300 dark:border-neutral-700 flex items-center justify-center shadow-xs">
              {getMilestoneIcon(m.type)}
            </div>

            <div className="p-4 sm:p-7 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-500">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {m.formattedMonth}
                  </span>
                  <span>•</span>
                  <span className="uppercase px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-[10px]">
                    {m.type.replace('_', ' ')}
                  </span>
                  {m.evidenceLevel && <EvidenceBadge level={m.evidenceLevel} />}
                </div>
              </div>

              <h2 className="font-serif-display text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100 break-words">
                {m.title}
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {m.description}
              </p>

              {m.context && (
                <div className="p-3.5 rounded-lg bg-neutral-100/60 dark:bg-[#15181E] border border-neutral-200/60 dark:border-neutral-800/80 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <strong className="text-neutral-800 dark:text-neutral-200 font-mono-code">Context:</strong> {m.context}
                </div>
              )}

              {/* Connected Archive Links */}
              {(() => {
                const archiveContext = getConnectedArchiveContext('MILESTONE', m.id);
                if (archiveContext.totalCount === 0 && !m.relatedRoute) return null;

                return (
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      <Share2 className="w-3 h-3 text-neutral-400" />
                      <span>Archive Connections</span>
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
                      {archiveContext.experiments.map((exp) => (
                        <button
                          key={exp.id}
                          onClick={() => onNavigate('lab', exp.id)}
                          className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200 hover:border-emerald-400 flex items-center gap-1.5 transition-colors"
                        >
                          <FlaskConical className="w-3 h-3 text-emerald-600" />
                          <span>Experiment: {exp.title}</span>
                        </button>
                      ))}
                      {archiveContext.ideas.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => onNavigate('about', b.id)}
                          className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 flex items-center gap-1.5 transition-colors"
                        >
                          <Lightbulb className="w-3 h-3 text-amber-500" />
                          <span className="truncate max-w-[200px]">Principle: "{b.principle}"</span>
                        </button>
                      ))}
                      {m.relatedRoute && archiveContext.projects.length === 0 && archiveContext.notes.length === 0 && (
                        <button
                          onClick={() => onNavigate(m.relatedRoute!.page, m.relatedRoute!.id)}
                          className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 flex items-center gap-1.5 transition-colors"
                        >
                          <span>{m.relatedRoute.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>

      {/* The Zero Anchor Note */}
      <div className="p-6 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 text-center space-y-2 bg-[#FBFBFA] dark:bg-[#0E0F12]">
        <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
          The Origin Anchor
        </span>
        <p className="font-serif-display text-base text-neutral-700 dark:text-neutral-300 italic">
          "The timeline starts here. Every milestone above was achieved with zero shortcuts."
        </p>
        <p className="text-xs text-neutral-500 font-mono-code">
          New milestones are committed continuously as builds progress.
        </p>
      </div>

    </div>
  );
};
