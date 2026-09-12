import React from 'react';
import { PageRoute } from '../types';
import { BELIEFS } from '../data/content';
import { ArrowRight, Compass, Cpu, Target, HeartHandshake, Sparkles, BookOpen, Share2, Layers, FlaskConical, Lightbulb } from 'lucide-react';
import { getConnectedArchiveContext } from '../data/archiveGraph';
import { Breadcrumb } from '../components/Breadcrumb';

interface AboutViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
  onOpenContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-16 py-8">
      
      {/* Intro Header */}
      <div className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <Breadcrumb items={[{ label: 'About', active: true }]} onNavigate={onNavigate} />
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
          <span>Identity & Foundations</span>
        </div>

        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
          About EddiPRINCE
        </h1>

        <div className="text-xl sm:text-2xl font-serif-display italic text-neutral-700 dark:text-neutral-300">
          "I’m building my future from scratch."
        </div>

        <p className="text-sm font-mono-code text-neutral-500">
          Creator • Builder • Learner • Founder-in-progress
        </p>
      </div>

      {/* WHO I AM */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          01 / Who I Am
        </h2>
        <div className="space-y-4 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            I am a builder, technologist, and learner at the very beginning of a long journey. I do not come to this page with a roster of exited venture companies, viral metrics, or manufactured credentials. I am someone who loves figuring out how complex things actually work—whether that is a distributed database, a cross-border trade route, or a sustainable business model.
          </p>
          <p>
            I believe that in an internet saturated with performative certainty, the most valuable position is genuine intellectual curiosity. This website is my commitment to compound knowledge openly: designing software, testing business theses, and recording each step with uncompromised honesty.
          </p>
        </div>
      </section>

      {/* WHAT I'M INTERESTED IN */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          02 / What I'm Interested In
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
            <h3 className="font-serif-display text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Cross-Border Commerce & Rails
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              How goods, verified identities, and payments move across emerging markets like West and East Africa without relying on broken legacy intermediaries.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
            <h3 className="font-serif-display text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Cognitive Leverage & AI
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Using modern language models as Socratic sparring partners to compress the feedback loop between conceptual model design and practical implementation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
            <h3 className="font-serif-display text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Software Systems Architecture
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Distributed storage, deterministic event queues, statecharts, and local-first data resilience under flaky network environments.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
            <h3 className="font-serif-display text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Product Design & Human Agency
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Designing uncluttered, quiet interfaces that respect user attention and treat cognitive clarity as the ultimate luxury.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT I'M LEARNING */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          03 / What I'm Learning
        </h2>
        <div className="space-y-3 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Right now, my active study revolves around two complementary axes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600 dark:text-neutral-400 pl-2">
            <li>
              <strong className="text-neutral-900 dark:text-neutral-200">System Dynamics:</strong> Transaction isolation levels, asynchronous reconciliations, and statechart modeling for multi-party escrow workflows.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-neutral-200">Economic Mechanism Design:</strong> Understanding counterparty risk in informal merchant corridors and how verification tiers can bootstrap liquidity safely.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-neutral-200">Editorial Rigor:</strong> Developing concise, lucid technical writing that deconstructs complex trade-offs without buzzwords.
            </li>
          </ul>
        </div>
      </section>

      {/* WHAT I'M BUILDING */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          04 / What I'm Building
        </h2>
        <div className="p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-serif-display text-2xl text-neutral-900 dark:text-neutral-100">
              Tatashi Market
            </span>
            <span className="text-xs font-mono-code px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-medium">
              Architecture & System Blueprint
            </span>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            My primary technical initiative. An infrastructure project exploring how independent cross-border merchants can transact with cryptographic and physical verification checkpoints, escrow protection, and localized payment rails.
          </p>
          <button
            onClick={() => onNavigate('builds', 'tatashi-market')}
            className="text-xs font-medium text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1 pt-1"
          >
            <span>Inspect Tatashi Market Architecture Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* WHAT I BELIEVE */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          05 / What I Believe
        </h2>
        <div className="space-y-4 divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
          {BELIEFS.map((b) => {
            const archiveContext = getConnectedArchiveContext('IDEA', b.id);

            return (
              <div key={b.id} id={b.id} className="pt-4 first:pt-0 space-y-2">
                <h3 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100">
                  {b.principle}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {b.explanation}
                </p>

                {archiveContext.totalCount > 0 && (
                  <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[11px] font-mono-code text-neutral-400 flex items-center gap-1">
                      <Share2 className="w-3 h-3 text-neutral-400" />
                      <span>Expressed in:</span>
                    </span>
                    {archiveContext.projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onNavigate('builds', p.id)}
                        className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 hover:border-amber-400 flex items-center gap-1 transition-colors"
                      >
                        <Layers className="w-2.5 h-2.5 text-amber-600" />
                        <span>{p.title}</span>
                      </button>
                    ))}
                    {archiveContext.notes.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => onNavigate('notes', n.slug)}
                        className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 text-blue-900 dark:text-blue-200 hover:border-blue-400 flex items-center gap-1 transition-colors"
                      >
                        <BookOpen className="w-2.5 h-2.5 text-blue-600" />
                        <span>{n.title}</span>
                      </button>
                    ))}
                    {archiveContext.experiments.map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => onNavigate('lab', exp.id)}
                        className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200 hover:border-emerald-400 flex items-center gap-1 transition-colors"
                      >
                        <FlaskConical className="w-2.5 h-2.5 text-emerald-600" />
                        <span>Exp #{exp.id.replace('exp-', '')}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* LONG-TERM DIRECTION */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          06 / Long-term Direction
        </h2>
        <div className="space-y-4 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            My long-term ambition is to build enduring technological and economic infrastructure. I want to launch companies that solve fundamental, non-trivial friction in how people collaborate, trade, and create value across borders.
          </p>
          <p>
            I recognize that this requires years of disciplined compounding: mastering systems engineering, building operational intuition, understanding capital allocation, and demonstrating relentless reliability. I am in no hurry to pretend I have arrived. I am focused entirely on doing the work.
          </p>
        </div>

        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('journey')}
            className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-lg text-xs font-mono-code font-semibold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-xs"
          >
            <span>View Timeline from Zero</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-xs font-mono-code font-semibold uppercase tracking-wider flex items-center justify-center active:scale-[0.99] transition-all"
          >
            Start a Conversation
          </button>
        </div>
      </section>

    </div>
  );
};
