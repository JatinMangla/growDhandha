import { llmsFullTxt } from '@/lib/content-markdown';

/** Every page inlined, for an agent that would rather make one request. */
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
