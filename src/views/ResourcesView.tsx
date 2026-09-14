import React, { useState } from 'react';
import { PageRoute, ResourceCategory, ResourceItem } from '../types';
import { RESOURCES } from '../data/content';
import { ExternalLink, Share2, Layers, BookOpen, FlaskConical, Lightbulb } from 'lucide-react';
import { getConnectedArchiveContext } from '../data/archiveGraph';
import { Breadcrumb } from '../components/Breadcrumb';

interface ResourcesViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'BOOKS', 'DEVELOPMENT', 'BUSINESS', 'DESIGN'];

  const filteredResources = activeCategory === 'ALL'
    ? RESOURCES
    : RESOURCES.filter((r) => r.category === activeCategory);

  const getLevelBadge = (level: ResourceItem['recommendationLevel']) => {
    switch (level) {
      case 'Essential / Foundation':
        return 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200';
      case 'High Impact':
        return 'bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-200';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
    }
  };

  return (
    <div className="space-y-12 py-8 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="space-y-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
        <Breadcrumb items={[{ label: 'Resources', active: true }]} onNavigate={onNavigate} />
        <h1 className="font-serif-display text-4xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight">
          Resources & Reading
        </h1>

        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
          The books, technical papers, and system heuristics that form my intellectual foundation. Selected for lasting signal rather than momentary novelty.
        </p>

        {/* Category Filters (Horizontal touch rail on mobile, flex-wrap on desktop) */}
        <div className="pt-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all whitespace-nowrap shrink-0 flex items-center active:scale-95 ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource List */}
      <div className="space-y-6">
        {filteredResources.map((res) => (
          <article
            key={res.id}
            className="p-6 sm:p-7 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
              <span className={`px-2.5 py-0.5 rounded font-medium ${getLevelBadge(res.recommendationLevel)}`}>
                {res.recommendationLevel}
              </span>
              <span className="text-neutral-400">
                {res.category}
              </span>
            </div>

            <div className="space-y-1.5">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif-display text-2xl text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1.5"
              >
                <span>{res.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {res.description}
              </p>
            </div>

            {/* Commentary note */}
            <div className="p-4 rounded-lg bg-neutral-100/60 dark:bg-[#15181E] border border-neutral-200/60 dark:border-neutral-800/80 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <span className="font-mono-code font-semibold text-neutral-500 uppercase block mb-1">
                Personal Annotation:
              </span>
              {res.notes}
            </div>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap gap-1.5">
              {res.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Connected Archive Links */}
            {(() => {
              const archiveContext = getConnectedArchiveContext('RESOURCE', res.id);
              if (archiveContext.totalCount === 0) return null;

              return (
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    <Share2 className="w-3 h-3 text-neutral-400" />
                    <span>Referenced in Archive ({archiveContext.totalCount})</span>
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
                  </div>
                </div>
              );
            })()}
          </article>
        ))}
      </div>
    </div>
  );
};
