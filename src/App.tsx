import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ContactModal } from './components/ContactModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { BuildsView } from './views/BuildsView';
import { LabView } from './views/LabView';
import { FieldNotesView } from './views/FieldNotesView';
import { JourneyView } from './views/JourneyView';
import { NowView } from './views/NowView';
import { ResourcesView } from './views/ResourcesView';
import { TrustView } from './views/TrustView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';
import { NotFoundView } from './views/NotFoundView';
import { ContactView } from './views/ContactView';
import { getRouteSeo, applySeoMeta } from './utils/seo';
import { RouteProgressBar } from './components/LoadingSkeleton';
import { analytics, initPerformanceMonitoring } from './services';
import { PROJECTS, FIELD_NOTES } from './data/content';



export default function App() {
  const parseRouteFromLocation = (): { page: PageRoute; itemId?: string } => {
    if (typeof window === 'undefined') return { page: 'home' };
    const hash = window.location.hash.replace(/^#\/?/, '');
    const pathname = window.location.pathname.replace(/^\//, '');
    let routeStr = hash;
    if (!routeStr && pathname && pathname !== 'index.html') {
      routeStr = pathname;
    }
    if (!routeStr) return { page: 'home' };

    const parts = routeStr.split('/');
    let pageKey = parts[0] as PageRoute;
    const itemId = parts[1] || undefined;

    const validPages: PageRoute[] = [
      'home',
      'about',
      'builds',
      'build-detail',
      'lab',
      'lab-detail',
      'notes',
      'writing',
      'note-detail',
      'journey',
      'now',
      'resources',
      'contact',
      'privacy',
      'terms',
      'trust',
      'not-found',
    ];
    if (validPages.includes(pageKey)) {
      return { page: pageKey, itemId };
    }
    return { page: 'not-found' };
  };

  const initialRoute = parseRouteFromLocation();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(initialRoute.itemId);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

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

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for search) and performance initialization
  useEffect(() => {
    initPerformanceMonitoring();

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

  // Update route-specific SEO metadata dynamically and track anonymous page view
  useEffect(() => {
    const seo = getRouteSeo(currentPage, selectedItemId);
    applySeoMeta(seo);
    analytics.trackPageView(currentPage, seo.title);
  }, [currentPage, selectedItemId]);


  const handleNavigate = (page: PageRoute, itemId?: string) => {
    setIsNavigating(true);
    setCurrentPage(page);
    setSelectedItemId(itemId);

    // Track product signals anonymously
    if (itemId) {
      if (page === 'builds' || page === 'build-detail') {
        const project = PROJECTS.find((p) => p.id === itemId || p.slug === itemId);
        analytics.trackProjectClick(itemId, project?.title || itemId);
      } else if (page === 'notes' || page === 'writing' || page === 'note-detail') {
        const note = FIELD_NOTES.find((n) => n.id === itemId || n.slug === itemId);
        analytics.trackArticleOpen(itemId, note?.title || itemId);
      }
    }

    if (typeof window !== 'undefined') {
      const hash = page === 'home' ? '' : `#${page}${itemId ? `/${itemId}` : ''}`;
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash || window.location.pathname);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsNavigating(false);
    }, 360);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] dark:bg-[#0E0F12] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 overflow-x-hidden w-full">
      <RouteProgressBar isNavigating={isNavigating} />
      
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-neutral-900 focus:text-white dark:focus:bg-white dark:focus:text-neutral-950 focus:rounded-xl focus:shadow-xl focus:font-mono-code focus:text-xs focus:ring-2 focus:ring-emerald-500"
      >
        Skip to main content
      </a>

      {/* Top Header Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area guarded by ErrorBoundary */}
      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 min-w-0 pb-16 md:pb-8">
        <ErrorBoundary>
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

          {(currentPage === 'notes' || currentPage === 'writing' || currentPage === 'note-detail') && (
            <FieldNotesView
              selectedNoteSlug={selectedItemId}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'contact' && (
            <ContactView onNavigate={handleNavigate} />
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

          {currentPage === 'privacy' && (
            <PrivacyView
              onNavigate={handleNavigate}
              onOpenContact={() => setIsContactOpen(true)}
            />
          )}

          {currentPage === 'terms' && (
            <TermsView
              onNavigate={handleNavigate}
              onOpenContact={() => setIsContactOpen(true)}
            />
          )}

          {currentPage === 'trust' && (
            <TrustView
              onNavigate={handleNavigate}
              onOpenContact={() => setIsContactOpen(true)}
            />
          )}

          {currentPage === 'not-found' && (
            <NotFoundView
              onNavigate={handleNavigate}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}
        </ErrorBoundary>
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
