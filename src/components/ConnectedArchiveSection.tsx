import React from 'react';
import { ArchiveEntityType, PageRoute } from '../types';
import { getConnectedArchiveContext } from '../data/archiveGraph';
import {
  Layers,
  BookOpen,
  FlaskConical,
  Milestone,
  Lightbulb,
  Bookmark,
  ArrowRight,
  ExternalLink,
  Share2
} from 'lucide-react';

interface ConnectedArchiveSectionProps {
  entityType: ArchiveEntityType;
  entityId: string;
  onNavigate: (page: PageRoute, itemId?: string) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ConnectedArchiveSection: React.FC<ConnectedArchiveSectionProps> = ({
  entityType,
  entityId,
  onNavigate,
  title = 'Connected in the Archive',
  subtitle = 'Cross-referenced notes, experiments, milestones, and principles linked across EddiPRINCE’s digital archive.',
  className = ''
}) => {
  const context = getConnectedArchiveContext(entityType, entityId);

  // If no connections exist, return null to avoid UI noise
  if (context.totalCount === 0) {
    return null;
  }

  return (
    <section className={`pt-10 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-6 ${className}`}>
      {/* Editorial Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-500 dark:text-neutral-400">
          <Share2 className="w-3.5 h-3.5 text-neutral-400" />
          <span className="uppercase tracking-wider font-semibold">Living Digital Archive</span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
            {context.totalCount} {context.totalCount === 1 ? 'Connection' : 'Connections'}
          </span>
        </div>
        <h3 className="font-serif-display text-2xl text-neutral-900 dark:text-neutral-50">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>

      <div className="space-y-6">
        {/* Connected Projects */}
        {context.projects.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Related Project & Architecture</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {context.projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onNavigate('builds', proj.id)}
                  className="group p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-500">
                      <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
                        {proj.status}
                      </span>
                      <span>{proj.category}</span>
                    </div>
                    <h4 className="font-serif-display text-lg sm:text-xl text-neutral-900 dark:text-neutral-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono-code text-neutral-900 dark:text-neutral-100 font-medium shrink-0 pt-2 sm:pt-0">
                    <span>Inspect Build</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Field Notes */}
        {context.notes.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Related Field Notes & Essays</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {context.notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onNavigate('notes', note.slug)}
                  className="group p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer flex flex-col justify-between space-y-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500">
                      <span>{note.category}</span>
                      <span>{note.readingTime}</span>
                    </div>
                    <h4 className="font-serif-display text-base sm:text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {note.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {note.summary}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1 text-xs font-mono-code text-neutral-800 dark:text-neutral-200 font-medium">
                    <span>Read Essay</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Lab Experiments */}
        {context.experiments.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Empirical Lab Experiments</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {context.experiments.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => onNavigate('lab', exp.id)}
                  className="group p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer flex flex-col justify-between space-y-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium">
                        {exp.status}
                      </span>
                      <span className="text-neutral-400">{exp.date}</span>
                    </div>
                    <h4 className="font-serif-display text-base sm:text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {exp.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-serif-display italic line-clamp-2 leading-relaxed">
                      "{exp.hypothesis}"
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1 text-xs font-mono-code text-neutral-800 dark:text-neutral-200 font-medium">
                    <span>Inspect Lab Results</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Journey Milestones */}
        {context.milestones.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              <Milestone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Timeline Milestones</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {context.milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onNavigate('journey', m.id)}
                  className="group p-3.5 rounded-lg border border-neutral-200/70 dark:border-neutral-800 bg-white/30 dark:bg-[#121418]/30 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-500">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{m.formattedMonth}</span>
                      <span>•</span>
                      <span className="uppercase text-[10px]">{m.type.replace('_', ' ')}</span>
                    </div>
                    <div className="font-serif-display text-base text-neutral-900 dark:text-neutral-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {m.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono-code text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 font-medium shrink-0">
                    <span>Timeline view</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Foundational Ideas & Principles */}
        {context.ideas.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Governing Principles & Stance</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {context.ideas.map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => onNavigate('about', idea.id)}
                  className="group p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer space-y-2"
                >
                  <h4 className="font-serif-display text-base sm:text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    "{idea.principle}"
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {idea.explanation}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-xs font-mono-code text-neutral-700 dark:text-neutral-300 font-medium">
                    <span>Read in Philosophy</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Resources & Literature */}
        {context.resources.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              <Bookmark className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Foundational Literature & Heuristics</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {context.resources.map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500">
                      <span>{res.category}</span>
                      <span className="text-[11px] px-2 py-0.2 bg-neutral-100 dark:bg-neutral-800 rounded">
                        {res.recommendationLevel}
                      </span>
                    </div>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif-display text-base text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{res.title}</span>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('resources', res.id)}
                    className="pt-1 text-left text-xs font-mono-code text-neutral-700 dark:text-neutral-300 hover:underline flex items-center gap-1"
                  >
                    <span>View in Reading List</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
