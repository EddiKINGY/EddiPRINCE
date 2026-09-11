import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Search, Sun, Moon, Menu, X, Mail } from 'lucide-react';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, itemId?: string) => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenContact,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Miller's Law: Chunked into Core Archive (5 items) and Context & Foundations (3 items)
  const coreArchiveNav: { label: string; page: PageRoute; hint: string }[] = [
    { label: 'Builds', page: 'builds', hint: 'Software Systems' },
    { label: 'Field Notes', page: 'notes', hint: 'Essays & Deconstructions' },
    { label: 'Lab', page: 'lab', hint: 'Empirical Spikes' },
    { label: 'Journey', page: 'journey', hint: 'Chronological Milestones' },
  ];

  const contextNav: { label: string; page: PageRoute; hint: string }[] = [
    { label: 'Now (/now)', page: 'now', hint: 'Active Sprint & Bandwidth' },
    { label: 'About', page: 'about', hint: 'Philosophy & Operating Principles' },
    { label: 'Resources', page: 'resources', hint: 'Curated Reading & Tools' },
    { label: 'Trust & Colophon', page: 'trust', hint: 'Zero Synthetic Prestige Protocol' },
  ];

  const primaryNavItems: { label: string; page: PageRoute }[] = [
    { label: 'Builds', page: 'builds' },
    { label: 'Field Notes', page: 'notes' },
    { label: 'Lab', page: 'lab' },
    { label: 'Journey', page: 'journey' },
    { label: 'About', page: 'about' },
    { label: 'Now', page: 'now' },
    { label: 'Resources', page: 'resources' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 dark:border-neutral-800/70 bg-[#FAF9F5]/90 dark:bg-[#0E0F12]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <button
          id="header-brand-logo"
          onClick={() => handleNavClick('home')}
          className="group text-left flex items-baseline gap-2 focus:outline-none min-h-[44px] min-w-[44px] items-center"
          aria-label="EddiPRINCE Home"
        >
          <span className="font-serif-display text-2xl tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
            EddiPRINCE
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {primaryNavItems.map((item) => {
            const isActive =
              currentPage === item.page ||
              (item.page === 'builds' && currentPage === 'build-detail') ||
              (item.page === 'notes' && currentPage === 'note-detail') ||
              (item.page === 'lab' && currentPage === 'lab-detail');
            return (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-1.5 text-sm transition-colors rounded-md ${
                  isActive
                    ? 'text-neutral-950 dark:text-white font-medium bg-neutral-200/50 dark:bg-neutral-800/60'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action controls with Fitts's Law touch comfort (minimum 44px) */}
        <div className="flex items-center gap-1">
          {/* Global Search Button */}
          <button
            id="header-search-trigger"
            onClick={onOpenSearch}
            aria-label="Search site (Press ⌘K)"
            className="flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-2 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60 rounded-lg transition-all"
          >
            <Search className="w-4 h-4" />
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono-code bg-neutral-200/50 dark:bg-neutral-800 border border-neutral-300/60 dark:border-neutral-700/60 rounded text-neutral-500">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            id="header-theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center min-h-[44px] min-w-[44px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="header-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer-menu"
            className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer - Structured via Miller's Law, Fitts's Law, and Proximity */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-[#FAF9F5] dark:bg-[#0E0F12] px-4 py-5 space-y-5 animate-in slide-in-from-top-2 duration-150"
        >
          {/* Home Fast Link */}
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-lg text-left text-sm flex items-center justify-between transition-colors ${
              currentPage === 'home'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium'
                : 'bg-white dark:bg-[#14161B] border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200'
            }`}
          >
            <span className="font-medium">Home (Overview)</span>
            <span className="text-xs font-mono-code opacity-60">/</span>
          </button>

          {/* Group 1: Core Archive (Chunk 1 - Miller's Law) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-neutral-500 px-1 font-semibold">
              01 / Core Archive
            </div>
            <div className="space-y-1">
              {coreArchiveNav.map((item) => {
                const isActive =
                  currentPage === item.page ||
                  (item.page === 'builds' && currentPage === 'build-detail') ||
                  (item.page === 'notes' && currentPage === 'note-detail') ||
                  (item.page === 'lab' && currentPage === 'lab-detail');
                return (
                  <button
                    key={item.page}
                    id={`mobile-nav-link-${item.page}`}
                    onClick={() => handleNavClick(item.page)}
                    className={`w-full min-h-[48px] px-3.5 py-2.5 text-left rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium'
                        : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 active:bg-neutral-200/60 dark:active:bg-neutral-700/60'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className={`text-[11px] font-mono-code ${isActive ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400'}`}>
                        {item.hint}
                      </div>
                    </div>
                    <span className="text-xs font-mono-code opacity-50">/{item.page}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Context & Principles (Chunk 2 - Miller's Law) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono-code uppercase tracking-wider text-neutral-500 px-1 font-semibold">
              02 / Context & Operating Principles
            </div>
            <div className="space-y-1">
              {contextNav.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    id={`mobile-nav-link-${item.page}`}
                    onClick={() => handleNavClick(item.page)}
                    className={`w-full min-h-[48px] px-3.5 py-2.5 text-left rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium'
                        : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 active:bg-neutral-200/60 dark:active:bg-neutral-700/60'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <div className={`text-[11px] font-mono-code ${isActive ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400'}`}>
                        {item.hint}
                      </div>
                    </div>
                    <span className="text-xs font-mono-code opacity-50">/{item.page}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row - Fitts's Law min-h-[48px] targets */}
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 gap-2.5">
            <button
              id="mobile-search-trigger"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="min-h-[48px] px-3 py-2 text-xs font-mono-code font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5 active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-neutral-500" />
              <span>Search (⌘K)</span>
            </button>

            <button
              id="mobile-contact-trigger"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="min-h-[48px] px-3 py-2 text-xs font-mono-code font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-lg text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5 active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-500" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

