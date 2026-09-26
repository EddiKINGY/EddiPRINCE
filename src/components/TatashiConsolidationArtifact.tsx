import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { ConnectedArchiveSection } from './ConnectedArchiveSection';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Server,
  Database,
  Layers,
  ShieldCheck,
  Smartphone,
  AlertCircle,
  FileCode,
  GitCommit,
  Sparkles,
} from 'lucide-react';

interface TatashiConsolidationArtifactProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const TatashiConsolidationArtifact: React.FC<TatashiConsolidationArtifactProps> = ({
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}#notes/tatashi-market-backend-consolidation`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="max-w-3xl mx-auto space-y-12 py-6 sm:py-10">
      {/* 1. Breadcrumb & Top Bar */}
      <div className="flex items-center justify-between gap-3">
        <Breadcrumb
          items={[
            { label: 'Writing', page: 'notes' },
            { label: 'Tatashi Market: Consolidating the Backend', active: true },
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

      {/* 2. Article Header & Metadata */}
      <header className="space-y-5 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-neutral-400">
          <span className="uppercase text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            ENGINEERING MILESTONE
          </span>
          <span>•</span>
          <span>September 26, 2026</span>
          <span>•</span>
          <span>8 min read</span>
          <span>•</span>
          <span>By EddiPRINCE</span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 leading-[1.12] break-words">
          Tatashi Market: Consolidating the Backend
        </h1>

        <p className="text-base sm:text-xl font-serif-display italic text-neutral-600 dark:text-neutral-300 leading-relaxed">
          From competing backend implementations to one canonical request path.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-neutral-500 border-t border-neutral-100 dark:border-neutral-800/80">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Domain:</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              Cross-Border Commerce Infrastructure
            </span>
          </div>
          <button
            onClick={handleCopyLink}
            className="min-h-[40px] px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white active:scale-95 transition-all text-neutral-700 dark:text-neutral-300"
            aria-label="Copy note link"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? 'Link Copied' : 'Share Note'}</span>
          </button>
        </div>
      </header>

      {/* 3. ABOVE-THE-FOLD RESULT BANNER (Visual Twin-State Contrast) */}
      <section
        aria-label="Milestone Summary"
        className="rounded-2xl p-5 sm:p-7 border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Tatashi Market — Architectural Record
            </span>
          </div>
          <span className="text-xs font-mono-code text-neutral-500">
            Doc v1.0.0 • Approved & Implemented
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50">
            Backend Architecture Consolidated.
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Previously, Tatashi Market had both Express and FastAPI implementations competing for
            the same backend boundary. That architecture has now been consolidated around{' '}
            <strong className="text-neutral-950 dark:text-white font-semibold">
              Node.js + Express
            </strong>{' '}
            as the active backend. The result is one canonical API path, one authoritative data path,
            and clearly defined storage boundaries.
          </p>
        </div>

        {/* Dual Truth State Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl border border-emerald-300/80 dark:border-emerald-800/80 bg-white/80 dark:bg-[#121418] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[11px] font-mono-code uppercase text-neutral-500 dark:text-neutral-400">
                Architecture Milestone
              </div>
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>COMPLETED</span>
              </div>
            </div>
            <span className="text-[11px] font-mono-code text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
              September 2026
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-300/80 dark:border-amber-800/80 bg-white/80 dark:bg-[#121418] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[11px] font-mono-code uppercase text-neutral-500 dark:text-neutral-400">
                Tatashi Market Product
              </div>
              <div className="text-sm font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>IN PROGRESS (Early Development)</span>
              </div>
            </div>
            <span className="text-[11px] font-mono-code text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
              Active Build
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 italic">
          * Note for readers: The architectural milestone is complete; the overall Tatashi Market
          product remains actively in development. This is an engineering progress record, not a
          production launch.
        </p>
      </section>

      {/* 4. VISUAL ARCHITECTURE TRANSFORMATION (BEFORE vs AFTER) */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
            01. The Architectural Transformation
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            A visual comparison between the previous dual-backend divergence and the consolidated,
            canonical system topology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* BEFORE CARD */}
          <div className="p-5 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#101216] space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  BEFORE: Architectural Divergence
                </span>
                <span className="text-[11px] font-mono-code text-neutral-400">Split Paths</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Two competing backend runtimes and duplicated client paths created ambiguity over
                business logic authority and data boundaries.
              </p>
            </div>

            {/* Before Diagram */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#0B0C0E] border border-neutral-200 dark:border-neutral-800/80 font-mono-code text-[11px] text-neutral-700 dark:text-neutral-300 space-y-2.5">
              <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800/80 text-center font-semibold">
                React 19 Frontend
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="p-2 rounded border border-dashed border-rose-300 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-center text-rose-800 dark:text-rose-300 space-y-0.5">
                <div className="font-semibold text-[10px] uppercase">Duplicated API Clients</div>
                <div className="text-[10px]">src/services/apiClient.ts</div>
                <div className="text-[10px]">vs. src/utils/apiClient.ts</div>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/60 text-center text-[10px]">
                  <div className="font-semibold">Node.js / Express</div>
                  <div className="text-neutral-400 text-[9px]">(Active in dev loop)</div>
                </div>
                <div className="p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/60 text-center text-[10px]">
                  <div className="font-semibold">Python / FastAPI</div>
                  <div className="text-neutral-400 text-[9px]">(Competing spec)</div>
                </div>
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="p-2 rounded border border-dashed border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 text-center text-[10px] text-amber-800 dark:text-amber-300">
                Overlapping Schemas & LocalStorage Authority Drift
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 text-center text-[10px]">
                PostgreSQL / Fragmented State
              </div>
            </div>

            <div className="text-[11px] font-mono-code text-rose-700 dark:text-rose-400 pt-1">
              Friction: Dual maintenance overhead & schema divergence under mobile dev constraints.
            </div>
          </div>

          {/* AFTER CARD (Visually Dominant) */}
          <div className="p-5 rounded-2xl border-2 border-emerald-500/80 bg-white dark:bg-[#121418] shadow-md space-y-4 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  AFTER: Canonical Pipeline (Consolidated)
                </span>
                <span className="text-[11px] font-mono-code font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Active Reality
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                One canonical client, one Express application server gateway, verified middleware
                contracts, and authoritative PostgreSQL datastore.
              </p>
            </div>

            {/* After Diagram */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#0B0C0E] border border-emerald-500/30 font-mono-code text-[11px] text-neutral-800 dark:text-neutral-200 space-y-2">
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center font-semibold text-emerald-900 dark:text-emerald-200">
                React 19 Frontend
              </div>
              <div className="text-center text-emerald-600 dark:text-emerald-400 font-bold">↓</div>
              <div className="p-2 rounded bg-white dark:bg-[#15181E] border border-neutral-300 dark:border-neutral-700 text-center space-y-0.5">
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Canonical API Client
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                  src/services/apiClient.ts (utils re-exports as deprecated)
                </div>
              </div>
              <div className="text-center text-emerald-600 dark:text-emerald-400 font-bold">↓</div>
              <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-center space-y-1">
                <div className="font-bold text-emerald-900 dark:text-emerald-200">
                  Express Application Server
                </div>
                <div className="text-[10px] text-neutral-600 dark:text-neutral-400 space-y-0.5 pt-1 border-t border-emerald-500/20">
                  <div>• Auth & Session Verification</div>
                  <div>• Tenant & Branch Validation</div>
                  <div>• RBAC & Rate Limiting / Idempotency</div>
                  <div>• Zod Schema Validation</div>
                </div>
              </div>
              <div className="text-center text-emerald-600 dark:text-emerald-400 font-bold">↓</div>
              <div className="p-2 rounded bg-white dark:bg-[#15181E] border border-neutral-300 dark:border-neutral-700 text-center text-[10px] font-semibold">
                Domain Services (Verification, Inventory, Escrow)
              </div>
              <div className="text-center text-emerald-600 dark:text-emerald-400 font-bold">↓</div>
              <div className="p-2 rounded bg-emerald-600 text-white text-center font-bold text-[10px] shadow-xs">
                Authoritative PostgreSQL / Supabase
              </div>
            </div>

            <div className="text-[11px] font-mono-code text-emerald-700 dark:text-emerald-400 pt-1 font-medium">
              Result: Zero competing backend paths. Clear server authority. Mobile-viable workflow.
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPLAIN WHAT ACTUALLY CHANGED */}
      <section className="space-y-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
          02. Before & The Pragmatic Decision
        </h2>

        <div className="space-y-4 text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-serif-display text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100">
              The Reality of the Divergence
            </h3>
            <p>
              In early prototyping, Tatashi Market accumulated an architectural fork. On one side,
              an active Express/Node.js server was wired into the build and preview workflow. On the
              other, a separate Python/FastAPI specification was drafted to model domain entities.
            </p>
            <p>
              The problem was not merely having different languages. The problem was{' '}
              <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">
                architectural divergence
              </strong>
              : two distinct backend boundaries competing for the same business logic, duplicate API
              clients in <code className="text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">src/services</code> and{' '}
              <code className="text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">src/utils</code>, and client-side localStorage fallback
              behavior creeping into areas that strictly required authoritative server consensus.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-serif-display text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100">
              The Pragmatic Decision Under Constraints
            </h3>
            <p>
              I initially preferred Python/FastAPI for backend engineering and domain modeling.
              However, good engineering requires humility before real-world operational constraints.
              My reality is solo development, limited resources, and building and maintaining
              codebases primarily from a mobile setup and phone terminal.
            </p>
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-[#121418] font-serif-display italic text-lg text-neutral-800 dark:text-neutral-200">
              «One working, testable backend is infinitely more valuable to this project right now
              than two competing implementations.»
            </div>
            <p>
              This was not an assertion that Express is universally superior to FastAPI. It was a
              disciplined, resource-aware architectural consolidation: eliminate competing paths,
              park the Python implementation cleanly as future reference architecture, and focus
              every ounce of execution on building out the live Express + Supabase request path.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHAT WAS CONSOLIDATED: DETAILED BREAKDOWN */}
      <section className="space-y-5 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
          03. What Was Consolidated
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#121418]/60 space-y-2">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-semibold text-sm">
              <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Active Backend</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Express is now the sole active application server. FastAPI is no longer in the running
              path, eliminating competing runtime requirements.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#121418]/60 space-y-2">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-semibold text-sm">
              <FileCode className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Canonical API Client</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <code className="font-mono-code text-[10px]">src/services/apiClient.ts</code> is the
              single authoritative client. The legacy utils path is now a backwards-compatible
              deprecated re-export.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#121418]/60 space-y-2">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-semibold text-sm">
              <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Authoritative Datastore</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              PostgreSQL / Supabase serves as the single source of truth for all business-critical
              state, backed by schema migrations and RLS policies.
            </p>
          </div>
        </div>

        {/* Canonical Flow Stack */}
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#101216] space-y-3">
          <div className="text-xs font-mono-code uppercase font-semibold text-neutral-500">
            The Canonical Request Pipeline (Mobile-Readable Flow)
          </div>
          <div className="font-mono-code text-xs space-y-1.5 text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">1</span>
              <span>User Action in UI (e.g. Confirm Escrow Milestone)</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">2</span>
              <span>Canonical API Client (<code className="text-[10px]">src/services/apiClient.ts</code>)</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">3</span>
              <span>Express Gateway & Correlation ID Logging</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">4</span>
              <span>Authentication Token & Session Verification</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">5</span>
              <span>Tenant & Branch Boundary Validation + RBAC Check</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">6</span>
              <span>Rate Limiting & Idempotency Key De-duplication</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">7</span>
              <span>Zod Schema Validation & Payload Sanitization</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">8</span>
              <span>Domain Service Execution (Escrow, Ledger, Verification)</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">9</span>
              <span>Authoritative PostgreSQL / Supabase Mutation with RLS</span>
            </div>
            <div className="pl-2.5 text-neutral-400">↓</div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">10</span>
              <span>Sanitized JSON Response → React Query Invalidation (Fresh Server State)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STORAGE BOUNDARIES: THE BROWSER IS NOT THE AUTHORITY */}
      <section className="space-y-5 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="space-y-1">
          <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
            04. Controlled Storage Boundaries
          </h2>
          <p className="text-base font-serif-display italic text-neutral-800 dark:text-neutral-200">
            «The browser may remember things. It does not become the source of truth for business state.»
          </p>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          An essential outcome of the consolidation is the strict separation between what the browser
          can cache and what the server must authoritatively govern. LocalStorage fallback is strictly
          forbidden for business-critical entities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-3">
            <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Server-Authoritative Only</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Must originate from the database. Zero local client fallback.
            </p>
            <ul className="text-xs font-mono-code space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• Verified Merchant Identity</li>
              <li>• User Profiles & Tenant Membership</li>
              <li>• Live Inventory & Stock Tallies</li>
              <li>• Orders, Payments & Escrow State</li>
              <li>• Financial Ledger & Balances</li>
              <li>• Carrier Waybills & Dispute Records</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#121418]/60 space-y-3">
            <div className="text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-neutral-500" />
              <span>Client-Only Storage (Browser)</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Volatile browser persistence. Non-authoritative by design.
            </p>
            <ul className="text-xs font-mono-code space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• UI Preferences (theme, filter toggles)</li>
              <li>• Temporary form drafts before submission</li>
              <li>• Ephemeral search history</li>
              <li>• Explicit offline queues tagged <code className="text-[10px] text-amber-600">PENDING_SYNC</code></li>
              <li>• Short-lived read caches with TTL</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FINANCIAL STATE & MULTI-TENANCY */}
      <section className="space-y-5 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
          05. Financial State & Multi-Tenancy Controls
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#121418]/60 space-y-2">
            <h3 className="font-serif-display text-lg text-neutral-900 dark:text-neutral-100">
              Ledger-Derived Financials
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Balances are never stored as arbitrary mutable client fields. All commercial balances
              are derived strictly from an immutable transaction ledger. Calculations use integer
              minor units (e.g. kobo, cents) to prevent floating-point rounding errors, backed by
              asynchronous reconciliation and audit logging.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#121418]/60 space-y-2">
            <h3 className="font-serif-display text-lg text-neutral-900 dark:text-neutral-100">
              Tenant & Branch Isolation
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Consolidation ensures multi-tenant security runs through a single gatekeeper. Every
              incoming request is validated against the authenticated user's tenant ID and branch ID,
              enforced by server-side RBAC and Row-Level Security (RLS) in Supabase.
            </p>
          </div>
        </div>
      </section>

      {/* 9. WHY THIS MATTERS */}
      <section className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
          06. Why This Matters
        </h2>
        <div className="space-y-2 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Eliminating competing implementations yields immediate architectural clarity:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-mono-code">
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-[#15181E] border border-neutral-200 dark:border-neutral-800">
              ✓ <strong>One canonical client:</strong> Eliminates duplicate fetch implementations.
            </div>
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-[#15181E] border border-neutral-200 dark:border-neutral-800">
              ✓ <strong>One runtime to debug:</strong> Zero context-switching across virtualenvs.
            </div>
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-[#15181E] border border-neutral-200 dark:border-neutral-800">
              ✓ <strong>Strict data boundaries:</strong> No client tampering with inventory or escrow.
            </div>
            <div className="p-3 rounded-lg bg-neutral-100 dark:bg-[#15181E] border border-neutral-200 dark:border-neutral-800">
              ✓ <strong>Mobile-first viability:</strong> A clean development loop that runs anywhere.
            </div>
          </div>
        </div>
      </section>

      {/* 10. THE HUMAN & OPERATIONAL STORY */}
      <section className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
          07. The Human & Operational Story
        </h2>
        <div className="space-y-3 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif-display italic sm:text-lg">
          <p>
            «I started with a preference for Python/FastAPI, but the practical reality of building
            with limited resources forced me to confront an architectural problem: maintaining
            multiple backend implementations was creating unnecessary complexity.»
          </p>
          <p>
            «Instead of keeping both alive because they looked technically impressive, I consolidated
            the system around the backend that I could actually run, test, maintain, and continue
            building with. The goal was not to use the most impressive stack. The goal was to create
            one coherent system.»
          </p>
        </div>
      </section>

      {/* 11. COMPLETED EVIDENCE BLOCK */}
      <section className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
            08. Completed Evidence Block
          </h2>
          <span className="text-[11px] font-mono-code text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            Verified in Codebase
          </span>
        </div>

        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-[#121418]/60 space-y-2.5 text-xs font-mono-code text-neutral-800 dark:text-neutral-200">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Express established as the sole active backend runtime.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>FastAPI removed from the active runtime architecture (parked cleanly).</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Canonical API client established at <code className="text-neutral-900 dark:text-neutral-100 font-bold">src/services/apiClient.ts</code>.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Duplicate API-client path converted into a deprecated backwards-compatible re-export.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Tenant and branch validation enforced on server requests.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Authoritative database path preserved via PostgreSQL / Supabase with RLS.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>LocalStorage authority boundaries strictly demarcated (zero client financial authority).</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>No competing Python runtime required for active application execution.</span>
          </div>
        </div>
      </section>

      {/* 12. WHAT REMAINS (GROUNDED ROADMAP) */}
      <section className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
            09. What Remains (Active Build Roadmap)
          </h2>
          <span className="text-[11px] font-mono-code text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
            Product In Progress
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          The backend architecture consolidation is a milestone of simplification, not the finish
          line. Tatashi Market itself remains an early-stage build. The active roadmap focuses on
          grounded domain mechanics:
        </p>

        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-[#121418]/50 space-y-2 text-xs font-mono-code text-neutral-700 dark:text-neutral-300">
          <div>• <strong>Verification Statechart:</strong> Implementing supplier tiered identity state machine (Unverified → Submitted → Attested → Active).</div>
          <div>• <strong>Escrow Release Coordinator:</strong> Multi-signature webhook pipeline for cargo milestone approvals.</div>
          <div>• <strong>Mobile Onboarding Prototype:</strong> Scoping lightweight mobile-first discovery wireframe for non-technical merchants.</div>
          <div>• <strong>Qualitative Trade Discovery:</strong> Primary corridor interviews with informal exporters in West and East Africa.</div>
        </div>
      </section>

      {/* 13. FOUNDER / ARCHITECTURAL LESSON */}
      <section className="space-y-4 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
          10. Architectural Reflection
        </h2>

        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-100/80 dark:bg-[#14161C] border border-neutral-200 dark:border-neutral-800 space-y-3">
          <p className="font-serif-display text-xl sm:text-2xl text-neutral-900 dark:text-neutral-100">
            «Architecture is not only about choosing powerful technologies. It is also about removing
            ambiguity.»
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A simpler architecture that I can actually run, test, understand, and maintain is more
            useful to Tatashi Market right now than a theoretically broader architecture that I
            cannot operate consistently.
          </p>
        </div>
      </section>

      {/* 14. CROSS-NAVIGATION ACTIONS */}
      <footer className="pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onNavigate('builds', 'tatashi-market')}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-mono-code text-xs font-semibold inline-flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            <span>View Tatashi Market Project Spec</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('journey')}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 font-mono-code text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              The Journey Timeline
            </button>
            <button
              onClick={() => onNavigate('now')}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 font-mono-code text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              What I'm Doing Now
            </button>
          </div>
        </div>

        {/* Connected Archive Relationships */}
        <ConnectedArchiveSection
          entityType="ARTICLE"
          entityId="tatashi-market-backend-consolidation"
          onNavigate={onNavigate}
          title="Connected in the Archive"
          subtitle="Builds, empirical experiments, milestones, and foundational principles cross-referenced with this note."
        />
      </footer>
    </article>
  );
};
