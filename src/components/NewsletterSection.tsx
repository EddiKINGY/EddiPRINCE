import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      const subs = JSON.parse(localStorage.getItem('eddiprince_subscribers') || '[]');
      if (!subs.includes(email)) {
        subs.push(email);
        localStorage.setItem('eddiprince_subscribers', JSON.stringify(subs));
      }
    } catch {
      // Graceful fallback
    }
    setStatus('success');
  };

  return (
    <section className="my-12 sm:my-16 p-5 sm:p-8 md:p-10 rounded-2xl bg-neutral-100/70 dark:bg-[#121418] border border-neutral-200/90 dark:border-neutral-800 transition-colors">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-medium bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
          <Mail className="w-3.5 h-3.5 text-neutral-500" />
          Field Notes & Build Log
        </span>

        <h2 className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-snug break-words">
          Follow the journey from zero.
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
          No growth hacks, no affiliate marketing, and no spam. Just honest, periodic dispatches on system architecture, building Tatashi Market, and lessons learned along the way.
        </p>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="pt-4 flex items-center justify-center gap-2 text-sm font-mono-code text-emerald-600 dark:text-emerald-400"
          >
            <Check className="w-4 h-4" />
            <span>You're subscribed. Welcome to the build log.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 max-w-md mx-auto w-full">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address for periodic build log dispatches
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="w-full sm:flex-1 px-4 py-3 min-h-[48px] text-base sm:text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-neutral-600 dark:focus:border-neutral-400 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 min-h-[48px] text-xs font-mono-code font-semibold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shrink-0 active:scale-[0.99]"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] font-mono-code text-neutral-500 pt-1 leading-normal break-words">
          Delivered directly from davidabbahinnocent@gmail.com • Unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
};
