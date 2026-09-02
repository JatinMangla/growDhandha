import { NextResponse, type NextRequest } from 'next/server';

/**
 * Serves markdown to agents that want it, two ways:
 *
 * 1. A URL ending in `.md` — `/pricing.md`, `/blog/slug.md`, `/index.md`.
 * 2. An `Accept` header that prefers `text/markdown` over HTML.
 *
 * Both are internal rewrites, so the URL a crawler sees and cites is unchanged
 * and there is no duplicate-content surface to manage.
 *
 * The `Accept` check requires markdown to be ranked *above* HTML rather than
 * merely present. Browsers send `Accept: text/html,...,*&#47;*`, and a naive
 * substring check on `*&#47;*` would serve markdown to every human visitor.
 */

/** Reads the q-value for a media type out of an Accept header. */
function quality(accept: string, type: string): number {
  for (const part of accept.split(',')) {
    const [mediaType, ...params] = part.trim().split(';');
    if (mediaType?.trim() !== type) continue;
    const q = params.find((param) => param.trim().startsWith('q='));
    return q ? Number.parseFloat(q.split('=')[1] ?? '1') : 1;
  }
  return 0;
}

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const markdown = Math.max(quality(accept, 'text/markdown'), quality(accept, 'text/plain'));
  if (markdown === 0) return false;
  const html = Math.max(quality(accept, 'text/html'), quality(accept, 'application/xhtml+xml'));
  return markdown > html;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let target: string | null = null;

  if (pathname.endsWith('.md')) {
    const stripped = pathname.slice(0, -'.md'.length);
    // `/index.md` is the conventional markdown form of the homepage.
    target = stripped === '/index' || stripped === '' ? '/' : stripped;
  } else if (prefersMarkdown(request.headers.get('accept'))) {
    target = pathname;
  }

  if (target === null) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/api/md';
  url.search = '';
  url.searchParams.set('path', target);

  // The path also travels as a request header. A query string added during a
  // rewrite does not reliably reach the route handler — it silently arrived
  // empty, so every markdown URL returned the homepage with a 200. The header
  // survives; the query param stays as a fallback for direct calls.
  const headers = new Headers(request.headers);
  headers.set('x-md-path', target);

  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals, the API itself, and the generated text/image routes,
  // which already serve their own content types.
  matcher: [
    '/((?!_next/|api/|favicon|icon|apple-icon|opengraph-image|twitter-image|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt).*)',
  ],
};
