import { analytics } from '../analytics';

export interface NewsletterSubscriptionResult {
  success: boolean;
  message: string;
  code?: 'DELIVERY_FAILURE' | 'SERVICE_UNCONFIGURED' | 'VALIDATION_FAILURE' | 'SERVICE_UNAVAILABLE';
}

/**
 * Service: Newsletter Delivery Integration
 *
 * Security & Architecture:
 * - Sends POST /api/newsletter to the server-side Cloudflare Worker.
 * - ZERO private Beehiiv tokens or webhook secrets are exposed in client bundle.
 * - Server holds BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID securely.
 * - ZERO storage of visitor email addresses in localStorage (no 'eddiprince_subscribers').
 * - Fails honestly: Only reports success when the authoritative provider confirms subscription.
 */
export async function submitNewsletterSubscription(
  email: string,
  sourceLocation: string = 'newsletter_section'
): Promise<NewsletterSubscriptionResult> {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        source: sourceLocation,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      analytics.trackNewsletterSubmission(sourceLocation, true, 'api');
      return {
        success: true,
        message: data.message || 'Subscription confirmed with newsletter provider.',
      };
    }

    // Unsuccessful delivery from server
    analytics.trackNewsletterSubmission(sourceLocation, false, 'api');
    return {
      success: false,
      message: data.error || 'Unable to confirm subscription. Please contact directly via email.',
      code: data.code || 'DELIVERY_FAILURE',
    };
  } catch {
    // Network glitch or offline state
    analytics.trackNewsletterSubmission(sourceLocation, false, 'api');
    return {
      success: false,
      message: 'Network connection error. Please try again or email directly.',
      code: 'SERVICE_UNAVAILABLE',
    };
  }
}
