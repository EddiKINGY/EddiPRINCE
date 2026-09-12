import React, { useState } from 'react';
import { Mail, Check, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { submitNewsletterSubscription } from '../services';


export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'failure'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Email format validator: must have characters before @, domain, and valid TLD
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  };

  const isInvalid = touched && email.length > 0 && !isValidEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!email || !isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address (e.g., alex@domain.com).');
      return;
    }

    setErrorMessage('');
    setStatus('submitting');

    try {
      const result = await submitNewsletterSubscription(email, 'newsletter_section');
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('failure');
        setErrorMessage(result.message || 'Unable to complete subscription.');
      }
    } catch {
      setStatus('failure');
      setErrorMessage('Could not complete your subscription. Please email directly.');
    }
  };

  return (
    <section
      aria-labelledby="newsletter-title"
      className="my-12 sm:my-16 p-5 sm:p-8 md:p-10 rounded-2xl bg-neutral-100/70 dark:bg-[#121418] border border-neutral-200/90 dark:border-neutral-800 transition-colors"
    >
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-medium bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
          <Mail className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
          Field Notes & Build Log
        </span>

        <h2 id="newsletter-title" className="font-serif-display text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-50 tracking-tight leading-snug break-words">
          Follow the journey from zero.
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto font-sans-body">
          No growth hacks, no affiliate marketing, and no spam. Just honest, periodic dispatches on system architecture, building Tatashi Market, and lessons learned along the way.
        </p>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="p-5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-emerald-500/30 dark:border-emerald-500/30 space-y-2 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-400">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              <span>Subscription Confirmed</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Your address ({email}) has been added to the build log queue. Dispatches are published bi-weekly or after notable architectural milestones.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setEmail('');
                setTouched(false);
              }}
              className="text-xs font-mono-code text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 pt-1"
            >
              Subscribe another email address
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-w-md mx-auto w-full">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full">
              <div className="w-full sm:flex-1 relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for periodic build log dispatches
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  disabled={status === 'submitting'}
                  aria-invalid={isInvalid || !!errorMessage}
                  aria-describedby={isInvalid || errorMessage ? 'newsletter-error' : 'newsletter-hint'}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onBlur={() => setTouched(true)}
                  placeholder="Enter your email..."
                  className={`w-full px-4 py-3 min-h-[48px] text-base sm:text-sm bg-white dark:bg-neutral-900 border rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    isInvalid || errorMessage
                      ? 'border-amber-500/80 dark:border-amber-400/80 focus:ring-amber-400/50'
                      : 'border-neutral-300 dark:border-neutral-700 focus:ring-neutral-900 dark:focus:ring-neutral-200'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto px-6 py-3 min-h-[48px] text-xs font-mono-code font-semibold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shrink-0 active:scale-[0.99]"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white dark:text-neutral-950" aria-hidden="true" />
                    <span>Queuing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            {/* Field-level error indicator */}
            {(isInvalid || errorMessage) && (
              <div
                id="newsletter-error"
                role="alert"
                aria-live="assertive"
                className="flex items-center justify-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 font-medium pt-0.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errorMessage || 'Please enter a valid email address (e.g. alex@domain.com).'}</span>
              </div>
            )}

            {/* Failure state fallback */}
            {status === 'failure' && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                <p>Failed to record subscription. You can send a direct blank email to:</p>
                <a
                  href="mailto:davidabbahinnocent@gmail.com?subject=Subscribe%20to%20EddiPRINCE%20Build%20Log"
                  className="font-mono-code font-semibold underline underline-offset-2 hover:opacity-80"
                >
                  davidabbahinnocent@gmail.com
                </a>
              </div>
            )}
          </div>
        )}

        <p id="newsletter-hint" className="text-[11px] font-mono-code text-neutral-500 pt-1 leading-normal break-words">
          Delivered directly from davidabbahinnocent@gmail.com • Unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
};
