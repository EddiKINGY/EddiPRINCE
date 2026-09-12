/**
 * Analytics Domain Types & Events
 * Privacy-first event definitions: strictly anonymous signals with ZERO personally identifiable information (PII).
 */

export type AnalyticsProviderType = 'none' | 'plausible' | 'umami' | 'custom';

export interface AnalyticsConfig {
  provider: AnalyticsProviderType;
  domain?: string;
  apiHost?: string;
  enabled: boolean;
  honorDnt: boolean;
}

export interface BaseEventParams {
  timestamp: number;
}

export interface PageViewEventParams {
  route: string;
  title?: string;
}

export interface OutboundSocialClickEventParams {
  platform: 'github' | 'x' | 'linkedin' | 'whatsapp' | 'email' | 'other';
  targetUrl: string;
}

export interface ProjectClickEventParams {
  projectId: string;
  projectTitle: string;
}

export interface ArticleOpenEventParams {
  articleSlug: string;
  articleTitle: string;
}

export interface SearchEventParams {
  queryLength: number;
  resultsCount: number;
  category?: string;
}

export interface ContactSubmissionEventParams {
  topic: string;
  success: boolean;
  deliveryChannel: 'webhook' | 'local_fallback';
}

export interface NewsletterSubmissionEventParams {
  sourceLocation: string;
  success: boolean;
  deliveryChannel: 'webhook' | 'local_fallback';
}

export type AnalyticsEvent =
  | { name: 'page_view'; params: PageViewEventParams }
  | { name: 'outbound_social_click'; params: OutboundSocialClickEventParams }
  | { name: 'project_click'; params: ProjectClickEventParams }
  | { name: 'article_open'; params: ArticleOpenEventParams }
  | { name: 'search'; params: SearchEventParams }
  | { name: 'contact_submission'; params: ContactSubmissionEventParams }
  | { name: 'newsletter_submission'; params: NewsletterSubmissionEventParams };
