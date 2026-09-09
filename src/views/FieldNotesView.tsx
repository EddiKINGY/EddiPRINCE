import React, { useState } from 'react';
import { PageRoute } from '../types';
import { FIELD_NOTES } from '../data/content';
import { ArrowRight, ArrowLeft, Copy, Check, Share2 } from 'lucide-react';
import { ConnectedArchiveSection } from '../components/ConnectedArchiveSection';
import { getConnectedArchiveContext } from '../data/archiveGraph';
import { Breadcrumb } from '../components/Breadcrumb';

interface FieldNotesViewProps {
  selectedNoteSlug?: string;
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const FieldNotesView: React.FC<FieldNotesViewProps> = ({ selectedNoteSlug, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);

  const categories = ['ALL', 'BUILDING', 'BUSINESS', 'TECHNOLOGY'];

  const selectedNote = selectedNoteSlug
    ? FIELD_NOTES.find((n) => n.slug === selectedNoteSlug || n.id === selectedNoteSlug)
    : null;

  const filteredNotes = activeCategory === 'ALL'
    ? FIELD_NOTES
    : FIELD_NOTES.filter((n) => n.category === activeCategory);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && selectedNote) {
      const url = `${window.location.origin}${window.location.pathname}#notes/${selectedNote.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // If a note is selected, render the focused editorial reading experience
  if (selectedNote) {
    return (
      <article className="max-w-2xl mx-auto space-y-12 py-8">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between gap-3">
          <Breadcrumb
            items={[
              { label: 'Field Notes', page: 'notes' },
              { label: selectedNote.title, active: true },
            ]}
            onNavigate={onNavigate}
          />
          <button
            onClick={() => onNavigate('notes')}
            className="min-h-[44px] px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-white active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Notes</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-neutral-400">
            <span className="uppercase text-neutral-700 dark:text-neutral-300 font-medium">{selectedNote.category}</span>
            <span>•</span>
            <span>{selectedNote.publicationDate}</span>
            <span>•</span>
            <span>{selectedNote.readingTime}</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 leading-[1.12] break-words">
            {selectedNote.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-serif-display italic text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {selectedNote.subtitle}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-neutral-500 border-t border-neutral-100 dark:border-neutral-800/80">
            <div>By <strong className="text-neutral-900 dark:text-neutral-100">{selectedNote.author}</strong></div>
            <button
              onClick={handleCopyLink}
              className="min-h-[40px] px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white active:scale-95 transition-all text-neutral-700 dark:text-neutral-300"
              aria-label="Copy note link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Note'}</span>
            </button>
          </div>
        </header>

        {/* Table of Contents */}
        {selectedNote.tableOfContents.length > 0 && (
          <nav aria-label="Table of Contents" className="p-4 sm:p-5 rounded-xl bg-neutral-100/60 dark:bg-[#121418]/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
            <div className="text-xs font-mono-code uppercase tracking-wider text-neutral-400 font-semibold">
              Outline
            </div>
            <ul className="space-y-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              {selectedNote.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="min-h-[36px] flex items-center hover:underline hover:text-neutral-900 dark:hover:text-neutral-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body */}
        <div className="prose-editorial text-neutral-800 dark:text-neutral-200">
          {selectedNote.content.map((block, idx) => {
            if (block.startsWith('### ')) {
              const text = block.replace('### ', '');
              const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <h2
                  key={idx}
                  id={slug}
                  className="scroll-mt-24"
                >
                  {text}
                </h2>
              );
            }
            if (block.startsWith('1. ') || block.startsWith('2. ') || block.startsWith('3. ')) {
              return (
                <p key={idx} className="pl-4 border-l-2 border-neutral-300 dark:border-neutral-700">
                  {block}
                </p>
              );
            }
            if (block.startsWith('- ')) {
              return (
                <div key={idx} className="pl-4 py-1 text-base text-neutral-700 dark:text-neutral-300">
                  {block}
                </div>
              );
            }
            return (
              <p key={idx}>
                {block}
              </p>
            );
          })}
        </div>

        {/* Tags & Continuing Readings */}
        <footer className="pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono-code text-neutral-400">Tags:</span>
            {selectedNote.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Connected Archive Relationships */}
          <ConnectedArchiveSection
            entityType="ARTICLE"
            entityId={selectedNote.slug}
            onNavigate={onNavigate}
            title="Connected in the Archive"
            subtitle="Builds, empirical experiments, milestones, and foundational principles cross-referenced with this note."
          />
        </footer>

      </article>
    );
  }

  // Archive View (All Field Notes)
  return (
    <div className="space-y-12 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="space-y-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
        <Breadcrumb items={[{ label: 'Field Notes', active: true }]} onNavigate={onNavigate} />
        <h1 className="font-serif-display text-4xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight">
          Field Notes
        </h1>

        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
          Essays, architectural deconstructions, and observations on building systems. Written to crystallize thoughts and compound technical understanding over decades.
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

      {/* Notes List */}
      <div className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
        {filteredNotes.map((note) => {
          const archiveContext = getConnectedArchiveContext('ARTICLE', note.slug);
          return (
            <article
              key={note.id}
              onClick={() => onNavigate('notes', note.slug)}
              className="py-6 sm:py-8 group cursor-pointer space-y-2.5 transition-colors p-2 -mx-2 sm:p-0 sm:mx-0 rounded-xl active:bg-neutral-100/70 dark:active:bg-neutral-800/40"
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-mono-code text-neutral-400">
                <span className="uppercase text-neutral-700 dark:text-neutral-300 font-medium">{note.category}</span>
                <span>•</span>
                <span>{note.publicationDate}</span>
                <span>•</span>
                <span>{note.readingTime}</span>
                {archiveContext.totalCount > 0 && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-neutral-500">
                      <Share2 className="w-3 h-3 text-neutral-400" />
                      <span>{archiveContext.totalCount} Archive links</span>
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4 break-words">
                {note.title}
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {note.summary}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

