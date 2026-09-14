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
  channel: 'api';
  error?: string;
  code?: 'DELIVERY_FAILURE' | 'SERVICE_UNCONFIGURED' | 'VALIDATION_FAILURE' | 'SERVICE_UNAVAILABLE';
}

/**
 * Service: Contact & Inquiries Delivery Integration
 *
 * Security & Architecture:
 * - Sends POST /api/contact to the server-side Cloudflare Worker.
 * - ZERO private provider credentials or secrets exposed in client bundle.
 * - Server validates inputs, runs honeypot spam protection, generates authoritative timestamps
 *   and reference IDs, and dispatches to configured destination.
 * - ZERO storage of personal inquiry data, names, or messages in localStorage (no 'eddiprince_dispatches').
 * - Fails honestly: Only reports success when the server-side provider successfully processes the request.
 */
export async function dispatchContactInquiry(
  payload: ContactDispatchPayload
): Promise<ContactDispatchResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        topic: payload.topic,
        message: payload.message.trim(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      analytics.trackContactSubmission(payload.topic, true, 'api');
      return {
        success: true,
        refId: data.refId || `EP-${Math.floor(10000 + Math.random() * 90000)}`,
        channel: 'api',
      };
    }

    analytics.trackContactSubmission(payload.topic, false, 'api');
    return {
      success: false,
      refId: data.refId || `EP-${Math.floor(10000 + Math.random() * 90000)}`,
      channel: 'api',
      error: data.error || 'Server delivery failure. Please use direct email.',
      code: data.code || 'DELIVERY_FAILURE',
    };
  } catch {
    analytics.trackContactSubmission(payload.topic, false, 'api');
    return {
      success: false,
      refId: `EP-${Math.floor(10000 + Math.random() * 90000)}`,
      channel: 'api',
      error: 'Network connection error. Please send your message directly via email.',
      code: 'SERVICE_UNAVAILABLE',
    };
  }
}
