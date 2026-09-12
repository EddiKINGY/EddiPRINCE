import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { Scale, FileText, Layers, ShieldCheck, ArrowRight, ExternalLink, AlertTriangle } from 'lucide-react';
import { AUTHORITATIVE_CONTACT } from '../config/contact';

interface TermsViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
  onOpenContact?: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-10 animate-in fade-in duration-200">
      <Breadcrumb
        items={[
          { label: 'Archive', page: 'home' },
          { label: 'Terms of Use' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
          <Scale className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
          Site Terms & Standards
        </span>

        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
          Terms of Use
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans-body">
          Professional terms governing the use of EddiPRINCE.com and previews of upcoming software builds.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-code text-neutral-500">
          <span>Effective: September 2026</span>
          <span>•</span>
          <span>Scope: Personal Engineering Archive & Build Previews</span>
          <span>•</span>
          <span>Contact: {AUTHORITATIVE_CONTACT.email}</span>
        </div>
      </header>

      {/* 1. Acceptance of Terms */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            1. Acceptance of Terms
          </h2>
        </div>

        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans-body">
          <p>
            By accessing or browsing <strong>EddiPRINCE.com</strong>, you acknowledge and agree to these Terms of Use. The website is owned and operated by <strong>Eddi Prince</strong> (
            <code className="text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
              [OPERATOR_ENTITY: Individual Creator / Developer]
            </code>
            ) to showcase professional engineering work, publish architectural research, and provide transparent previews of upcoming software releases.
          </p>
          <p>
            If you do not agree with any part of these terms, please discontinue use of the website.
          </p>
        </div>
      </section>

      {/* 2. Upcoming Builds, Previews & Roadmap Disclosures */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            2. Upcoming Builds, Previews & Roadmap Disclosures
          </h2>
        </div>

        <div className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans-body">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Works in Progress
            </h3>
            <p>
              All system specifications, state machine models, workflows, and roadmaps relating to upcoming projects (such as <strong>Tatashi Market</strong>) describe systems currently in conceptual modeling, domain analysis, or prototype development.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              No Commercial Guarantee
            </h3>
            <p>
              Informational previews, architectural diagrams, and engineering case studies shared here do not constitute a formal commercial offering, financial solicitation, or binding service agreement until the software is officially launched under dedicated production terms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Revisions & Epistemic Honesty
            </h3>
            <p>
              Architectural designs, delivery timelines, and feature specifications evolve as empirical benchmarks and pilot testing occur. We reserve the right to iterate, pivot, or refactor hypotheses as new evidence emerges.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Intellectual Property */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            3. Intellectual Property
          </h2>
        </div>

        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans-body">
          <p>
            All original writing, system architecture models, brand assets (<strong>EddiPRINCE</strong>), and original diagrams published on this website are the intellectual property of Eddi Prince unless otherwise indicated.
          </p>
          <p>
            Code snippets and architectural patterns shared for educational exploration may be referenced with proper attribution. However, systematic automated scraping, unauthorized mirror sites, or commercial republication of complete articles without consent is strictly prohibited.
          </p>
        </div>
      </section>

      {/* 4. Permitted Site Usage */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Scale className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            4. Permitted Site Usage
          </h2>
        </div>

        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans-body">
          <p>
            You agree to interact with this site lawfully and respectfully. You must not attempt to circumvent site security, inject malicious payloads into communication endpoints, spam dispatch queues, or disrupt hosting infrastructure.
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
            This website provides links to external third-party resources, reference documents, and official profiles (such as GitHub, X / Twitter, and LinkedIn). We hold no responsibility for the content, security, or practices of external websites.
          </p>
        </div>
      </section>

      {/* 6. Disclaimer & Limitation of Liability */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-100/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            6. Disclaimer & Limitation of Liability
          </h2>
        </div>

        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans-body">
          <p>
            All content on EddiPRINCE.com is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis for informational and professional presentation purposes. The materials do not constitute legal, financial, or architectural investment advice.
          </p>
          <p>
            To the maximum extent permitted by applicable law, the author disclaims all liability for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, this site or reliance on its content.
          </p>
        </div>
      </section>

      {/* 7. Governing Law & Contact */}
      <section className="space-y-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <Scale className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-semibold text-neutral-900 dark:text-neutral-100">
            7. Governing Law & Contact
          </h2>
        </div>

        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-3 leading-relaxed font-sans-body">
          <p>
            These terms are governed by the applicable laws of{' '}
            <code className="text-xs font-mono-code bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
              [GOVERNING_JURISDICTION: Owner jurisdiction to be specified]
            </code>
            .
          </p>
          <p>
            For any questions, terms clarification, or commercial collaboration inquiries, please contact{' '}
            <a
              href={`mailto:${AUTHORITATIVE_CONTACT.email}`}
              className="text-neutral-900 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              {AUTHORITATIVE_CONTACT.email}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Contact card */}
      <section className="pt-8 border-t border-neutral-200 dark:border-neutral-800 max-w-3xl">
        <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono-code text-neutral-500">Legal & Inquiries Contact</div>
            <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {AUTHORITATIVE_CONTACT.email}
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Open to constructive dialogue, licensing discussions, and technical inquiries.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono-code font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto text-center min-h-[40px]"
              >
                Send an Inquiry
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Related Navigation Links */}
      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-neutral-500">
        <button
          onClick={() => onNavigate('privacy')}
          className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 min-h-[40px]"
        >
          <span>Review Privacy Policy</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onNavigate('builds')}
          className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 min-h-[40px]"
        >
          <span>Explore Upcoming Builds</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
