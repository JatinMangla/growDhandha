import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import nextConfig from '../../../../next.config';
import { POST as contact } from '@/app/api/contact/route';
import { GET as markdown } from '@/app/api/md/[[...path]]/route';
import { tier } from '@/data/pricing';
import { posts } from '@/data/posts';

const ORIGIN = 'https://site.example';

const enquiry = {
  name: 'Ramesh Kumar',
  phone: '',
  businessType: 'Shop / Retail store',
  requirement: 'A website and a billing system for my hardware shop.',
};

function post(body: unknown, origin: string | null = ORIGIN): Request {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (origin) headers.set('Origin', origin);
  return new Request(`${ORIGIN}/api/contact`, { method: 'POST', headers, body: JSON.stringify(body) });
}

describe('POST /api/contact', () => {
  const send = vi.fn(async () => new Response('{}', { status: 200 }));

  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    vi.stubEnv('CONTACT_TO_EMAIL', 'me@example.com');
    vi.stubGlobal('fetch', send);
    send.mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('does nothing when email is not configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    expect((await contact(post(enquiry))).status).toBe(204);
    expect(send).not.toHaveBeenCalled();
  });

  it('emails a valid enquiry', async () => {
    const response = await contact(post(enquiry));
    expect(response.status).toBe(204);
    expect(send).toHaveBeenCalledOnce();
    const [url, init] = send.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.resend.com/emails');
    expect(String(init.body)).toContain('Ramesh Kumar');
  });

  it('rejects a request from another origin', async () => {
    expect((await contact(post(enquiry, 'https://evil.example'))).status).toBe(403);
    expect((await contact(post(enquiry, null))).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it('silently accepts, and drops, a filled honeypot', async () => {
    expect((await contact(post({ ...enquiry, company: 'Spam Ltd' }))).status).toBe(204);
    expect(send).not.toHaveBeenCalled();
  });

  it('refuses invalid input, including a business type not in the list', async () => {
    expect((await contact(post({ ...enquiry, name: '' }))).status).toBe(422);
    expect((await contact(post({ ...enquiry, businessType: 'Anything' }))).status).toBe(422);
    expect(send).not.toHaveBeenCalled();
  });
});

/**
 * Regression: twice now, every `.md` URL has returned the homepage with a 200,
 * because the page path was passed in a way that did not survive the rewrite.
 */
describe('GET /api/md/[[...path]]', () => {
  const get = (segments?: string[]) =>
    markdown(new NextRequest(`${ORIGIN}/api/md/${(segments ?? []).join('/')}`), {
      params: Promise.resolve({ path: segments }),
    });

  it('serves each page its own markdown', async () => {
    const pricing = await (await get(['pricing'])).text();
    expect(pricing.startsWith('# Website and app pricing')).toBe(true);
    expect(pricing).toContain(tier('business').price);

    const post = posts[0]!;
    const article = await (await get(['blog', post.slug])).text();
    expect(article.startsWith(`# ${post.title}`)).toBe(true);
  });

  it('serves the homepage for no path and for index', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => Response.json({ items: [] })));
    for (const segments of [undefined, ['index']]) {
      const response = await get(segments);
      expect(response.headers.get('content-type')).toContain('text/markdown');
      expect(await response.text()).toContain('## Pricing');
    }
    vi.unstubAllGlobals();
  });

  it('is reached by rewrites that carry the path as segments, not a query', async () => {
    const rewrites = (await nextConfig.rewrites?.()) as { source: string; destination: string }[];
    expect(rewrites.length).toBeGreaterThan(0);
    for (const rule of rewrites) {
      expect(rule.destination.startsWith('/api/md')).toBe(true);
      expect(rule.destination).not.toContain('?');
    }
  });

  it('404s on anything without a markdown form, rather than guessing', async () => {
    expect((await get(['nope'])).status).toBe(404);
    expect((await get(['blog', 'nope'])).status).toBe(404);
  });
});
