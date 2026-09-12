/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_PROVIDER?: string;
  readonly VITE_ANALYTICS_DOMAIN?: string;
  readonly VITE_ANALYTICS_API_HOST?: string;
  readonly VITE_NEWSLETTER_WEBHOOK_URL?: string;
  readonly VITE_CONTACT_WEBHOOK_URL?: string;
  readonly VITE_PERF_MONITORING_ENABLED?: string;
  readonly VITE_GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
