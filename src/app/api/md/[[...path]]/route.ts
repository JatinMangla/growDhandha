import type { NextRequest } from 'next/server';
import { getPost } from '@/data/posts';
import { fetchShowcaseRepos } from '@/lib/github';
import {
  blogIndexMarkdown,
  homepageMarkdown,
  markdownPagePath,
  postMarkdown,
  pricingMarkdown,
} from '@/lib/content-markdown';

/**
 * Serves the markdown representation of a page.
 *
 * Reached through a rewrite in `next.config.ts` from a URL ending in `.md`
 * (`/pricing.md`, `/blog/slug.md`, `/index.md`), so the public URL a crawler
 * sees and cites is never this one.
 *
 * This used to be middleware that also sniffed `Accept: text/markdown`. That
 * ran an edge function on every human page view to serve a format the best
 * public measurement found earns a negligible share of AI citations; a static
 * rewrite costs nothing until someone actually asks for `.md`.
 *
 * The page path arrives as route segments (`/api/md/blog/slug`), never as a
 * query string: a query added by a rewrite does not reliably reach the
 * handler, and every `.md` URL silently returned the homepage with a 200.
 * That has now happened twice, so there is a regression test for it.
 */
type Params = { params: Promise<{ path?: string[] }> };

/** Only these paths have a markdown form; anything else is a 404, not a guess. */
async function render(path: string): Promise<string | null> {
  if (path === '/' || path === '') return homepageMarkdown(await fetchShowcaseRepos());
  if (path === '/pricing') return pricingMarkdown();
  if (path === '/blog') return blogIndexMarkdown();

  const blogMatch = /^\/blog\/([a-z0-9-]+)$/.exec(path);
  if (blogMatch?.[1]) {
    const post = getPost(blogMatch[1]);
    return post ? postMarkdown(post) : null;
  }

  return null;
}

export async function GET(request: NextRequest, { params }: Params) {
  const path = markdownPagePath((await params).path);
  const body = await render(path);

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
    },
  });
}
