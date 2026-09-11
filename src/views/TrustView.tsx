import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, Lock, Cpu, BookOpen, CheckCircle, Scale, Eye, FileText, ArrowRight } from 'lucide-react';

interface TrustViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
  onOpenContact?: () => void;
}

export const TrustView: React.FC<TrustViewProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-10 animate-in fade-in duration-200">
      <Breadcrumb
        items={[
          { label: 'Archive', page: 'home' },
          { label: 'Trust, Ethics & Colophon' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-medium bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Operating Standards & Protocol
        </span>

        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
          Trust, Transparency & Colophon
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans-body">
          EddiPRINCE.com is a personal digital headquarters founded on radical intellectual honesty. This document outlines our epistemic standards, privacy guarantees, and technical colophon.
        </p>
      </div>

      {/* 1. Radical Transparency & Zero Synthetic Prestige */}
      <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Protocol 01
            </span>
            <h2 className="font-serif-display text-2xl text-neutral-900 dark:text-neutral-100">
              Zero Synthetic Prestige Policy
            </h2>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-3xl text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-4 font-sans-body">
          <p>
            Modern technology portfolios frequently suffer from "synthetic prestige"—inflated user counts, cherry-picked revenue figures, fabricated enterprise logos, and unverified testimonials.
          </p>
          <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-2 font-mono-code text-xs">
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              The Invariant Rules:
            </div>
            <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Prototypes are clearly marked as prototypes; production systems are marked as production.</li>
              <li>Completion percentages represent honest engineering milestones, never inflated vanity claims.</li>
              <li>Hypotheses that fail in the Lab are retained with post-mortems rather than swept away.</li>
              <li>Milestones reflect ground-truth dates from day zero (September 2026 onward).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Epistemic Evidence Framework */}
      <section className="space-y-6 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Protocol 02
            </span>
            <h2 className="font-serif-display text-2xl text-neutral-900 dark:text-neutral-100">
              Epistemic Evidence Framework
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Every project, lab experiment, and field note in this archive carries an explicit epistemic classification to prevent ambiguity between ambition and verified fact:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 space-y-1.5">
            <span className="text-[11px] font-mono-code font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              IDEA
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
              Conceptual model or philosophical premise awaiting structural decomposition.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 space-y-1.5">
            <span className="text-[11px] font-mono-code font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
              HYPOTHESIS
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
              Falsifiable proposition structured with clear testing criteria.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 space-y-1.5">
            <span className="text-[11px] font-mono-code font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              PROTOTYPE
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
              Exploratory code spike built to stress-test an isolated architectural question.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 space-y-1.5">
            <span className="text-[11px] font-mono-code font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              VALIDATED
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
              Empirically tested with reproducible outcomes and observable evidence.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Privacy & Data Ownership Stance */}
      <section className="space-y-6 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Protocol 03
            </span>
            <h2 className="font-serif-display text-2xl text-neutral-900 dark:text-neutral-100">
              Privacy, Cookies & Data Stance
            </h2>
          </div>
        </div>

        <div className="max-w-3xl space-y-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans-body">
          <p>
            Your attention is treated with complete respect. EddiPRINCE.com enforces an uncompromising, privacy-first posture:
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-600 dark:text-neutral-400 font-sans-body">
            <li>
              <strong>Zero Tracking Cookies:</strong> We do not set marketing, profiling, or cross-site tracking cookies.
            </li>
            <li>
              <strong>No Third-Party Analytics Scripts:</strong> No Google Analytics, no Meta Pixel, no Hotjar, and no surveillance beacons are loaded.
            </li>
            <li>
              <strong>Local-First Storage:</strong> Your visual theme preference (light or dark mode) is saved exclusively in your browser's local storage (`theme-mode`) and never transmitted.
            </li>
            <li>
              <strong>Direct Correspondence:</strong> When you send a dispatch via the Contact modal, it goes directly to <code className="text-xs font-mono-code">davidabbahinnocent@gmail.com</code>. We never sell, rent, or trade your contact details.
            </li>
            <li>
              <strong>Physical Address Policy:</strong> Under our strict zero-fabrication commitment, no physical or corporate mailing address is published because none has been established. Direct communication is conducted strictly through verified email and public social profiles.
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Colophon: Typography, Tech Stack & Infrastructure */}
      <section className="space-y-6 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Colophon
            </span>
            <h2 className="font-serif-display text-2xl text-neutral-900 dark:text-neutral-100">
              Typography, Architecture & Tooling
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 space-y-2">
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Typography
            </span>
            <div className="space-y-2 pt-1 text-sm">
              <div>
                <span className="font-serif-display text-lg block text-neutral-900 dark:text-neutral-100">
                  Instrument Serif
                </span>
                <span className="text-xs text-neutral-500 font-mono-code">
                  Editorial headings & essay titles
                </span>
              </div>
              <div>
                <span className="font-sans-body font-medium block text-neutral-900 dark:text-neutral-100">
                  Plus Jakarta Sans
                </span>
                <span className="text-xs text-neutral-500 font-mono-code">
                  User interface, controls & body text
                </span>
              </div>
              <div>
                <span className="font-mono-code text-xs block text-neutral-900 dark:text-neutral-100">
                  JetBrains Mono
                </span>
                <span className="text-xs text-neutral-500 font-mono-code">
                  Timestamps, metadata, tags & code
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 space-y-2">
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Frontend Stack
            </span>
            <ul className="space-y-1.5 pt-1 text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
              <li>• React 19 (TypeScript)</li>
              <li>• Vite 6 Build Engine</li>
              <li>• Tailwind CSS v4</li>
              <li>• Lucide React Icons</li>
              <li>• Custom Hash Router SPA</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 space-y-2">
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Host & Invariants
            </span>
            <ul className="space-y-1.5 pt-1 text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
              <li>• Google Cloud Run Container</li>
              <li>• Nginx Reverse Proxy (Port 3000)</li>
              <li>• Sub-second zero-latency graph</li>
              <li>• WCAG AA Contrast Compliance</li>
              <li>• Zero runtime tracking payload</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Contact & Questions */}
      <section className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100">
            Questions regarding our standards?
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            I welcome critical inquiries, corrections on technical notes, and dialogue.
          </p>
        </div>

        {onOpenContact && (
          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono-code font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shrink-0 active:scale-95"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </section>
    </div>
  );
};
