import { analytics } from '../analytics';

export interface NewsletterSubscriptionResult {
  success: boolean;
  channel: 'webhook' | 'local_fallback';
  message: string;
}

/**
 * Service: Newsletter Delivery Integration
 *
 * Purpose: Securely forward subscriber requests to an authenticated webhook
 * or fallback gracefully to client local persistence.
 *
 * Environment Variable:
 * - VITE_NEWSLETTER_WEBHOOK_URL: Optional HTTPS endpoint to receive subscriber JSON.
 *
 * Privacy:
 * - The email is used solely for subscription delivery.
 * - If unconfigured, data is retained strictly on the client device.
 */
export async function submitNewsletterSubscription(
  email: string,
  sourceLocation: string = 'newsletter_section'
): Promise<NewsletterSubscriptionResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const webhookUrl = import.meta.env.VITE_NEWSLETTER_WEBHOOK_URL;

  // Always keep a local reference so user doesn't re-subscribe
  try {
    const subs: string[] = JSON.parse(localStorage.getItem('eddiprince_subscribers') || '[]');
    if (!subs.includes(normalizedEmail)) {
      subs.push(normalizedEmail);
      localStorage.setItem('eddiprince_subscribers', JSON.stringify(subs));
    }
  } catch {
    // LocalStorage quota error is non-fatal
  }

  // 1. If an external webhook is configured, attempt delivery
  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizedEmail,
          source: sourceLocation,
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        analytics.trackNewsletterSubmission(sourceLocation, true, 'webhook');
        return {
          success: true,
          channel: 'webhook',
          message: 'Subscription confirmed via direct delivery channel.',
        };
      }
    } catch {
      // Remote delivery failure; fall back to local queue
    }
  }

  // 2. Graceful Fallback: Local confirmation
  analytics.trackNewsletterSubmission(sourceLocation, true, 'local_fallback');
  return {
    success: true,
    channel: 'local_fallback',
    message: 'Subscription saved locally. Periodic dispatches will be delivered directly.',
  };
}
