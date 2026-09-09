import React, { useState, useEffect, useRef } from 'react';
import { performGlobalSearch } from '../data/content';
import { SearchResult, PageRoute } from '../types';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, BookOpen, Layers, Terminal, Compass, Bookmark } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setQuery('');
      setResults(performGlobalSearch(''));
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const res = performGlobalSearch(query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        const item = results[selectedIndex];
        if (item) {
          handleSelect(item);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item: SearchResult) => {
    onNavigate(item.targetPage, item.targetId);
    onClose();
  };

  if (!isOpen) return null;

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'Build':
        return <Layers className="w-4 h-4 text-amber-500" />;
      case 'Field Note':
        return <BookOpen className="w-4 h-4 text-sky-500" />;
      case 'Lab':
        return <Terminal className="w-4 h-4 text-emerald-500" />;
      case 'Journey':
        return <Compass className="w-4 h-4 text-purple-500" />;
      case 'Resource':
        return <Bookmark className="w-4 h-4 text-rose-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-3 sm:pt-24 px-2.5 sm:px-4 pb-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Archive"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#121418] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3 bg-[#FBFBFA] dark:bg-[#0E0F12]">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Notes, Builds, Lab, Journey..."
            className="flex-1 min-w-0 bg-transparent text-base sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="min-h-[36px] px-2 text-xs font-mono-code text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800/40">
          {results.length > 0 ? (
            results.map((result, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-start justify-between gap-3 sm:gap-4 active:scale-[0.99] ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-950 dark:text-neutral-50'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 p-1.5 rounded-md bg-neutral-200/50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 shrink-0">
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100 truncate">
                          {result.title}
                        </span>
                        <span className="text-[10px] font-mono-code px-1.5 py-0.2 bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded">
                          {result.type}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                        {result.snippet}
                      </p>
                      <div className="text-[11px] font-mono-code text-neutral-400 dark:text-neutral-500 mt-1">
                        {result.meta}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-xs text-neutral-400 pt-1">
                    <span className="hidden sm:inline font-mono-code text-[11px]">Select</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-sm text-neutral-500 font-mono-code">
              {query ? (
                <>No matches found for "{query}". Try keywords like "Tatashi", "LLM", or "Zero".</>
              ) : (
                <>Type anything to search across the entire headquarters.</>
              )}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-[#0A0B0D] border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono-code text-neutral-500">
          <div className="sm:hidden text-neutral-400">
            Tap any item to navigate • {results.length} results
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-[10px]">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-[10px]">
                <CornerDownLeft className="w-2.5 h-2.5 inline" />
              </kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-[10px]">
                ESC
              </kbd>
              Close
            </span>
          </div>
          <span className="hidden sm:inline text-neutral-400">
            {results.length} total indexed items
          </span>
        </div>
      </div>
    </div>
  );
};
