import React from 'react';
import { PageRoute } from '../types';
import { CURRENTLY, PROJECTS, FIELD_NOTES, JOURNEY_MILESTONES, BELIEFS } from '../data/content';
import { NewsletterSection } from '../components/NewsletterSection';
import { EvidenceBadge } from '../components/EvidenceBadge';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Layers,
  Sparkles,
  Compass,
  MessageSquare,
  Clock,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
  onOpenContact?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenContact }) => {
  const featuredProject = PROJECTS[0]; // Tatashi Market (Flagship Build - Pareto 80/20)
  const secondaryProjects = PROJECTS.slice(1, 3);
  const featuredNotes = FIELD_NOTES.slice(0, 3);
  const recentMilestones = JOURNEY_MILESTONES.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-20 py-4 sm:py-8">

      {/* =========================================================================
          STAGE 1: IDENTITY (THE FIRST VIEWPORT)
          Strictly answers:
          1. Who is Eddi?
          2. What does he do?
          3. What is he doing now?
          4. Where should I go next?
          Layout:
          - Responsive 12-column grid on desktop eliminating horizontal dead space
          - Natural vertical pacing eliminating empty top/bottom voids
          Applies: Hick's Law (≤ 2 hero actions), Fitts's Law (48px+ targets),
                   Von Restorff Effect (isolated high-contrast action & live state beacon),
                   Prägnanz (clean, balanced geometry).
         ========================================================================= */}
      <section
        id="identity"
        className="w-full pt-2 sm:pt-4 pb-2 sm:pb-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Primary Narrative, Actions & Page Outline (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Live Status Beacon (Answers: What is he doing now? - Von Restorff Isolation) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-code bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold uppercase tracking-wider text-[10px]">Active Sprint</span>
                <span className="text-emerald-400 dark:text-emerald-600">•</span>
                <span>September 2026 Cycle</span>
              </div>

              <span className="text-xs font-mono-code text-neutral-400 hidden sm:inline">
                Zero-State Documented Daily
              </span>
            </div>

            {/* Identity & Mission (Answers: Who is Eddi? What is he building? What is the site?) */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-[1.02] break-words">
                EddiPRINCE
              </h1>

              <p className="font-serif-display text-xl sm:text-2xl md:text-3xl text-neutral-700 dark:text-neutral-200 leading-snug break-words">
                Software builder, systems thinker, and founder documenting the journey from zero.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-sans-body">
                This site is my living digital archive and public headquarters. I formulate cross-border commerce protocols, build resilient software systems, and document real founder progress in public — without synthetic prestige or vanity metrics.
              </p>
            </div>

            {/* Exactly Two Primary Hero Actions (Hick's Law, Fitts's Law, Von Restorff Effect, Pareto 80/20) */}
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {/* Primary Action 1 (Von Restorff High Contrast, Fitts's Law 48px Target) */}
                <button
                  id="hero-action-explore-work"
                  onClick={() => onNavigate('builds')}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-[0.98] transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-neutral-400"
                >
                  <Layers className="w-4 h-4 text-neutral-300 dark:text-neutral-700" aria-hidden="true" />
                  <span>Explore the work</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>

                {/* Secondary Action 2 (Hick's Law Complementary Pair, Fitts's Law Target) */}
                <button
                  id="hero-action-read-journey"
                  onClick={() => onNavigate('journey')}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 font-medium text-sm flex items-center justify-center gap-2 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-neutral-400"
                >
                  <Compass className="w-4 h-4 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
                  <span>Read the journey</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Context & Operating Ethos (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Focus Dispatch Card */}
            <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/70 dark:bg-[#121418]/70 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-neutral-700 dark:text-neutral-300 uppercase tracking-wider font-semibold">
                    Live Focus Dispatch
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('now')}
                  className="min-h-[32px] px-2 py-0.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline flex items-center gap-1"
                >
                  <span>/now page</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
                    <span>01 / FLAGSHIP BUILD</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ACTIVE</span>
                  </div>
                  <button
                    onClick={() => onNavigate('builds', CURRENTLY.buildingProjectId)}
                    className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline text-left block"
                  >
                    {CURRENTLY.building}
                  </button>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {CURRENTLY.buildingDetail}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
                  <div className="text-[11px] font-mono-code text-neutral-400">
                    02 / COGNITIVE LEVERAGE
                  </div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {CURRENTLY.learning}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {CURRENTLY.learningDetail}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
                  <div className="text-[11px] font-mono-code text-neutral-400">
                    03 / EXPLORATION
                  </div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {CURRENTLY.exploring}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {CURRENTLY.exploringDetail}
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Ethos Card */}
            <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-[#121418]/40 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400">
                <span className="uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">Operating Ethos</span>
                <span>Zero-State Rule</span>
              </div>
              <p className="text-xs sm:text-sm italic font-serif-display text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{BELIEFS[1]?.principle || 'Intellectual honesty over synthetic prestige.'}"
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {BELIEFS[1]?.explanation || 'Embracing the zero state is the only way to build enduring competence.'}
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-mono-code text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 flex items-center gap-1 hover:underline underline-offset-4"
                >
                  <span>Read Foundations & Beliefs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          STAGE 2: CURRENT STATE
          Detailed live operational status across 4 foundational axes.
          Grounded in verifiable reality.
         ========================================================================= */}
      <section id="current-state" className="border-t border-neutral-200/80 dark:border-neutral-800/80 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              02 / Real-Time Pulse
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-50">
              Current State (/now)
            </h2>
          </div>
          <button
            onClick={() => onNavigate('now')}
            className="text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <span>View complete /now page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Inspired by Derek Sivers, this section tracks what actively occupies my attention and engineering bandwidth right now.
        </p>

        {/* 4 Core Axes of Current State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/90 bg-white/40 dark:bg-[#121418]/40 space-y-2">
            <span className="text-xs font-mono-code text-neutral-400">01. Building</span>
            <h3 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100">
              <button
                onClick={() => onNavigate('builds', CURRENTLY.buildingProjectId)}
                className="hover:underline text-left inline-flex min-h-[32px] items-center"
              >
                {CURRENTLY.building}
              </button>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {CURRENTLY.buildingDetail}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/90 bg-white/40 dark:bg-[#121418]/40 space-y-2">
            <span className="text-xs font-mono-code text-neutral-400">02. Learning</span>
            <h3 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100 min-h-[32px] flex items-center">
              {CURRENTLY.learning}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {CURRENTLY.learningDetail}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/90 bg-white/40 dark:bg-[#121418]/40 space-y-2">
            <span className="text-xs font-mono-code text-neutral-400">03. Exploring</span>
            <h3 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100 min-h-[32px] flex items-center">
              {CURRENTLY.exploring}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {CURRENTLY.exploringDetail}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/90 bg-white/40 dark:bg-[#121418]/40 space-y-2">
            <span className="text-xs font-mono-code text-neutral-400">04. Writing</span>
            <h3 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100">
              <button
                onClick={() => onNavigate('notes', 'the-zero-state')}
                className="hover:underline text-left inline-flex min-h-[32px] items-center"
              >
                {CURRENTLY.writingAbout}
              </button>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {CURRENTLY.writingAboutDetail}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STAGE 3: WORK
          Pareto Principle (80/20): Elevate the flagship architecture that carries
          80% of technical weight (Tatashi Market), followed by gateway to all builds.
         ========================================================================= */}
      <section id="work" className="border-t border-neutral-200/80 dark:border-neutral-800/80 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              03 / Flagship Systems
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-50">
              Selected Work
            </h2>
          </div>
          <button
            onClick={() => onNavigate('builds')}
            className="min-h-[40px] text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <span>All systems in Builds archive ({PROJECTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* The 80/20 Flagship Card: Tatashi Market */}
        {featuredProject && (
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#121418]/50 space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-code text-neutral-500">Flagship Build 01</span>
                  <EvidenceBadge level={featuredProject.evidenceLevel || 'HYPOTHESIS'} />
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-neutral-900 dark:text-neutral-50 break-words">
                  {featuredProject.title}
                </h3>
              </div>

              <span className="text-xs font-mono-code text-neutral-400">
                Initiated {featuredProject.dateStarted}
              </span>
            </div>

            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
              {featuredProject.tagline}
            </p>

            {/* Architectural Blueprint Preview */}
            <div className="rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs">
              <picture>
                <source srcSet="/og/og-project-tatashi-market.webp" type="image/webp" />
                <img
                  src="/og/og-project-tatashi-market.jpg"
                  alt="Tatashi Market cross-border verification architecture blueprint and lifecycle statechart"
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover aspect-[1200/630]"
                />
              </picture>
            </div>

            {/* Friction vs Architecture decomposition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6 pt-1 text-sm">
              <div className="space-y-1.5 p-3.5 sm:p-4 rounded-xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
                  The Real-World Friction
                </span>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm">
                  {featuredProject.problem}
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 sm:p-4 rounded-xl bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
                  Architectural Thesis & Vision
                </span>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm">
                  {featuredProject.vision}
                </p>
              </div>
            </div>

            {/* Tech Stack & Navigation (Fitts's Law generous CTA) */}
            <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {featuredProject.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] sm:text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onNavigate('builds', featuredProject.id)}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline underline-offset-4 py-1.5 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 sm:border-0 active:scale-[0.99] transition-all"
              >
                <span>Read complete architecture case study</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Secondary Builds (Compact preview of remaining systems) */}
        {secondaryProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
            {secondaryProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate('builds', p.id)}
                className="p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/30 dark:bg-[#121418]/30 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all cursor-pointer space-y-2 group active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code text-neutral-400 uppercase">
                    System Build
                  </span>
                  <EvidenceBadge level={p.evidenceLevel} />
                </div>
                <h4 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4">
                  {p.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {p.tagline}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          STAGE 4: WRITING
          Serial Position Effect (Primacy): Lead with the core manifesto ("The Zero State")
          and foundational models.
         ========================================================================= */}
      <section id="writing" className="border-t border-neutral-200/80 dark:border-neutral-800/80 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              04 / Field Notes & Theory
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-50">
              Selected Writing
            </h2>
          </div>
          <button
            onClick={() => onNavigate('notes')}
            className="text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <span>All field notes archive ({FIELD_NOTES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Essays deconstructing the realities of building from scratch, systems engineering, and mental models for long-horizon compounding.
        </p>

        {/* Selected Field Notes Grid */}
        <div className="divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
          {featuredNotes.map((note, index) => (
            <article
              key={note.id}
              onClick={() => onNavigate('notes', note.slug)}
              className="py-6 sm:py-7 group cursor-pointer space-y-2.5 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-neutral-400">
                <span className="text-neutral-900 dark:text-neutral-200 font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {note.publicationDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {note.readingTime}
                </span>
                <span>•</span>
                <span className="uppercase px-1.5 py-0.5 rounded text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {note.category}
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4">
                {note.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
                {note.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          STAGE 5: JOURNEY
          The verified empirical timeline documenting real learning from day zero.
          Displays honest evidence levels without synthetic claims.
         ========================================================================= */}
      <section id="journey" className="border-t border-neutral-200/80 dark:border-neutral-800/80 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              05 / Trajectory & Milestones
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-50">
              The Journey
            </h2>
          </div>
          <button
            onClick={() => onNavigate('journey')}
            className="text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Full chronological journey archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Chronological record of technical breakthroughs, architectural pivots, and honest empirical spikes from the zero state onward.
        </p>

        {/* Milestone Chronology Cards */}
        <div className="space-y-4">
          {recentMilestones.map((m) => (
            <div
              key={m.id}
              className="p-5 sm:p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 space-y-2.5 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-code text-neutral-400">{m.formattedMonth}</span>
                  <span className="text-neutral-300 dark:text-neutral-700">•</span>
                  <span className="text-xs font-mono-code text-neutral-500 uppercase tracking-wider text-[11px]">
                    {m.type.replace('_', ' ')}
                  </span>
                </div>
                <EvidenceBadge level={m.evidenceLevel} />
              </div>

              <h3 className="font-serif-display text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100">
                {m.title}
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
                {m.description}
              </p>

              {m.context && (
                <p className="text-xs font-mono-code text-neutral-500 dark:text-neutral-400 pt-1 border-t border-neutral-100 dark:border-neutral-800/60">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Context:</span> {m.context}
                </p>
              )}

              {m.relatedRoute && (
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate(m.relatedRoute!.page, m.relatedRoute!.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-200 hover:underline"
                  >
                    <span>{m.relatedRoute.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          STAGE 6: CONTINUATION
          Serial Position Effect (Recency): Keep the connection compounding.
          Newsletter dispatch, direct communication prompt, and fast archive directory.
         ========================================================================= */}
      <section id="continuation" className="border-t border-neutral-200/80 dark:border-neutral-800/80 pt-12 space-y-12">
        <div className="space-y-2">
          <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
            06 / Continuation & Contact
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-neutral-900 dark:text-neutral-50">
            Stay Connected
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Follow along as systems are designed, tested, and shipped. No vanity metrics or synthetic promotions.
          </p>
        </div>

        {/* Dispatch Newsletter Subscription Component */}
        <NewsletterSection />

        {/* Direct Communication Prompt */}
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#121418]/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Direct Feedback & Collaboration
            </span>
            <h3 className="font-serif-display text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100 break-words">
              Have thoughts on an architecture or want to talk systems?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I reply to every thoughtful inquiry regarding distributed systems, emerging market commerce, or building in public.
            </p>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono-code font-semibold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Direct Contact</span>
              </button>
            )}

            <a
              href="mailto:davidabbahinnocent@gmail.com"
              className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>davidabbahinnocent@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Fast Living Archive Directory Index */}
        <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
          <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
            Explore All Archive Departments
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 text-xs font-mono-code">
            <button
              onClick={() => onNavigate('builds')}
              className="p-3 min-h-[56px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 active:scale-[0.98] text-left transition-all flex flex-col justify-center"
            >
              <div className="text-neutral-900 dark:text-neutral-100 font-semibold">/builds</div>
              <div className="text-neutral-500 text-[11px] truncate">Software Systems</div>
            </button>

            <button
              onClick={() => onNavigate('notes')}
              className="p-3 min-h-[56px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 active:scale-[0.98] text-left transition-all flex flex-col justify-center"
            >
              <div className="text-neutral-900 dark:text-neutral-100 font-semibold">/notes</div>
              <div className="text-neutral-500 text-[11px] truncate">Field Notes</div>
            </button>

            <button
              onClick={() => onNavigate('lab')}
              className="p-3 min-h-[56px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 active:scale-[0.98] text-left transition-all flex flex-col justify-center"
            >
              <div className="text-neutral-900 dark:text-neutral-100 font-semibold">/lab</div>
              <div className="text-neutral-500 text-[11px] truncate">Empirical Spikes</div>
            </button>

            <button
              onClick={() => onNavigate('journey')}
              className="p-3 min-h-[56px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 active:scale-[0.98] text-left transition-all flex flex-col justify-center"
            >
              <div className="text-neutral-900 dark:text-neutral-100 font-semibold">/journey</div>
              <div className="text-neutral-500 text-[11px] truncate">Milestones</div>
            </button>

            <button
              onClick={() => onNavigate('now')}
              className="p-3 min-h-[56px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 active:scale-[0.98] text-left transition-all flex flex-col justify-center"
            >
              <div className="text-neutral-900 dark:text-neutral-100 font-semibold">/now</div>
              <div className="text-neutral-500 text-[11px] truncate">Current Focus</div>
            </button>

            <button
              onClick={() => onNavigate('resources')}
              className="p-3 min-h-[56px] rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 hover:border-neutral-400 dark:hover:border-neutral-600 active:scale-[0.98] text-left transition-all flex flex-col justify-center"
            >
              <div className="text-neutral-900 dark:text-neutral-100 font-semibold">/resources</div>
              <div className="text-neutral-500 text-[11px] truncate">Curated Library</div>
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};
