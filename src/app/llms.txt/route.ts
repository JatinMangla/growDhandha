import { llmsTxt } from '@/lib/content-markdown';

/**
 * Generated from src/data/* rather than kept as a static file in public/, so it
 * cannot drift from the site. A file at public/llms.txt would shadow this route.
 */
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
