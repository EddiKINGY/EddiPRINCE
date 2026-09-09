import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ContactModal } from './components/ContactModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { BuildsView } from './views/BuildsView';
import { LabView } from './views/LabView';
import { FieldNotesView } from './views/FieldNotesView';
import { JourneyView } from './views/JourneyView';
import { NowView } from './views/NowView';
import { ResourcesView } from './views/ResourcesView';

export default function App() {
  const parseRouteFromLocation = (): { page: PageRoute; itemId?: string } => {
    if (typeof window === 'undefined') return { page: 'home' };
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { page: 'home' };

    const parts = hash.split('/');
    const pageKey = parts[0] as PageRoute;
    const itemId = parts[1] || undefined;

    const validPages: PageRoute[] = ['home', 'about', 'builds', 'build-detail', 'lab', 'lab-detail', 'notes', 'note-detail', 'journey', 'now', 'resources'];
    if (validPages.includes(pageKey)) {
      return { page: pageKey, itemId };
    }
    return { page: 'home' };
  };

  const initialRoute = parseRouteFromLocation();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(initialRoute.itemId);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Sync route on popstate / hashchange (browser forward/back buttons)
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseRouteFromLocation();
      setCurrentPage(route.page);
      setSelectedItemId(route.itemId);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Handle dark mode DOM class and localStorage persistence
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme-mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('theme-mode', 'light');
    }
  }, [isDarkMode]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update page title dynamically for SEO and UX
  useEffect(() => {
    const baseTitle = 'EddiPRINCE — Building My Future From Scratch';
    switch (currentPage) {
      case 'home':
        document.title = baseTitle;
        break;
      case 'about':
        document.title = 'About & Foundations — EddiPRINCE';
        break;
      case 'builds':
        document.title = selectedItemId ? `${selectedItemId} — Builds | EddiPRINCE` : 'Builds & Projects — EddiPRINCE';
        break;
      case 'lab':
        document.title = 'The Lab: Hypotheses & Experiments — EddiPRINCE';
        break;
      case 'notes':
        document.title = selectedItemId ? `${selectedItemId} — Field Notes | EddiPRINCE` : 'Field Notes — EddiPRINCE';
        break;
      case 'journey':
        document.title = 'The Journey: Timeline from Zero — EddiPRINCE';
        break;
      case 'now':
        document.title = 'What I’m Doing Now (/now) — EddiPRINCE';
        break;
      case 'resources':
        document.title = 'Curated Resources — EddiPRINCE';
        break;
      default:
        document.title = baseTitle;
    }
  }, [currentPage, selectedItemId]);

  const handleNavigate = (page: PageRoute, itemId?: string) => {
    setCurrentPage(page);
    setSelectedItemId(itemId);

    if (typeof window !== 'undefined') {
      const hash = page === 'home' ? '' : `#${page}${itemId ? `/${itemId}` : ''}`;
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash || window.location.pathname);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] dark:bg-[#0E0F12] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 overflow-x-hidden w-full">
      
      {/* Top Header Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 min-w-0">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {(currentPage === 'builds' || currentPage === 'build-detail') && (
          <BuildsView
            selectedProjectId={selectedItemId}
            onNavigate={handleNavigate}
          />
        )}

        {(currentPage === 'lab' || currentPage === 'lab-detail') && (
          <LabView
            selectedExperimentId={selectedItemId}
            onNavigate={handleNavigate}
          />
        )}

        {(currentPage === 'notes' || currentPage === 'note-detail') && (
          <FieldNotesView
            selectedNoteSlug={selectedItemId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'journey' && (
          <JourneyView onNavigate={handleNavigate} />
        )}

        {currentPage === 'now' && (
          <NowView onNavigate={handleNavigate} />
        )}

        {currentPage === 'resources' && (
          <ResourcesView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Understated Editorial Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Global Command Palette Search */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Global Contact Drawer/Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
