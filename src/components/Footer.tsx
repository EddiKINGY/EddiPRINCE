import React from 'react';
import { PageRoute } from '../types';
import { ArrowUp, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { XIcon, WhatsAppIcon } from './SocialIcons';
import { AUTHORITATIVE_CONTACT } from '../config/contact';
import { analytics } from '../services';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryNavItems: { label: string; page: PageRoute }[] = [
    { label: 'Builds', page: 'builds' },
    { label: 'Field Notes', page: 'notes' },
    { label: 'Lab', page: 'lab' },
    { label: 'Journey', page: 'journey' },
    { label: 'About', page: 'about' },
    { label: 'Now', page: 'now' },
    { label: 'Resources', page: 'resources' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-[#FBFBFA] dark:bg-[#0B0C0E] text-neutral-600 dark:text-neutral-400 mt-16 sm:mt-24 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 sm:gap-10">
          
          {/* Brand & Direct Social/Contact Channels */}
          <div className="space-y-4 max-w-sm">
            <div className="space-y-1">
              <span className="font-serif-display text-2xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight block">
                EddiPRINCE
              </span>
              <p className="text-xs text-neutral-500 font-mono-code leading-relaxed">
                Personal digital headquarters and public archive.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="flex flex-wrap items-center gap-2 pt-1" role="group" aria-label="Direct contact and channels">
              <a
                href={AUTHORITATIVE_CONTACT.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile of David Innocent (opens in new tab)"
                onClick={() => analytics.trackOutboundSocialClick('linkedin', AUTHORITATIVE_CONTACT.linkedin.url)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={AUTHORITATIVE_CONTACT.x.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X profile @3dd1pr1nc3 (opens in new tab)"
                onClick={() => analytics.trackOutboundSocialClick('x', AUTHORITATIVE_CONTACT.x.url)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={AUTHORITATIVE_CONTACT.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile @eddiprince (opens in new tab)"
                onClick={() => analytics.trackOutboundSocialClick('github', AUTHORITATIVE_CONTACT.github.url)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={AUTHORITATIVE_CONTACT.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp direct chat with David Innocent (opens in new tab)"
                onClick={() => analytics.trackOutboundSocialClick('whatsapp', AUTHORITATIVE_CONTACT.whatsapp.url)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${AUTHORITATIVE_CONTACT.email}`}
                aria-label={`Email ${AUTHORITATIVE_CONTACT.email}`}
                onClick={() => analytics.trackOutboundSocialClick('email', `mailto:${AUTHORITATIVE_CONTACT.email}`)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="pt-1">
              <a
                href={`mailto:${AUTHORITATIVE_CONTACT.email}`}
                onClick={() => analytics.trackOutboundSocialClick('email', `mailto:${AUTHORITATIVE_CONTACT.email}`)}
                className="inline-flex items-center gap-1.5 text-xs font-mono-code text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded py-1"
                aria-label={`Send email to ${AUTHORITATIVE_CONTACT.email}`}
              >
                <span>{AUTHORITATIVE_CONTACT.email}</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-neutral-900 dark:text-neutral-200 font-semibold">
              Navigation
            </h3>
            <nav aria-label="Footer primary navigation">
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 text-sm list-none p-0 m-0">
                {primaryNavItems.map((item) => (
                  <li key={item.page}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.page)}
                      className="text-left py-1.5 hover:text-neutral-950 dark:hover:text-white transition-colors min-h-[40px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </div>

        {/* Bottom bar: Copyright, Legal (Privacy & Terms), and Back to Top */}
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono-code text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span>© {new Date().getFullYear()} EddiPRINCE. All rights reserved.</span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700" aria-hidden="true">•</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded py-1"
              >
                Privacy
              </button>
              <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => onNavigate('terms')}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded py-1"
              >
                Terms
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="min-h-[44px] px-3 py-2 flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded transition-colors"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
