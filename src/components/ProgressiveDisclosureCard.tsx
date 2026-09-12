import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Layers, Terminal, Share2, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { EvidenceLevel } from '../types';

export interface ProgressiveDisclosureProps {
  id: string;
  // Level 1 — Immediate (Essential for first-time visitor)
  level1: {
    title: string;
    summary: string;
    state: {
      label: string;
      badgeClass?: string;
      evidenceLevel?: EvidenceLevel;
    };
    primaryAction: {
      label: string;
      onClick: () => void;
      ariaLabel?: string;
    };
  };
  // Level 2 — Supporting (Secondary context for interested readers)
  level2?: {
    tags?: string[];
    metadata?: { label: string; value: string }[];
    relatedWorkCount?: number;
    relatedWorkLabel?: string;
  };
  // Level 3 — Deep (Deep methodology, technical architecture, evidence & archive links)
  level3?: {
    methodology?: string;
    technicalDetails?: string | React.ReactNode;
    evidenceNotes?: string;
    archiveLinks?: { label: string; onClick: () => void; type?: string }[];
  };
  className?: string;
}

export const ProgressiveDisclosureCard: React.FC<ProgressiveDisclosureProps> = ({
  id,
  level1,
  level2,
  level3,
  className = '',
}) => {
  const [isDeepOpen, setIsDeepOpen] = useState(false);

  const hasLevel3 = Boolean(
    level3 && (level3.methodology || level3.technicalDetails || level3.evidenceNotes || (level3.archiveLinks && level3.archiveLinks.length > 0))
  );

  return (
    <article
      id={id}
      className={`p-5 sm:p-7 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/70 dark:bg-[#121418]/60 space-y-4 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 ${className}`}
    >
      {/* =========================================================================
          LEVEL 1 — IMMEDIATE (First-time visitor comprehension)
          1. Title
          2. Summary
          3. State
          4. Primary Action
         ========================================================================= */}
      <div className="space-y-3">
        {/* State Bar (Level 1: State) */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded font-semibold ${
                level1.state.badgeClass || 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
              }`}
            >
              {level1.state.label}
            </span>
            {level1.state.evidenceLevel && (
              <EvidenceBadge level={level1.state.evidenceLevel} />
            )}
          </div>
        </div>

        {/* Title (Level 1: Title) */}
        <h3 className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50 tracking-tight break-words">
          {level1.title}
        </h3>

        {/* Summary (Level 1: Summary) */}
        <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans-body max-w-[70ch]">
          {level1.summary}
        </p>

        {/* Primary Action (Level 1: Primary Action) */}
        <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={level1.primaryAction.onClick}
            aria-label={level1.primaryAction.ariaLabel || level1.primaryAction.label}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs font-mono-code font-semibold inline-flex items-center gap-2 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white"
          >
            <span>{level1.primaryAction.label}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          {/* Level 3 Toggle Button (Progressive Disclosure gate) */}
          {hasLevel3 && (
            <button
              type="button"
              onClick={() => setIsDeepOpen(!isDeepOpen)}
              aria-expanded={isDeepOpen}
              aria-controls={`${id}-level3-content`}
              className="min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-mono-code text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white"
            >
              <Terminal className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
              <span>{isDeepOpen ? 'Hide Deep Detail (L3)' : 'Inspect Deep Detail (L3)'}</span>
              {isDeepOpen ? (
                <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          LEVEL 2 — SUPPORTING (Secondary context for interested readers)
          1. Tags
          2. Metadata
          3. Related Work
         ========================================================================= */}
      {level2 && (
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2.5">
          {/* Metadata Row */}
          {level2.metadata && level2.metadata.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono-code text-neutral-500 dark:text-neutral-400">
              {level2.metadata.map((meta, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="text-neutral-400">{meta.label}:</span>
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">{meta.value}</span>
                </div>
              ))}
              {level2.relatedWorkCount !== undefined && level2.relatedWorkCount > 0 && (
                <div className="inline-flex items-center gap-1 text-neutral-500">
                  <Share2 className="w-3 h-3 text-neutral-400" aria-hidden="true" />
                  <span>
                    {level2.relatedWorkCount} {level2.relatedWorkLabel || 'Connected Records'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {level2.tags && level2.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5" aria-label="Tags and categories">
              {level2.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 rounded"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          LEVEL 3 — DEEP (Progressively disclosed)
          1. Methodology
          2. Technical Detail
          3. Evidence Notes
          4. Archive Relationships
         ========================================================================= */}
      {hasLevel3 && isDeepOpen && (
        <div
          id={`${id}-level3-content`}
          className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 uppercase tracking-wider">
            <span>Level 3 — Deep Specification & Evidence</span>
            <span>Archival Record</span>
          </div>

          {/* Methodology */}
          {level3?.methodology && (
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 space-y-1">
              <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold block">
                Methodology & Protocol
              </span>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans-body">
                {level3.methodology}
              </p>
            </div>
          )}

          {/* Technical Detail */}
          {level3?.technicalDetails && (
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 space-y-1">
              <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold block">
                Technical Detail & State Architecture
              </span>
              {typeof level3.technicalDetails === 'string' ? (
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans-body">
                  {level3.technicalDetails}
                </p>
              ) : (
                level3.technicalDetails
              )}
            </div>
          )}

          {/* Evidence Notes */}
          {level3?.evidenceNotes && (
            <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
              <span className="text-xs font-mono-code uppercase tracking-wider text-amber-800 dark:text-amber-300 font-semibold block">
                Epistemic Basis & Evidence Limits
              </span>
              <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed font-sans-body">
                {level3.evidenceNotes}
              </p>
            </div>
          )}

          {/* Archive Relationships */}
          {level3?.archiveLinks && level3.archiveLinks.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono-code text-neutral-500 uppercase tracking-wider block">
                Archive Relationships
              </span>
              <div className="flex flex-wrap gap-2">
                {level3.archiveLinks.map((link, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={link.onClick}
                    className="min-h-[38px] px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-mono-code flex items-center gap-1.5 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
