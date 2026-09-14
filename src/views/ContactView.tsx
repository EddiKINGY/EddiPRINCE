import React, { useState } from 'react';
import { PageRoute } from '../types';
import { AUTHORITATIVE_CONTACT } from '../config/contact';
import { Mail, Send, Check, Copy, AlertCircle, Loader2, ArrowRight, Home, Layers, BookOpen, RotateCcw, ExternalLink, MessageSquare } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { dispatchContactInquiry, analytics } from '../services';


interface ContactViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Architecture & Systems');
  const [message, setMessage] = useState('');
  
  // Validation and submission states
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'failure'>('idle');
  const [dispatchRef, setDispatchRef] = useState('');
  const [failureError, setFailureError] = useState('');

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  const isNameValid = name.trim().length >= 2;
  const isEmailValid = isValidEmail(email);
  const isMessageValid = message.trim().length >= 15;

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
      setFailureError('Unable to record dispatch. Please use the direct mail link below.');
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
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-10 animate-in fade-in duration-200 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Archive', page: 'home' },
          { label: 'Contact & Inquiries' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700">
          <Mail className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
          Direct Electronic Correspondence
        </span>

        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
          Contact & Inquiries
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans-body max-w-2xl">
          Direct communication channels to reach Eddi Prince for software architecture inquiries, collaboration, research dialogue, or technical critique.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121418] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-8 shadow-xs">
          
          {/* SUCCESS / COMPLETION STATE (PEAK-END RULE UX) */}
          {status === 'success' ? (
            <div role="status" aria-live="polite" className="py-4 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-5">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
                  <Check className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-serif-display text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                    Dispatch Logged
                  </h2>
                  <div className="text-xs font-mono-code text-neutral-500">
                    Ref: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{dispatchRef}</span> • Stored in digital queue
                  </div>
                </div>
              </div>

              {/* Honest Expectation Setting */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-2 leading-relaxed">
                <div className="font-mono-code text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                  What Happens Next
                </div>
                <p>
                  Thank you, <strong className="text-neutral-900 dark:text-white">{name}</strong>. Your note has been delivered into my primary triage queue with context tagged under <em className="text-neutral-900 dark:text-neutral-100">{topic}</em>.
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Because I prioritize uninterrupted deep engineering work, I review dispatches in focused cycles. Thoughtful architectural questions and project inquiries typically receive a direct response within 48 to 72 hours.
                </p>
              </div>

              {/* Useful Next Navigation Actions */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono-code text-neutral-500 uppercase tracking-wider font-semibold">
                  Continue Exploring EddiPRINCE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onNavigate('builds')}
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                      <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Explore the Work</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate('notes')}
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                      <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">Read Field Notes</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/80">
                  <button
                    onClick={() => onNavigate('home')}
                    className="text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-1.5"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Return to Home</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-xs font-mono-code text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send another dispatch</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE FORM STATE */
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              
              {/* Failure Banner */}
              {status === 'failure' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2"
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" aria-hidden="true" />
                    <span>Dispatch Transmission Failed</span>
                  </div>
                  <p>{failureError}</p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href={mailtoFallback}
                      className="px-3 py-1.5 rounded-lg bg-amber-800 text-white dark:bg-amber-200 dark:text-neutral-950 font-mono-code text-[11px] font-semibold hover:opacity-90 inline-flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Send Via Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-3 py-1.5 rounded-lg border border-amber-400 dark:border-amber-700 font-mono-code text-[11px]"
                    >
                      Dismiss & Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="name-input" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                    Your Name <span className="text-neutral-400">*</span>
                  </label>
                  {touched.name && !isNameValid && (
                    <span id="name-error" className="text-[11px] font-mono-code text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      <span>At least 2 characters</span>
                    </span>
                  )}
                </div>
                <input
                  id="name-input"
                  type="text"
                  required
                  disabled={status === 'submitting'}
                  aria-invalid={touched.name && !isNameValid}
                  aria-describedby={touched.name && !isNameValid ? 'name-error' : undefined}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="e.g. Maya Lin"
                  className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border text-neutral-900 dark:text-neutral-100 text-sm transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    touched.name && !isNameValid
                      ? 'border-amber-500/80 dark:border-amber-400/80 focus:ring-amber-400/50'
                      : 'border-neutral-200 dark:border-neutral-800 focus:ring-neutral-900 dark:focus:ring-neutral-200'
                  }`}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="email-input" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                    Your Email <span className="text-neutral-400">*</span>
                  </label>
                  {touched.email && !isEmailValid && (
                    <span id="email-error" className="text-[11px] font-mono-code text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      <span>Valid email required</span>
                    </span>
                  )}
                </div>
                <input
                  id="email-input"
                  type="email"
                  required
                  disabled={status === 'submitting'}
                  aria-invalid={touched.email && !isEmailValid}
                  aria-describedby={touched.email && !isEmailValid ? 'email-error' : undefined}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="maya@domain.com"
                  className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border text-neutral-900 dark:text-neutral-100 text-sm transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    touched.email && !isEmailValid
                      ? 'border-amber-500/80 dark:border-amber-400/80 focus:ring-amber-400/50'
                      : 'border-neutral-200 dark:border-neutral-800 focus:ring-neutral-900 dark:focus:ring-neutral-200'
                  }`}
                />
              </div>

              {/* Topic Select */}
              <div className="space-y-1.5">
                <label htmlFor="topic-select" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                  Discussion Context
                </label>
                <select
                  id="topic-select"
                  value={topic}
                  disabled={status === 'submitting'}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200 disabled:opacity-60"
                >
                  <option value="Architecture & Systems">Architecture & Systems Discussion</option>
                  <option value="Tatashi Market">Tatashi Market & Cross-Border Commerce</option>
                  <option value="Lab & Experiments">Lab Experiments & Hypotheses</option>
                  <option value="Field Notes & Writing">Field Notes & Writing Feedback</option>
                  <option value="Technical Collaboration">Technical Collaboration / Sparring</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="message-textarea" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                    Message <span className="text-neutral-400">*</span>
                  </label>
                  {touched.message && !isMessageValid && (
                    <span id="message-error" className="text-[11px] font-mono-code text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      <span>At least 15 characters</span>
                    </span>
                  )}
                </div>
                <textarea
                  id="message-textarea"
                  required
                  rows={5}
                  disabled={status === 'submitting'}
                  aria-invalid={touched.message && !isMessageValid}
                  aria-describedby={touched.message && !isMessageValid ? 'message-error' : undefined}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => handleBlur('message')}
                  placeholder="Describe your technical inquiry, proposal, or feedback..."
                  className={`w-full p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border text-neutral-900 dark:text-neutral-100 text-sm transition-colors focus:outline-none focus:ring-2 resize-none disabled:opacity-60 disabled:cursor-not-allowed ${
                    touched.message && !isMessageValid
                      ? 'border-amber-500/80 dark:border-amber-400/80 focus:ring-amber-400/50'
                      : 'border-neutral-200 dark:border-neutral-800 focus:ring-neutral-900 dark:focus:ring-neutral-200'
                  }`}
                />
              </div>

              {/* Submit Button with Submitting Spinner & Progress Indicator */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white dark:text-neutral-950" aria-hidden="true" />
                    <span>Transmitting Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Transmit Dispatch</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="text-xs font-mono-code text-neutral-500 uppercase tracking-wider">
              Primary Direct Inbox
            </div>
            <a
              href={`mailto:${AUTHORITATIVE_CONTACT.email}`}
              className="font-mono-code text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:text-emerald-600 dark:hover:text-emerald-400 break-all block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded py-0.5"
              aria-label={`Send email directly to ${AUTHORITATIVE_CONTACT.email}`}
              onClick={() => analytics.trackOutboundSocialClick('email', `mailto:${AUTHORITATIVE_CONTACT.email}`)}
            >
              {AUTHORITATIVE_CONTACT.email}
            </a>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono-code border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white transition-all flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200"
                aria-label="Copy verified email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${AUTHORITATIVE_CONTACT.email}`}
                className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono-code border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white transition-all flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200"
                aria-label={`Open email client to compose message to ${AUTHORITATIVE_CONTACT.email} (opens external email app)`}
                onClick={() => analytics.trackOutboundSocialClick('email', `mailto:${AUTHORITATIVE_CONTACT.email}`)}
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Compose Mail</span>
              </a>
            </div>
          </div>

          {/* Social & Messaging Channels */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="text-xs font-mono-code text-neutral-500 uppercase tracking-wider">
              Verified Public Channels
            </div>
            <ul className="space-y-1 text-sm list-none p-0 m-0" aria-label="Authoritative public channels">
              <li>
                <a
                  href={AUTHORITATIVE_CONTACT.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile of David Innocent (opens in new tab)"
                  onClick={() => analytics.trackOutboundSocialClick('linkedin', AUTHORITATIVE_CONTACT.linkedin.url)}
                  className="min-h-[44px] px-2.5 py-2 -mx-2.5 rounded-xl text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white flex items-center justify-between transition-colors"
                >
                  <span className="font-mono-code font-medium">LinkedIn</span>
                  <span className="text-xs font-mono-code text-neutral-500 flex items-center gap-1">
                    David Innocent
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={AUTHORITATIVE_CONTACT.x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X profile @3dd1pr1nc3 (opens in new tab)"
                  onClick={() => analytics.trackOutboundSocialClick('x', AUTHORITATIVE_CONTACT.x.url)}
                  className="min-h-[44px] px-2.5 py-2 -mx-2.5 rounded-xl text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white flex items-center justify-between transition-colors"
                >
                  <span className="font-mono-code font-medium">X</span>
                  <span className="text-xs font-mono-code text-neutral-500 flex items-center gap-1">
                    {AUTHORITATIVE_CONTACT.x.handle}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={AUTHORITATIVE_CONTACT.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile @eddiprince (opens in new tab)"
                  onClick={() => analytics.trackOutboundSocialClick('github', AUTHORITATIVE_CONTACT.github.url)}
                  className="min-h-[44px] px-2.5 py-2 -mx-2.5 rounded-xl text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white flex items-center justify-between transition-colors"
                >
                  <span className="font-mono-code font-medium">GitHub</span>
                  <span className="text-xs font-mono-code text-neutral-500 flex items-center gap-1">
                    @eddiprince
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={AUTHORITATIVE_CONTACT.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp direct chat with David Innocent (opens in new tab)"
                  onClick={() => analytics.trackOutboundSocialClick('whatsapp', AUTHORITATIVE_CONTACT.whatsapp.url)}
                  className="min-h-[44px] px-2.5 py-2 -mx-2.5 rounded-xl text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white flex items-center justify-between transition-colors"
                >
                  <span className="font-mono-code font-medium flex items-center gap-1.5">
                    WhatsApp
                  </span>
                  <span className="text-xs font-mono-code text-neutral-500 flex items-center gap-1">
                    {AUTHORITATIVE_CONTACT.whatsapp.display}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
