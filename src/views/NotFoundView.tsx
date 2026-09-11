import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { Compass, Home, Hammer, BookOpen, Search, ArrowRight } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
  onOpenSearch?: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate, onOpenSearch }) => {
  return (
    <main className="space-y-10 py-6 sm:py-12 animate-in fade-in duration-200" id="not-found-view">
      <Breadcrumb
        items={[
          { label: 'Archive', page: 'home' },
          { label: '404' },
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-xl mx-auto text-center space-y-8 py-8 sm:py-12 px-4">
        {/* Subtle Icon Badge */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 shadow-sm">
          <Compass className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
        </div>

        {/* 404 & Title */}
        <div className="space-y-3">
          <span className="inline-block text-xs font-mono-code uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Archive Error
          </span>
          <div className="font-mono-code text-5xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            404
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-100 tracking-tight">
            This page doesn't exist.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mx-auto font-sans-body">
            The link you followed may be outdated, moved, or misspelled. Use the paths below to find your way back through the digital archive.
          </p>
        </div>

        {/* Core Navigation Directives */}
        <div className="pt-2 flex flex-col gap-3 max-w-sm mx-auto">
          <button
            id="not-found-return-home"
            onClick={() => onNavigate('home')}
            className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium text-sm flex items-center justify-center gap-2.5 hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Return home</span>
          </button>

          <button
            id="not-found-explore-builds"
            onClick={() => onNavigate('builds')}
            className="w-full min-h-[48px] px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 font-medium text-sm flex items-center justify-center gap-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <Hammer className="w-4 h-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
            <span>Explore builds</span>
          </button>

          <button
            id="not-found-read-writing"
            onClick={() => onNavigate('notes')}
            className="w-full min-h-[48px] px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 font-medium text-sm flex items-center justify-center gap-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <BookOpen className="w-4 h-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
            <span>Read the latest writing</span>
          </button>
        </div>

        {/* Global Search Option */}
        {onOpenSearch && (
          <div className="pt-4">
            <button
              id="not-found-search-button"
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors py-2 px-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Search className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Or search the archive with ⌘K</span>
              <ArrowRight className="w-3 h-3 ml-0.5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Quiet Colophon / Directory Tags */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono-code text-neutral-500 dark:text-neutral-500">
          EddiPRINCE.com • Digital Archive
        </div>
      </div>
    </main>
  );
};

