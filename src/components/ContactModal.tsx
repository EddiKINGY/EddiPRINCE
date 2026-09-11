import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, Send, Twitter, Github, Linkedin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Architecture & Systems');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('davidabbahinnocent@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    try {
      const existing = JSON.parse(localStorage.getItem('eddiprince_dispatches') || '[]');
      existing.push({
        id: `dispatch-${Date.now()}`,
        name,
        email,
        topic,
        message,
        date: new Date().toISOString(),
      });
      localStorage.setItem('eddiprince_dispatches', JSON.stringify(existing));
    } catch {
      // Graceful fallback if localStorage is disabled
    }
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-[#121418] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-[#FBFBFA] dark:bg-[#0E0F12]">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-500">
              Direct Communication
            </span>
            <h2 id="contact-modal-title" className="text-lg sm:text-xl font-serif-display text-neutral-900 dark:text-neutral-100">
              Get in Touch with EddiPRINCE
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contact modal"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto">
          {/* Quick email copy block */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono-code text-neutral-500">Direct Inbox</div>
                <div className="text-sm font-mono-code font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  davidabbahinnocent@gmail.com
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="min-h-[40px] px-3.5 py-1.5 text-xs font-mono-code flex items-center justify-center gap-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200 w-full sm:w-auto shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Form */}
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="p-6 text-center space-y-3 bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-neutral-200 dark:border-neutral-800"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Message Dispatched
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
                Thank you, {name || 'visitor'}. Your note has been queued. I read every thoughtful dispatch on software, commerce, and building from zero.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="min-h-[40px] px-3 py-1.5 text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400 mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Wright"
                    className="w-full min-h-[44px] px-3.5 py-2 text-base sm:text-sm bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400 mb-1">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full min-h-[44px] px-3.5 py-2 text-base sm:text-sm bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400 mb-1">
                  Topic / Context
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 text-base sm:text-sm bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-neutral-500 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Architecture & Systems">Architecture & Systems Discussion</option>
                  <option value="Tatashi Market">Tatashi Market & Cross-Border Commerce</option>
                  <option value="Lab & Experiments">Lab Experiments & Feedback</option>
                  <option value="Field Notes & Writing">Field Notes & Writing</option>
                  <option value="Casual Intellectual Sparring">Casual Intellectual Sparring</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400 mb-1">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, critique an architectural hypothesis, or ask a question..."
                  className="w-full p-3 text-base sm:text-sm bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-neutral-500 text-neutral-900 dark:text-neutral-100 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-2.5 px-4 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-lg text-xs font-mono-code font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.99] transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Dispatch</span>
              </button>
            </form>
          )}

          {/* Social connections */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500">
            <span className="font-mono-code">Public Profiles</span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://x.com/3dd1pr1nc3"
                target="_blank"
                rel="noreferrer"
                className="min-h-[36px] flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>@3dd1pr1nc3</span>
              </a>
              <a
                href="https://github.com/eddiprince"
                target="_blank"
                rel="noreferrer"
                className="min-h-[36px] flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/david-innocent-443465215"
                target="_blank"
                rel="noreferrer"
                className="min-h-[36px] flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
