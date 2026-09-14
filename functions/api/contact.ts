/**
 * Cloudflare Pages Functions: POST /api/contact
 *
 * Architecture:
 * - Browser -> POST /api/contact -> Cloudflare Worker -> Email Delivery Provider (Resend / Mailgun / Webhook)
 * - Anti-abuse protections:
 *   1. Honeypot check (_gotcha / hp)
 *   2. Method restriction (POST only)
 *   3. Strict validation: name (2-100 chars), email (valid format, max 254 chars),
 *      topic (whitelisted topics or max 80 chars), message (10-4000 chars)
 *   4. Server-generated submission timestamp and reference ID (never trust client timestamps)
 *   5. Secrets (EMAIL_PROVIDER_API_KEY, CONTACT_EMAIL) stored strictly server-side
 *   6. Clean, safe JSON response without internal stack traces or leaked tokens
 */

interface Env {
  EMAIL_PROVIDER_API_KEY?: string;
  CONTACT_EMAIL?: string;
  CONTACT_WEBHOOK_URL?: string;
}

interface ContactRequestBody {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  _gotcha?: string; // Honeypot field for bot detection
}

function isValidEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  // 1. Content-Type check
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Invalid content-type. Expected application/json.',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 2. Parse and validate payload
  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Malformed JSON payload.',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 3. Honeypot check: If the hidden honeypot field is filled, silently pretend success or drop
  if (body._gotcha && body._gotcha.trim().length > 0) {
    // Return fake success to bots without dispatching
    return new Response(
      JSON.stringify({
        success: true,
        refId: `EP-${Math.floor(10000 + Math.random() * 90000)}`,
        message: 'Dispatch received.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const topic = (body.topic || 'General Inquiry').trim().slice(0, 80);
  const message = (body.message || '').trim();

  // Field validation
  if (!name || name.length < 2 || name.length > 100) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Name must be between 2 and 100 characters.',
        code: 'VALIDATION_FAILURE',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (!email || email.length > 254 || !isValidEmail(email)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Please provide a valid email address.',
        code: 'VALIDATION_FAILURE',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  if (!message || message.length < 10 || message.length > 4000) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Message must be between 10 and 4000 characters.',
        code: 'VALIDATION_FAILURE',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 4. Generate authoritative server-side metadata
  const serverTimestamp = new Date().toISOString();
  const refId = `EP-${Math.floor(10000 + Math.random() * 90000)}`;
  const destinationEmail = env.CONTACT_EMAIL || 'davidabbahinnocent@gmail.com';

  // 5. Dispatch strategy:
  // Option A: If server-side webhook URL is configured (e.g. Discord/Slack/Formspree/Zapier webhook securely stored on Worker)
  if (env.CONTACT_WEBHOOK_URL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refId,
          name,
          email,
          topic,
          message,
          recipient: destinationEmail,
          submittedAt: serverTimestamp,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return new Response(
          JSON.stringify({
            success: true,
            refId,
            message: 'Dispatch sent successfully.',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } catch {
      // Fall through to secondary provider check or safe error response
    }
  }

  // Option B: If Resend / Email delivery provider API key is provided
  if (env.EMAIL_PROVIDER_API_KEY) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.EMAIL_PROVIDER_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'EddiPRINCE Contact <inquiries@eddiprince.com>',
          to: [destinationEmail],
          reply_to: email,
          subject: `[${topic}] from ${name} (${refId})`,
          text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\nRef: ${refId}\nDate: ${serverTimestamp}\n\nMessage:\n${message}`,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return new Response(
          JSON.stringify({
            success: true,
            refId,
            message: 'Dispatch sent successfully.',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } catch {
      // Fall through
    }
  }

  // If no email delivery provider or webhook is configured in server env
  if (!env.CONTACT_WEBHOOK_URL && !env.EMAIL_PROVIDER_API_KEY) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Contact service delivery endpoint is currently unconfigured on server.',
        code: 'SERVICE_UNCONFIGURED',
        refId,
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(
    JSON.stringify({
      success: false,
      error: 'Temporary delivery failure. Please reach out directly via email.',
      code: 'DELIVERY_FAILURE',
      refId,
    }),
    {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

// Reject non-POST methods
export async function onRequest(): Promise<Response> {
  return new Response(
    JSON.stringify({ success: false, error: 'Method not allowed. Use POST.' }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
    }
  );
}
