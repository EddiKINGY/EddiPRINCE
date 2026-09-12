import {
  AnalyticsConfig,
  AnalyticsEvent,
  PageViewEventParams,
  OutboundSocialClickEventParams,
  ProjectClickEventParams,
  ArticleOpenEventParams,
  SearchEventParams,
  ContactSubmissionEventParams,
  NewsletterSubmissionEventParams,
} from './types';

/**
 * Read configuration from environment variables.
 * Never hardcodes API keys or fake tracking domains.
 */
function getAnalyticsConfig(): AnalyticsConfig {
  const provider = (import.meta.env.VITE_ANALYTICS_PROVIDER || 'none').toLowerCase() as AnalyticsConfig['provider'];
  const domain = import.meta.env.VITE_ANALYTICS_DOMAIN || undefined;
  const apiHost = import.meta.env.VITE_ANALYTICS_API_HOST || undefined;

  const isEnabled = provider !== 'none' && Boolean(domain);

  return {
    provider: ['none', 'plausible', 'umami', 'custom'].includes(provider) ? provider : 'none',
    domain,
    apiHost,
    enabled: isEnabled,
    honorDnt: true,
  };
}

class AnalyticsService {
  private config: AnalyticsConfig;
  private isDntActive: boolean = false;

  constructor() {
    this.config = getAnalyticsConfig();
    this.checkDntStatus();
  }

  private checkDntStatus(): void {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      // Respect Do Not Track preference
      const dnt = navigator.doNotTrack || (window as unknown as { doNotTrack?: string }).doNotTrack;
      this.isDntActive = dnt === '1' || dnt === 'yes';
    }
  }

  /**
   * Dispatches an anonymous event to the configured provider.
   * If unconfigured or DNT is set, gracefully no-ops.
   */
  private send(event: AnalyticsEvent): void {
    if (!this.config.enabled) {
      if (import.meta.env.DEV && false) {
        console.debug(`[Analytics:noop] ${event.name}`, event.params);
      }
      return;
    }

    if (this.config.honorDnt && this.isDntActive) {
      if (import.meta.env.DEV) {
        console.debug(`[Analytics:dnt] Suppressed ${event.name} due to Do-Not-Track preference`);
      }
      return;
    }

    try {
      if (this.config.provider === 'plausible') {
        const host = this.config.apiHost || 'https://plausible.io';
        const url = `${host.replace(/\/$/, '')}/api/event`;
        const payload = {
          name: event.name,
          url: typeof window !== 'undefined' ? window.location.href : '',
          domain: this.config.domain,
          props: event.params,
        };

        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          navigator.sendBeacon(url, JSON.stringify(payload));
        } else {
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true,
          }).catch(() => {
            // Silently suppress network errors on telemetry
          });
        }
      } else if (this.config.provider === 'custom' && this.config.apiHost) {
        fetch(this.config.apiHost, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: event.name,
            domain: this.config.domain,
            data: event.params,
            timestamp: Date.now(),
          }),
          keepalive: true,
        }).catch(() => {
          // Graceful fallback on network glitch
        });
      }
    } catch {
      // Telemetry failure must NEVER disrupt user interaction
    }
  }

  // 1. Page View
  public trackPageView(route: string, title?: string): void {
    this.send({
      name: 'page_view',
      params: {
        route,
        title: title || (typeof document !== 'undefined' ? document.title : undefined),
      },
    });
  }

  // 2. Outbound Social Click
  public trackOutboundSocialClick(platform: OutboundSocialClickEventParams['platform'], targetUrl: string): void {
    this.send({
      name: 'outbound_social_click',
      params: {
        platform,
        targetUrl,
      },
    });
  }

  // 3. Project Click
  public trackProjectClick(projectId: string, projectTitle: string): void {
    this.send({
      name: 'project_click',
      params: {
        projectId,
        projectTitle,
      },
    });
  }

  // 4. Article Open
  public trackArticleOpen(articleSlug: string, articleTitle: string): void {
    this.send({
      name: 'article_open',
      params: {
        articleSlug,
        articleTitle,
      },
    });
  }

  // 5. Search (Sanitized signals: query length, results count; never leaks private search text)
  public trackSearch(queryLength: number, resultsCount: number, category?: string): void {
    this.send({
      name: 'search',
      params: {
        queryLength,
        resultsCount,
        category,
      },
    });
  }

  // 6. Contact Submission (Topic and status only; NEVER personal message text or sender email)
  public trackContactSubmission(topic: string, success: boolean, deliveryChannel: 'webhook' | 'local_fallback'): void {
    this.send({
      name: 'contact_submission',
      params: {
        topic,
        success,
        deliveryChannel,
      },
    });
  }

  // 7. Newsletter Submission (Source location and status only; NEVER sender email)
  public trackNewsletterSubmission(sourceLocation: string, success: boolean, deliveryChannel: 'webhook' | 'local_fallback'): void {
    this.send({
      name: 'newsletter_submission',
      params: {
        sourceLocation,
        success,
        deliveryChannel,
      },
    });
  }

  public getStatus(): { isConfigured: boolean; provider: string; dntEnabled: boolean } {
    return {
      isConfigured: this.config.enabled,
      provider: this.config.provider,
      dntEnabled: this.isDntActive,
    };
  }
}

export const analytics = new AnalyticsService();
