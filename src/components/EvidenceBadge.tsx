import React from 'react';
import { EvidenceLevel } from '../types';
import { getEvidenceMeta } from '../data/evidenceModel';

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  className?: string;
  showTooltip?: boolean;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  level,
  className = '',
  showTooltip = true,
}) => {
  const meta = getEvidenceMeta(level);

  return (
    <span
      title={showTooltip ? meta.description : undefined}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-mono-code font-medium tracking-wide uppercase whitespace-nowrap ${meta.badgeClass} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      <span>{meta.shortLabel}</span>
    </span>
  );
};
