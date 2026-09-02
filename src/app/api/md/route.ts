import type { NextRequest } from 'next/server';
import { getPost } from '@/data/posts';
import {
  blogIndexMarkdown,
  homepageMarkdown,
  postMarkdown,
  pricingMarkdown,
} from '@/lib/content-markdown';

/**
 * Serves the markdown representation of a page.
 *
 * Reached only through an internal rewrite from `middleware.ts` — either a URL
 * ending in `.md`, or a request whose `Accept` header prefers markdown — so the
 * public URL a crawler sees is never this one.
 *
 * Must stay dynamic: under `dynamic = 'force-static'` Next prerenders the
 * handler once and search params come back empty at request time, so every
 * path silently returned the homepage with a 200 and the right content type.
 * The CDN cache headers below give back the cheapness that static would have.
 */
export const dynamic = 'force-dynamic';

/** Only these paths have a markdown form; anything else is a 404, not a guess. */
function render(path: string): string | null {
  if (path === '/' || path === '') return homepageMarkdown();
  if (path === '/pricing') return pricingMarkdown();
  if (path === '/blog') return blogIndexMarkdown();

  const blogMatch = /^\/blog\/([a-z0-9-]+)$/.exec(path);
  if (blogMatch?.[1]) {
    const post = getPost(blogMatch[1]);
    return post ? postMarkdown(post) : null;
  }

  return null;
}

export function GET(request: NextRequest) {
  // The header is set by the middleware rewrite; the query param covers a
  // direct call to this route.
  const path = request.headers.get('x-md-path') ?? request.nextUrl.searchParams.get('path') ?? '/';
  const body = render(path);

  if (body === null) {
    return new Response('Not found\n', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      // The HTML page is the canonical resource; this is a representation of it.
      Link: `<${request.nextUrl.origin}${path}>; rel="canonical"`,
      Vary: 'Accept',
    },
  });
}
