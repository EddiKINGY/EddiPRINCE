/**
 * Cloudflare Pages Functions: POST /api/newsletter
 *
 * Architecture:
 * - Browser -> POST /api/newsletter -> Cloudflare Worker -> Beehiiv API
 * - Validates email format, length, and method.
 * - Enforces server-side secret management: BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID
 *   are stored strictly in Cloudflare environment variables, NEVER exposed to browser.
 * - Rejects malformed requests and unsupported methods.
 * - Protects against abuse and never logs private email addresses.
 */

interface Env {
  BEEHIIV_API_KEY?: string;
  BEEHIIV_PUBLICATION_ID?: string;
}

interface NewsletterRequestBody {
  email?: string;
  source?: string;
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
  let body: NewsletterRequestBody;
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

  const email = (body.email || '').trim().toLowerCase();
  const source = (body.source || 'website').slice(0, 50);

  if (!email || email.length > 254 || !isValidEmail(email)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Please provide a valid email address.',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 3. Verify server-side Beehiiv configuration
  const apiKey = env.BEEHIIV_API_KEY;
  const publicationId = env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    // Graceful unconfigured state: notify client safely without crashing
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Newsletter service is currently unconfigured on server.',
        code: 'SERVICE_UNCONFIGURED',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // 4. Forward to Beehiiv API v2
  try {
    const beehiivUrl = `https://api.beehiiv.com/v2/publications/${encodeURIComponent(publicationId)}/subscriptions`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(beehiivUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: source,
        referring_site: 'https://eddiprince.com',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Subscription confirmed.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle Beehiiv error responses safely without leaking sensitive tokens
    if (response.status === 409) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Address is already subscribed.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Unable to process subscription with newsletter provider.',
        code: 'DELIVERY_FAILURE',
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Temporary connection failure to newsletter provider.',
        code: 'SERVICE_UNAVAILABLE',
      }),
      {
        status: 504,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Reject other HTTP methods
export async function onRequest(): Promise<Response> {
  return new Response(
    JSON.stringify({ success: false, error: 'Method not allowed. Use POST.' }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
    }
  );
}
