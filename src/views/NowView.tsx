import React from 'react';
import { PageRoute } from '../types';
import { NOW_DATA } from '../data/content';
import { Clock, Hammer, BookOpen, Compass, Brain, CheckSquare, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

interface NowViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const NowView: React.FC<NowViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 sm:space-y-12 py-4 sm:py-8">
      
      {/* Header */}
      <div className="space-y-4 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-6 sm:pb-8">
        <Breadcrumb items={[{ label: 'Now', active: true }]} onNavigate={onNavigate} />
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-neutral-500">
          <span>Now — Active Priorities</span>
          <span className="flex items-center gap-1 text-neutral-400">
            <Clock className="w-3 h-3" />
            Updated {NOW_DATA.lastUpdated}
          </span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight break-words">
          What I'm Doing Now
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
          Inspired by Derek Sivers' /now convention. A public log of current focus, active building commitments, intellectual diet, and proximate milestones.
        </p>
      </div>

      {/* BUILDING */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          01 / Building
        </h2>

        <div className="space-y-3">
          {NOW_DATA.building.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif-display text-lg sm:text-xl text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h3>
                {item.linkRoute && (
                  <button
                    onClick={() => onNavigate(item.linkRoute!, item.linkId)}
                    className="min-h-[44px] px-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1 shrink-0"
                  >
                    <span>View Spec</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNING */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          02 / Learning
        </h2>

        <div className="space-y-3">
          {NOW_DATA.learning.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 space-y-1"
            >
              <h3 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORING */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          03 / Exploring
        </h2>

        <div className="space-y-3">
          {NOW_DATA.exploring.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 space-y-1"
            >
              <h3 className="font-serif-display text-xl text-neutral-900 dark:text-neutral-100">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* READING */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          04 / Reading
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NOW_DATA.reading.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500">
                <span>{item.author}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {item.status}
                </span>
              </div>
              <h3 className="font-serif-display text-lg text-neutral-900 dark:text-neutral-100">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THINKING ABOUT */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          05 / Thinking About
        </h2>

        <div className="space-y-2">
          {NOW_DATA.thinkingAbout.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-neutral-200/60 dark:border-neutral-800/80 bg-neutral-100/60 dark:bg-[#15181E] text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-baseline gap-2.5"
            >
              <span className="text-neutral-400 font-mono-code">»</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* NEXT */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono-code uppercase tracking-widest text-neutral-400 font-semibold">
          06 / Up Next
        </h2>

        <div className="space-y-2">
          {NOW_DATA.next.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/50 dark:bg-[#121418]/50 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-baseline gap-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0 mt-2" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
