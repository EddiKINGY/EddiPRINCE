import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, Lock, Database, Mail, ArrowRight, CheckCircle, Cookie, ExternalLink, HelpCircle } from 'lucide-react';
import { AUTHORITATIVE_CONTACT } from '../config/contact';

interface PrivacyViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
  onOpenContact?: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-10 animate-in fade-in duration-200">
      <Breadcrumb
        items={[
          { label: 'Archive', page: 'home' },
          { label: 'Privacy Policy' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-medium bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Data Ethics & Policy
        </span>

        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
          Privacy Policy & Data Practices
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans-body">
          Transparent data practices for EddiPRINCE.com — professional showcase and build announcement hub.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-code text-neutral-500">
          <span>Effective: September 2026</span>
          <span>•</span>
          <span>Status: Zero-Tracking Baseline</span>
          <span>•</span>
          <span>Owner Contact: {AUTHORITATIVE_CONTACT.email}</span>
        </div>
      </header>

      {/* 1. Purpose & Operator Identity */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Lock className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            1. Purpose & Operator Identity
          </h2>
        </div>

        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans-body">
          <p>
            EddiPRINCE.com is the professional website, engineering portfolio, and announcement platform operated by <strong>Eddi Prince</strong> (
            <code className="text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
              [OPERATOR_LEGAL_NAME: Eddi Prince / Individual Creator]
            </code>
            , operating in{' '}
            <code className="text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
              [JURISDICTION_OR_COUNTRY: Individual jurisdiction to be confirmed]
            </code>
            , direct electronic contact:{' '}
            <a
              href={`mailto:${AUTHORITATIVE_CONTACT.email}`}
              className="text-neutral-900 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              {AUTHORITATIVE_CONTACT.email}
            </a>
            ).
          </p>
          <p>
            The site exists to present my professional capabilities, publish architectural research, and share updates on upcoming software builds, including Tatashi Market. We do not monetize, harvest, or broker personal data.
          </p>
        </div>
      </section>

      {/* 2. Information We Collect & Why */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Database className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            2. Information We Collect & Why
          </h2>
        </div>

        <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans-body">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Direct Inquiries & Professional Contact
            </h3>
            <p>
              When you reach out via our contact form or modal, you provide your name, email address, topic context, and message body. This information is processed solely to evaluate, triage, and respond to your professional inquiry, collaboration proposal, or technical question. Dispatches are transmitted directly to{' '}
              <span className="font-mono-code text-xs text-neutral-900 dark:text-neutral-100">{AUTHORITATIVE_CONTACT.email}</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Build Log & Dispatch Updates
            </h3>
            <p>
              When you submit your email address for build log dispatches, it is used strictly to send you periodic engineering updates, announcements regarding upcoming product launches, and field notes. You can unsubscribe at any time with one click or by replying directly to any transmission.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Server & Infrastructure Logs
            </h3>
            <p>
              Standard network request headers (such as incoming IP address, browser user-agent, and requested file path) may be temporarily processed by cloud hosting and reverse-proxy infrastructure strictly for routing, platform stability, and denial-of-service prevention. We do not correlate server logs with individual identities or assemble advertising profiles.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Cookies, Analytics & Advertising Policy */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Cookie className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            3. Cookies, Analytics & Advertising Policy
          </h2>
        </div>

        <div className="space-y-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans-body">
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <strong className="font-semibold font-mono-code block">Current Zero-Tracking State (No Cookie Banner Required)</strong>
              <p>
                EddiPRINCE.com currently sets <strong>zero advertising cookies</strong>, <strong>zero cross-site tracking pixels</strong>, and <strong>zero third-party behavioral analytics</strong>. Under ePrivacy and GDPR standards, strictly functional preferences do not require a consent wall. We refuse to impose deceptive or obstructive cookie popups when no tracking exists.
              </p>
            </div>
          </div>

          <p>
            The site utilizes standard client-side browser storage exclusively for necessary user preferences:
          </p>

          <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <table className="w-full text-left text-xs font-mono-code divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                <tr>
                  <th className="p-3">Storage Key</th>
                  <th className="p-3">Mechanism</th>
                  <th className="p-3">Strict Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900/40">
                <tr>
                  <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">theme-mode</td>
                  <td className="p-3 text-neutral-500">localStorage</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Persisting your chosen light or dark visual theme.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">eddiprince_dispatches</td>
                  <td className="p-3 text-neutral-500">localStorage</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Storing a reference copy of inquiries you sent from this device.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">eddiprince_subscribers</td>
                  <td className="p-3 text-neutral-500">localStorage</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Recording your build log subscription status locally.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">cta_dismissed_*</td>
                  <td className="p-3 text-neutral-500">sessionStorage</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Remembering if you closed an active floating prompt during this browser tab session.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
            <h4 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Future Advertising & Analytics Commitment
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              If marketing pixels, analytics, or audience measurement tools are integrated in the future to promote upcoming software builds, an explicit, accessible consent banner will be provided before any non-essential tracking cookies are deployed. Rejection will be as easy as acceptance, with zero dark patterns.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Data Retention & Your Rights */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            4. Data Retention & Your Rights
          </h2>
        </div>

        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans-body">
          <p>
            We never sell, rent, or trade your contact information. Correspondence is retained only as long as necessary to conduct ongoing professional communication.
          </p>
          <p>
            If you wish to inspect, update, or permanently delete any messages or email subscriptions you have submitted to EddiPRINCE.com, simply email{' '}
            <a
              href={`mailto:${AUTHORITATIVE_CONTACT.email}`}
              className="text-neutral-900 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              {AUTHORITATIVE_CONTACT.email}
            </a>
            . We will honor your deletion request promptly.
          </p>
        </div>
      </section>

      {/* 5. External Platforms & Links */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <ExternalLink className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            5. External Platforms & Third-Party Links
          </h2>
        </div>

        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans-body">
          <p>
            This site links to external platforms including GitHub (
            <a href={AUTHORITATIVE_CONTACT.github.url} target="_blank" rel="noreferrer" className="underline hover:text-neutral-900 dark:hover:text-white">
              @eddiprince
            </a>
            ), X / Twitter (
            <a href={AUTHORITATIVE_CONTACT.x.url} target="_blank" rel="noreferrer" className="underline hover:text-neutral-900 dark:hover:text-white">
              {AUTHORITATIVE_CONTACT.x.handle}
            </a>
            ), LinkedIn, and WhatsApp. External services maintain independent privacy policies that govern when you leave this domain.
          </p>
        </div>
      </section>

      {/* 6. Inquiries & Contact */}
      <section className="pt-8 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono-code text-neutral-500">Direct Privacy Contact</div>
            <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {AUTHORITATIVE_CONTACT.email}
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Reach out directly for data requests, access queries, or questions about these practices.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono-code font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto text-center min-h-[40px]"
              >
                Open Contact Form
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Related Navigation Links */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-neutral-500">
        <button
          onClick={() => onNavigate('terms')}
          className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 min-h-[40px]"
        >
          <span>Read Terms of Use</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onNavigate('builds')}
          className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 min-h-[40px]"
        >
          <span>View Upcoming Builds</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
