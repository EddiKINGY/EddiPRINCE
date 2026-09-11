import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface StickyMobileCtaProps {
  id?: string;
  label: string;
  actionText: string;
  hintText?: string;
  icon?: React.ReactNode;
  onAction: () => void;
  storageKey?: string;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({
  id = 'sticky-mobile-cta',
  label,
  actionText,
  hintText,
  icon,
  onAction,
  storageKey,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window !== 'undefined' && storageKey) {
      return sessionStorage.getItem(`cta_dismissed_${storageKey}`) === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      // Trigger only after user has scrolled down past the top viewport (>= 280px)
      const scrolled = window.scrollY > 280;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (storageKey && typeof window !== 'undefined') {
      sessionStorage.setItem(`cta_dismissed_${storageKey}`, 'true');
    }
  };

  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <aside
      id={id}
      role="region"
      aria-label={label}
      className="md:hidden fixed bottom-3 inset-x-3 z-30 animate-in fade-in slide-in-from-bottom-3 duration-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-between gap-2 p-1.5 pl-3 rounded-2xl bg-neutral-900/95 dark:bg-neutral-900/95 text-white border border-neutral-800 shadow-2xl backdrop-blur-md">
        
        {/* Clickable primary action area - Fitts's Law thumb-optimized minimum 44px height */}
        <button
          onClick={onAction}
          className="flex-1 flex items-center gap-2.5 min-h-[44px] text-left min-w-0 pr-1 focus:outline-none focus:ring-1 focus:ring-neutral-400 rounded-xl"
        >
          {icon && <span className="shrink-0 text-neutral-400">{icon}</span>}
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold tracking-tight truncate flex items-center gap-1.5">
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
            </div>
            {hintText && (
              <div className="text-[10px] font-mono-code text-neutral-400 truncate">
                {hintText}
              </div>
            )}
          </div>
        </button>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss action"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-neutral-400 hover:text-white active:bg-neutral-800 transition-colors shrink-0"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};
