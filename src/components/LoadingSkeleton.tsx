import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', style }) => {
  return (
    <div
      aria-hidden="true"
      className={`bg-neutral-200/80 dark:bg-neutral-800/80 animate-pulse rounded-md ${className}`}
      style={style}
    />
  );
};

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string; label?: string }> = ({
  size = 'md',
  className = '',
  label = 'Processing...',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3',
  };

  return (
    <div role="status" aria-label={label} className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`${sizeClasses[size]} rounded-full border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white animate-spin`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export const PageHeaderSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 py-4" aria-busy="true" aria-label="Loading header">
      <Skeleton className="h-4 w-32 rounded-full" />
      <Skeleton className="h-10 w-3/4 max-w-md" />
      <Skeleton className="h-5 w-full max-w-xl" />
      <Skeleton className="h-5 w-2/3 max-w-lg" />
    </div>
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div
      className="p-5 sm:p-7 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 space-y-4"
      aria-busy="true"
      aria-label="Loading project item"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
        <Skeleton className="h-4 w-28" />
      </div>
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="pt-2 flex gap-2">
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-20 rounded" />
      </div>
    </div>
  );
};

export const ArticleCardSkeleton: React.FC = () => {
  return (
    <div
      className="p-4 sm:p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/40 dark:bg-[#121418]/40 space-y-3"
      aria-busy="true"
      aria-label="Loading article"
    >
      <div className="flex gap-3 items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-5 w-14 rounded" />
        <Skeleton className="h-5 w-14 rounded" />
      </div>
    </div>
  );
};

export const ArticleReadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8" aria-busy="true" aria-label="Loading field note content">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-4/5" />
      <Skeleton className="h-5 w-full" />
      <div className="flex gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};

export const BuildDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8" aria-busy="true" aria-label="Loading system specification">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-6 w-full" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-20 rounded" />
        <Skeleton className="h-6 w-20 rounded" />
        <Skeleton className="h-6 w-24 rounded" />
      </div>
      <div className="space-y-4 pt-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export const RouteProgressBar: React.FC<{ isNavigating: boolean }> = ({ isNavigating }) => {
  if (!isNavigating) return null;
  return (
    <div
      role="progressbar"
      aria-label="Navigating route"
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-neutral-200/50 dark:bg-neutral-800/50 overflow-hidden pointer-events-none"
    >
      <div className="h-full bg-neutral-900 dark:bg-white animate-route-progress w-full" />
    </div>
  );
};
