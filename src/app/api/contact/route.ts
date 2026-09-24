import { businessTypes, normalisePhone, sanitize, validateContact, type ContactValues } from '@/lib/validation';

/**
 * Emails a copy of each contact-form enquiry, so a lead survives even when the
 * visitor never presses "send" inside WhatsApp — previously that enquiry was
 * simply lost, with no way of knowing it had existed.
 *
 * Off unless `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set; without them it
 * answers 204 and the form behaves exactly as before. Nothing is stored — the
 * payload goes to the inbox and nowhere else.
 *
 * The browser sends this with `navigator.sendBeacon`, so it never delays the
 * WhatsApp hand-off and survives the tab switching away.
 */
export const dynamic = 'force-dynamic';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

/**
 * Best effort only: a serverless instance keeps this map for as long as it
 * stays warm, not across instances. It stops a single script hammering the
 * endpoint, which is the realistic threat for a form with no stored data.
 */
const recent = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > RATE_MAX;
}

function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === 'string' ? value : '';
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return new Response(null, { status: 204 });

  // Browsers always send Origin on a beacon; anything else is not the form.
  const origin = request.headers.get('origin');
  if (!origin || new URL(origin).host !== new URL(request.url).host) {
    return new Response(null, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== 'object' || parsed === null) throw new Error('not an object');
    body = parsed as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 400 });
  }

  // Honeypot: a field people never see. Filled means a bot; pretend success.
  if (field(body, 'company')) return new Response(null, { status: 204 });

  const clean: ContactValues = {
    name: sanitize(field(body, 'name'), 80),
    phone: sanitize(field(body, 'phone'), 20),
    businessType: sanitize(field(body, 'businessType'), 60),
    requirement: sanitize(field(body, 'requirement'), 1200, { multiline: true }),
  };

  const errors = validateContact(clean);
  const knownType = (businessTypes as readonly string[]).includes(clean.businessType);
  if (Object.keys(errors).length > 0 || !knownType) return new Response(null, { status: 422 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) return new Response(null, { status: 429 });

  const phone = clean.phone ? normalisePhone(clean.phone) : null;
  const text = [
    `Name: ${clean.name}`,
    `Phone: ${phone ? `+91 ${phone}` : 'not given — reply on the WhatsApp number it came from'}`,
    `Business: ${clean.businessType}`,
    '',
    clean.requirement,
    '',
    '— Sent from the contact form. The visitor was handed to WhatsApp at the same moment.',
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Website enquiries <onboarding@resend.dev>',
      to: [to],
      subject: `New enquiry: ${clean.name} (${clean.businessType})`,
      text,
    }),
  });

  if (!response.ok) {
    console.error(`Resend rejected the enquiry email: HTTP ${response.status}`);
    return new Response(null, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
