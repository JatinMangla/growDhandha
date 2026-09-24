import { llmsFullTxt } from '@/lib/content-markdown';
import { fetchShowcaseRepos } from '@/lib/github';

/** Every page inlined, for an agent that would rather make one request. */
export const dynamic = 'force-static';

export async function GET() {
  return new Response(llmsFullTxt(await fetchShowcaseRepos()), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
