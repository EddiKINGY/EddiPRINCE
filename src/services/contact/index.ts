import { analytics } from '../analytics';

export interface ContactDispatchPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ContactDispatchResult {
  success: boolean;
  refId: string;
  channel: 'webhook' | 'local_fallback';
  error?: string;
}

/**
 * Service: Contact & Inquiries Delivery Integration
 *
 * Purpose: Securely dispatch contact inquiries to a configured webhook endpoint
 * (e.g. Formspree, Discord/Slack webhook, or custom server endpoint) or record
 * a client-side reference ticket for direct email follow-up.
 *
 * Environment Variable:
 * - VITE_CONTACT_WEBHOOK_URL: Optional HTTPS endpoint to receive form inquiries.
 *
 * Privacy:
 * - Contact payload is only transmitted if an authoritative webhook is explicitly defined.
 * - Anonymous telemetry (topic and channel only) is recorded for reliability.
 */
export async function dispatchContactInquiry(
  payload: ContactDispatchPayload
): Promise<ContactDispatchResult> {
  const refId = `EP-${Math.floor(10000 + Math.random() * 90000)}`;
  const webhookUrl = import.meta.env.VITE_CONTACT_WEBHOOK_URL;

  // Record reference in local storage for the user's records
  try {
    const existing = JSON.parse(localStorage.getItem('eddiprince_dispatches') || '[]');
    existing.push({
      id: refId,
      name: payload.name.trim(),
      email: payload.email.trim(),
      topic: payload.topic,
      message: payload.message.trim(),
      date: new Date().toISOString(),
    });
    localStorage.setItem('eddiprince_dispatches', JSON.stringify(existing));
  } catch {
    // Storage quota warning is handled non-fatally
  }

  // 1. If webhook configured, send remote payload
  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refId,
          ...payload,
          submittedAt: new Date().toISOString(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        analytics.trackContactSubmission(payload.topic, true, 'webhook');
        return {
          success: true,
          refId,
          channel: 'webhook',
        };
      }
    } catch {
      // Remote delivery failure - continue to fallback
    }
  }

  // 2. Graceful Fallback: Local archiving
  analytics.trackContactSubmission(payload.topic, true, 'local_fallback');
  return {
    success: true,
    refId,
    channel: 'local_fallback',
  };
}
