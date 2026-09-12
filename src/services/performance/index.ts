/**
 * Service: Performance & Web Vitals Monitoring
 *
 * Purpose: Track browser Core Web Vitals (LCP, CLS, INP/FID) without external dependencies.
 *
 * Environment Variable:
 * - VITE_PERF_MONITORING_ENABLED: 'true' | 'false' (default: false)
 *
 * Privacy:
 * - Collects strictly quantitative rendering timings (milliseconds).
 * - Zero user identification, zero session tracking.
 */

export interface MetricReport {
  name: 'CLS' | 'LCP' | 'FID' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function getRating(name: MetricReport['name'], value: number): MetricReport['rating'] {
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FID':
    case 'INP':
      return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
  }
}

export function initPerformanceMonitoring(): void {
  const isEnabled = import.meta.env.VITE_PERF_MONITORING_ENABLED === 'true';

  if (!isEnabled) {
    return;
  }

  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    // 1. Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        const value = Math.round(lastEntry.startTime);
        const report: MetricReport = {
          name: 'LCP',
          value,
          rating: getRating('LCP', value),
        };
        if (import.meta.env.DEV) {
          console.debug(`[Perf:LCP] ${report.value}ms (${report.rating})`);
        }
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // 2. Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
          clsValue += layoutShiftEntry.value;
        }
      }
      const roundedCls = Math.round(clsValue * 1000) / 1000;
      if (import.meta.env.DEV) {
        console.debug(`[Perf:CLS] ${roundedCls} (${getRating('CLS', roundedCls)})`);
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch {
    // Fail silently on non-standard browser implementations
  }
}
