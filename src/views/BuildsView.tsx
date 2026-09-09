import React from 'react';
import { PageRoute } from '../types';
import { PROJECTS } from '../data/content';
import { ArrowRight, ArrowLeft, Terminal, AlertCircle, Share2 } from 'lucide-react';
import { ConnectedArchiveSection } from '../components/ConnectedArchiveSection';
import { getConnectedArchiveContext } from '../data/archiveGraph';
import { Breadcrumb } from '../components/Breadcrumb';
import { EvidenceBadge } from '../components/EvidenceBadge';

interface BuildsViewProps {
  selectedProjectId?: string;
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const BuildsView: React.FC<BuildsViewProps> = ({ selectedProjectId, onNavigate }) => {
  const selectedProject = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId || p.slug === selectedProjectId)
    : null;

  // Detail View: Comprehensive Technical Architecture Case Study
  if (selectedProject) {
    return (
      <div className="max-w-3xl mx-auto space-y-12 py-8">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between gap-3">
          <Breadcrumb
            items={[
              { label: 'Builds', page: 'builds' },
              { label: selectedProject.title, active: true },
            ]}
            onNavigate={onNavigate}
          />
          <button
            onClick={() => onNavigate('builds')}
            className="min-h-[44px] px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-white active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Builds</span>
          </button>
        </div>

        {/* Project Header */}
        <header className="space-y-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono-code text-neutral-500">
            <span className="px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
              {selectedProject.status}
            </span>
            <EvidenceBadge level={selectedProject.evidenceLevel} />
            <span>{selectedProject.category}</span>
            <span>•</span>
            <span>Initiated {selectedProject.dateStarted}</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 break-words">
            {selectedProject.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            {selectedProject.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {selectedProject.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Epistemic Truth Disclosure */}
          <div className="p-4 mt-4 rounded-xl bg-neutral-100/70 dark:bg-[#15181E] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
            <div className="font-mono-code uppercase font-semibold text-neutral-500 dark:text-neutral-400">
              Epistemic Status: Pre-Code Domain Specification
            </div>
            <p className="leading-relaxed">
              This build is currently in the conceptual domain-modeling and state-machine design phase. All architectures and diagrams documented below represent structural hypotheses formulated to guide future pilot implementations, not a live production deployment.
            </p>
          </div>
        </header>

        {/* Architectural Specification Body */}
        <div className="space-y-12 text-neutral-800 dark:text-neutral-200">
          
          {/* Section 1: Problem & Real-world Friction */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              01. The Problem & Market Fracture
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {selectedProject.problem}
            </p>
          </section>

          {/* Section 2: Core Motivation & Hypothesis */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              02. Why Build This: The Systems Hypothesis
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {selectedProject.motivation}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 pt-2">
              {selectedProject.vision}
            </p>
          </section>

          {/* Section 3: Technical Blueprint & State Machine */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              03. Architecture & Escrow Statechart
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {selectedProject.architectureNotes}
            </p>

            <div className="p-4 sm:p-5 rounded-xl bg-neutral-100/80 dark:bg-[#121418] border border-neutral-200 dark:border-neutral-800 font-mono-code text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
              <div className="text-neutral-400 dark:text-neutral-500 text-[11px] sm:text-xs">// Transaction Lifecycle Statechart (scroll to inspect)</div>
              <div className="overflow-x-auto no-scrollbar py-2 text-xs whitespace-nowrap">
                <div>[1. Supplier Profile]  ──(Micro-Proof Identity)──&gt; [2. Verified Status]</div>
                <div>[3. Buyer Quote]      ──(Escrow Deposit)       ──&gt; [4. Vault Locked (Local Fiat)]</div>
                <div>[5. Freight Intake]    ──(Waybill Barcode)      ──&gt; [6. Transit Milestone Validated]</div>
                <div>[7. Cargo Delivery]    ──(Physical Handoff OTP) ──&gt; [8. Automated Vault Settlement]</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <strong>Core Physical Constraint:</strong> Software alone cannot inspect cargo crates in a customs depot. System integrity requires coupling asynchronous digital escrow with verified physical carrier weigh-ins.
              </div>
            </div>
          </section>

          {/* Section 4: Hard Lessons Learned */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              04. Lessons & Empirical Discoveries
            </h2>
            <div className="space-y-3">
              {selectedProject.lessonsLearned.map((lesson, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 space-y-1"
                >
                  <span className="text-xs font-mono-code text-neutral-400 font-semibold">
                    Lesson 0{idx + 1}
                  </span>
                  <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {lesson}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Phased Milestones */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono-code uppercase tracking-wider text-neutral-500 font-semibold">
              05. Chronological Roadmap & Changelog
            </h2>
            <div className="relative pl-5 sm:pl-6 border-l border-neutral-200 dark:border-neutral-800 space-y-6 ml-3 sm:ml-1">
              {selectedProject.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[25px] sm:-left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  <div className="space-y-1">
                    <span className="text-xs font-mono-code text-neutral-400">
                      {item.date}
                    </span>
                    <h3 className="font-serif-display text-lg text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Connected Archive Relationships */}
          <ConnectedArchiveSection
            entityType="PROJECT"
            entityId={selectedProject.id}
            onNavigate={onNavigate}
            title="Connected in the Archive"
            subtitle="Field notes, empirical experiments, milestones, and foundational ideas cross-referenced with Tatashi Market."
          />

        </div>
      </div>
    );
  }

  // Directory View (All Builds)
  return (
    <div className="space-y-12 py-8 max-w-4xl mx-auto">
      {/* Directory Header */}
      <div className="space-y-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-8">
        <Breadcrumb items={[{ label: 'Builds', active: true }]} onNavigate={onNavigate} />
        <h1 className="font-serif-display text-4xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight">
          Builds
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed font-normal">
          The public directory of software systems and infrastructure I am actively designing. Rather than scattering attention across ten disposable prototypes, I focus deeply on durable architectures and document every failure mode openly.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {PROJECTS.map((project) => {
          const archiveContext = getConnectedArchiveContext('PROJECT', project.id);
          return (
            <article
              key={project.id}
              onClick={() => onNavigate('builds', project.id)}
              className="p-4 sm:p-6 md:p-8 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 hover:border-neutral-300 dark:hover:border-neutral-700 active:scale-[0.99] transition-all cursor-pointer space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
                    {project.status}
                  </span>
                  <EvidenceBadge level={project.evidenceLevel} />
                  {archiveContext.totalCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-neutral-500 text-[11px]">
                      <Share2 className="w-3 h-3 text-neutral-400" />
                      <span>{archiveContext.totalCount} Archive links</span>
                    </span>
                  )}
                </div>
                <span className="text-neutral-400">
                  Initiated {project.dateStarted}
                </span>
              </div>

              <div className="space-y-1.5">
                <h2 className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 hover:underline break-words">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 space-y-1 pt-1">
                <div>
                  <strong className="text-neutral-800 dark:text-neutral-200">Current Phase:</strong>{' '}
                  {project.currentStage}
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="min-h-[44px] flex items-center justify-between sm:justify-start text-xs font-medium text-neutral-900 dark:text-neutral-100 gap-1 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  <span>Read Specification Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

