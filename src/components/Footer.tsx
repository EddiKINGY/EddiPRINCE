import React from 'react';
import { PageRoute } from '../types';
import { ArrowUp, Mail, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-[#FBFBFA] dark:bg-[#0B0C0E] text-neutral-600 dark:text-neutral-400 mt-16 sm:mt-24 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-2xl font-normal text-neutral-900 dark:text-neutral-100 tracking-tight">
                EddiPRINCE
              </span>
              <span className="text-xs font-mono-code text-neutral-500">
                eddiprince.com
              </span>
            </div>

            <p className="font-serif-display text-lg text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
              "I’m building my future from scratch."
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
              A personal digital headquarters for documenting the compound journey of turning ideas into products, businesses, and software systems.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <a
                href="https://x.com/3dd1pr1nc3"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/eddiprince"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/david-innocent-443465215"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenContact}
                aria-label="Email EddiPRINCE"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Links - chunked & Fitts's Law touch comfort */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-neutral-900 dark:text-neutral-200 font-semibold">
              Index
            </h3>
            <ul className="space-y-0.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  About & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('builds')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Builds & Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Lab Experiments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notes')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Field Notes (Writing)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journey')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Build Journey Timeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('now')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Now (/now)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Curated Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="w-full text-left py-2 px-1 rounded hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors min-h-[40px] flex items-center text-neutral-800 dark:text-neutral-200"
                >
                  Terms & Colophon
                </button>
              </li>
            </ul>
          </div>

          {/* Core Foundations & Direct Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-neutral-900 dark:text-neutral-200 font-semibold">
              Direct Contact
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Open to thoughtful conversations on software architecture, emerging trade systems, and collaborating on early experiments.
            </p>
            <div className="pt-1">
              <a
                href="mailto:davidabbahinnocent@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-mono-code text-neutral-900 dark:text-neutral-100 hover:underline min-h-[40px]"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                davidabbahinnocent@gmail.com
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            </div>
            <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
              <span className="inline-block text-[11px] font-mono-code text-neutral-500 leading-relaxed">
                Positioning: Creator • Builder • Learner • Founder-in-progress
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono-code text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} EddiPRINCE. All rights reserved. Zero synthetic metrics.
          </div>
          <button
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="min-h-[44px] px-3 py-2 flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
