import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, Send, Github, Linkedin, AlertCircle, Loader2, RotateCcw, ExternalLink, MessageSquare } from 'lucide-react';
import { XIcon, WhatsAppIcon } from './SocialIcons';
import { AUTHORITATIVE_CONTACT } from '../config/contact';
import { dispatchContactInquiry, analytics } from '../services';


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
  
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'failure'>('idle');
  const [dispatchRef, setDispatchRef] = useState('');
  const [failureError, setFailureError] = useState('');

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  const isNameValid = name.trim().length >= 2;
  const isEmailValid = isValidEmail(email);
  const isMessageValid = message.trim().length >= 15;

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
    navigator.clipboard.writeText(AUTHORITATIVE_CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    setStatus('submitting');
    setFailureError('');

    try {
      const result = await dispatchContactInquiry({
        name,
        email,
        topic,
        message,
      });

      if (result.success) {
        setDispatchRef(result.refId);
        setStatus('success');
      } else {
        setStatus('failure');
        setFailureError(result.error || 'Unable to complete dispatch.');
      }
    } catch {
      setStatus('failure');
      setFailureError('Unable to record dispatch. Please use the direct mail link.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setTopic('Architecture & Systems');
    setTouched({});
    setStatus('idle');
    setDispatchRef('');
    setFailureError('');
  };

  const mailtoFallback = `mailto:${AUTHORITATIVE_CONTACT.email}?subject=${encodeURIComponent(`[${topic}] from ${name}`)}&body=${encodeURIComponent(message)}`;

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

          {/* SUCCESS / COMPLETION STATE */}
          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="p-6 text-center space-y-4 bg-neutral-50 dark:bg-neutral-900/40 rounded-xl border border-neutral-200 dark:border-neutral-800 animate-in fade-in duration-200"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <Check className="w-6 h-6" aria-hidden="true" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Dispatch Received
                </h3>
                <div className="text-xs font-mono-code text-neutral-500">
                  Ref: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{dispatchRef}</span>
                </div>
              </div>

              <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto space-y-2">
                <p>
                  Thank you, <strong>{name}</strong>. Your message has been queued with context under <em>{topic}</em>.
                </p>
                <p className="text-[11px] text-neutral-500">
                  Because I focus deeply on software builds, I triage messages in batches. Thoughtful inquiries typically receive a direct response within 48 to 72 hours.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-center gap-4 border-t border-neutral-200/80 dark:border-neutral-800">
                <button
                  onClick={handleReset}
                  className="min-h-[40px] px-3 py-1.5 text-xs font-mono-code text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Send another message</span>
                </button>
                <button
                  onClick={onClose}
                  className="min-h-[40px] px-4 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono-code font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE FORM STATE */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {status === 'failure' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2"
                >
                  <div className="flex items-center gap-1.5 font-semibold">
                    <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Transmission Failed</span>
                  </div>
                  <p>{failureError}</p>
                  <div className="pt-1 flex gap-2">
                    <a
                      href={mailtoFallback}
                      className="px-2.5 py-1 rounded bg-amber-800 text-white dark:bg-amber-200 dark:text-neutral-950 font-mono-code text-[11px] font-semibold"
                    >
                      Email Directly
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-2.5 py-1 rounded border border-amber-400 dark:border-amber-700 font-mono-code text-[11px]"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <label htmlFor="contact-name" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                      Your Name *
                    </label>
                    {touched.name && !isNameValid && (
                      <span id="modal-name-error" className="text-[10px] font-mono-code text-amber-700 dark:text-amber-400 flex items-center gap-0.5">
                        <AlertCircle className="w-2.5 h-2.5" />
                        <span>Min 2 chars</span>
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={status === 'submitting'}
                    aria-invalid={touched.name && !isNameValid}
                    aria-describedby={touched.name && !isNameValid ? 'modal-name-error' : undefined}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Alex Wright"
                    className={`w-full min-h-[44px] px-3.5 py-2 text-base sm:text-sm bg-neutral-50 dark:bg-neutral-900/60 border rounded-lg transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 ${
                      touched.name && !isNameValid
                        ? 'border-amber-500/80 dark:border-amber-400/80 focus:ring-amber-400/50'
                        : 'border-neutral-200 dark:border-neutral-800 focus:ring-neutral-900 dark:focus:ring-neutral-200'
                    } text-neutral-900 dark:text-neutral-100`}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <label htmlFor="contact-email" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                      Your Email *
                    </label>
                    {touched.email && !isEmailValid && (
                      <span id="modal-email-error" className="text-[10px] font-mono-code text-amber-700 dark:text-amber-400 flex items-center gap-0.5">
                        <AlertCircle className="w-2.5 h-2.5" />
                        <span>Valid email</span>
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={status === 'submitting'}
                    aria-invalid={touched.email && !isEmailValid}
                    aria-describedby={touched.email && !isEmailValid ? 'modal-email-error' : undefined}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="alex@domain.com"
                    className={`w-full min-h-[44px] px-3.5 py-2 text-base sm:text-sm bg-neutral-50 dark:bg-neutral-900/60 border rounded-lg transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 ${
                      touched.email && !isEmailValid
                        ? 'border-amber-500/80 dark:border-amber-400/80 focus:ring-amber-400/50'
                        : 'border-neutral-200 dark:border-neutral-800 focus:ring-neutral-900 dark:focus:ring-neutral-200'
                    } text-neutral-900 dark:text-neutral-100`}
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
                  disabled={status === 'submitting'}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 text-base sm:text-sm bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 text-neutral-900 dark:text-neutral-100 disabled:opacity-60"
                >
                  <option value="Architecture & Systems">Architecture & Systems Discussion</option>
                  <option value="Tatashi Market">Tatashi Market & Cross-Border Commerce</option>
                  <option value="Lab & Experiments">Lab Experiments & Feedback</option>
                  <option value="Field Notes & Writing">Field Notes & Writing</option>
                  <option value="Casual Intellectual Sparring">Casual Intellectual Sparring</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <label htmlFor="contact-message" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                    Message *
                  </label>
                  {touched.message && !isMessageValid && (
                    <span id="modal-message-error" className="text-[10px] font-mono-code text-amber-700 dark:text-amber-400 flex items-center gap-0.5">
                      <AlertCircle className="w-2.5 h-2.5" />
                      <span>Min 15 chars</span>
                    </span>
                  )}
                </div>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  disabled={status === 'submitting'}
                  aria-invalid={touched.message && !isMessageValid}
                  aria-describedby={touched.message && !isMessageValid ? 'modal-message-error' : undefined}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => handleBlur('message')}
                  placeholder="Share your thoughts, critique an architectural hypothesis, or ask a question..."
                  className={`w-full p-3 text-base sm:text-sm bg-neutral-50 dark:bg-neutral-900/60 border rounded-lg transition-colors focus:outline-none focus:ring-2 resize-none disabled:opacity-60 ${
                    touched.message && !isMessageValid
                      ? 'border-amber-500/80 dark:border-amber-400/80 focus:ring-amber-400/50'
                      : 'border-neutral-200 dark:border-neutral-800 focus:ring-neutral-900 dark:focus:ring-neutral-200'
                  } text-neutral-900 dark:text-neutral-100`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full min-h-[44px] px-4 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all font-medium text-sm flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Queuing Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Social & Messaging Channels footer */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code text-neutral-500">
            <span>Direct Channels:</span>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={AUTHORITATIVE_CONTACT.linkedin.url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile of David Innocent (opens in new tab)"
                onClick={() => analytics.trackOutboundSocialClick('linkedin', AUTHORITATIVE_CONTACT.linkedin.url)}
                className="hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded px-1.5 py-1 flex items-center gap-1 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>LinkedIn</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
              </a>
              <a
                href={AUTHORITATIVE_CONTACT.x.url}
                target="_blank"
                rel="noreferrer"
                aria-label="X profile @3dd1pr1nc3 (opens in new tab)"
                onClick={() => analytics.trackOutboundSocialClick('x', AUTHORITATIVE_CONTACT.x.url)}
                className="hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded px-1.5 py-1 flex items-center gap-1 transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
                <span>X</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
              </a>
              <a
                href={AUTHORITATIVE_CONTACT.github.url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile @eddiprince (opens in new tab)"
                onClick={() => analytics.trackOutboundSocialClick('github', AUTHORITATIVE_CONTACT.github.url)}
                className="hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded px-1.5 py-1 flex items-center gap-1 transition-colors"
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                <span>GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
              </a>
              <a
                href={AUTHORITATIVE_CONTACT.whatsapp.url}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp direct chat with David Innocent (opens in new tab)"
                onClick={() => analytics.trackOutboundSocialClick('whatsapp', AUTHORITATIVE_CONTACT.whatsapp.url)}
                className="hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded px-1.5 py-1 flex items-center gap-1 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
