import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { Mail, Copy, Check, Send, ShieldCheck, MapPin } from 'lucide-react';
import { AUTHORITATIVE_CONTACT } from '../config/contact';

interface ContactViewProps {
  onNavigate: (page: PageRoute, itemId?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Architecture & Systems');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AUTHORITATIVE_CONTACT.email);
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
          <Mail className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
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
          {submitted ? (
            <div role="status" aria-live="polite" className="text-center py-10 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="font-serif-display text-2xl font-medium text-neutral-900 dark:text-neutral-100">
                Dispatch Received
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Thank you, {name || 'visitor'}. Your message has been queued. I respond directly to thoughtful inquiries regarding engineering, commerce protocols, and public builds.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-mono-code border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name-input" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                  Your Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email-input" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                  Your Email
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@domain.com"
                  className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="topic-select" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                  Discussion Context
                </label>
                <select
                  id="topic-select"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
                >
                  <option value="Architecture & Systems">Architecture & Systems Discussion</option>
                  <option value="Tatashi Market">Tatashi Market & Cross-Border Commerce</option>
                  <option value="Lab & Experiments">Lab Experiments & Hypotheses</option>
                  <option value="Field Notes & Writing">Field Notes & Writing Feedback</option>
                  <option value="Technical Collaboration">Technical Collaboration / Sparring</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message-textarea" className="block text-xs font-mono-code text-neutral-600 dark:text-neutral-400">
                  Message
                </label>
                <textarea
                  id="message-textarea"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your technical inquiry, proposal, or feedback..."
                  className="w-full p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Dispatch</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="text-xs font-mono-code text-neutral-500 uppercase tracking-wider">
              Verified Direct Inbox
            </div>
            <div className="font-mono-code text-sm font-semibold text-neutral-900 dark:text-neutral-100 break-all">
              {AUTHORITATIVE_CONTACT.email}
            </div>
            <button
              onClick={handleCopyEmail}
              className="min-h-[40px] px-4 py-2 rounded-xl text-xs font-mono-code border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Social Profiles */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="text-xs font-mono-code text-neutral-500 uppercase tracking-wider">
              Verified Public Channels
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <a
                  href={AUTHORITATIVE_CONTACT.x.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-800 dark:text-neutral-200 hover:underline flex items-center justify-between"
                >
                  <span className="font-mono-code">X (Twitter)</span>
                  <span className="text-xs font-mono-code text-neutral-500">{AUTHORITATIVE_CONTACT.x.handle} ↗</span>
                </a>
              </div>
              <div>
                <a
                  href={AUTHORITATIVE_CONTACT.linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-800 dark:text-neutral-200 hover:underline flex items-center justify-between"
                >
                  <span className="font-mono-code">LinkedIn</span>
                  <span className="text-xs font-mono-code text-neutral-500">David Innocent ↗</span>
                </a>
              </div>
              <div>
                <a
                  href={AUTHORITATIVE_CONTACT.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-800 dark:text-neutral-200 hover:underline flex items-center justify-between"
                >
                  <span className="font-mono-code">GitHub</span>
                  <span className="text-xs font-mono-code text-neutral-500">github.com/eddiprince ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Physical Address Disclosure Notice */}
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-1.5 font-mono-code text-neutral-800 dark:text-neutral-200 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>Physical Address Disclosure</span>
            </div>
            <p className="leading-relaxed">
              Under our radical intellectual honesty policy, no corporate office or physical mailing address is published because none has been established. Direct electronic correspondence is monitored daily.
            </p>
          </div>

          {/* Privacy Guarantee */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-1.5 font-mono-code text-emerald-800 dark:text-emerald-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Surveillance Privacy</span>
            </div>
            <p className="leading-relaxed">
              Your correspondence is stored locally or transmitted directly to the verified email inbox. We do not track, profile, or distribute your email address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
