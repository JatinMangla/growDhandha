import { projects } from '@/data/projects';
import { site } from '@/data/site';

/**
 * Repositories tagged with this GitHub topic appear in "Recently shipped".
 * Tagging a repo is the whole publishing step — no code change, no redeploy
 * beyond the daily revalidation.
 */
export const SHOWCASE_TOPIC = 'showcase';

/** Refetch at most once a day; the search API allows 10 anonymous calls a minute. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

export type ShippedRepo = {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  pushedAt: string;
};

const githubUser = new URL(site.socials.github).pathname.replace(/\//g, '');

/** Repos already written up as full portfolio cards are not listed twice. */
const featured = new Set(
  projects.flatMap((project) => (project.repo ? [project.repo.toLowerCase()] : [])),
);

function str(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

/** Validates one item of the search response; anything malformed is dropped. */
export function toShippedRepo(item: unknown): ShippedRepo | null {
  if (typeof item !== 'object' || item === null) return null;
  const record = item as Record<string, unknown>;
  if (record.fork === true || record.archived === true || record.private === true) return null;

  const name = str(record.name);
  const url = str(record.html_url);
  const pushedAt = str(record.pushed_at);
  if (!name || !url || !pushedAt) return null;

  const homepage = str(record.homepage);
  return {
    name,
    description: str(record.description) ?? '',
    url,
    homepage: homepage?.startsWith('https://') ? homepage : null,
    language: str(record.language),
    pushedAt,
  };
}

/**
 * The owner's public repos carrying the showcase topic, newest first.
 *
 * Never throws: a rate limit, an outage or a build machine without network
 * yields an empty list, and the section simply does not render.
 */
export async function fetchShowcaseRepos(limit = 6): Promise<ShippedRepo[]> {
  const query = encodeURIComponent(`user:${githubUser} topic:${SHOWCASE_TOPIC} fork:false`);
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  // Optional: lifts the anonymous rate limit on busy build machines.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=updated&order=desc&per_page=${limit + featured.size}`,
      { headers, next: { revalidate: REVALIDATE_SECONDS }, signal: AbortSignal.timeout(5000) },
    );
    if (!response.ok) return [];

    const body: unknown = await response.json();
    const items = (body as { items?: unknown }).items;
    if (!Array.isArray(items)) return [];

    return items
      .map(toShippedRepo)
      .filter((repo): repo is ShippedRepo => repo !== null && !featured.has(repo.url.toLowerCase()))
      .slice(0, limit);
  } catch {
    return [];
  }
}
