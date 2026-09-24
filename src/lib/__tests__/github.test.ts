import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchShowcaseRepos, toShippedRepo } from '@/lib/github';

const repo = (overrides: Record<string, unknown> = {}) => ({
  name: 'tool',
  description: 'Does a thing',
  html_url: 'https://github.com/JatinMangla/tool',
  homepage: 'https://tool.example.com',
  language: 'TypeScript',
  pushed_at: '2026-09-20T10:00:00Z',
  fork: false,
  archived: false,
  private: false,
  ...overrides,
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('toShippedRepo', () => {
  it('keeps the fields the section needs', () => {
    expect(toShippedRepo(repo())).toEqual({
      name: 'tool',
      description: 'Does a thing',
      url: 'https://github.com/JatinMangla/tool',
      homepage: 'https://tool.example.com',
      language: 'TypeScript',
      pushedAt: '2026-09-20T10:00:00Z',
    });
  });

  it('drops forks, archived repos and malformed items', () => {
    expect(toShippedRepo(repo({ fork: true }))).toBeNull();
    expect(toShippedRepo(repo({ archived: true }))).toBeNull();
    expect(toShippedRepo(repo({ html_url: undefined }))).toBeNull();
    expect(toShippedRepo('nonsense')).toBeNull();
  });

  it('ignores a homepage that is not https', () => {
    expect(toShippedRepo(repo({ homepage: 'javascript:alert(1)' }))?.homepage).toBeNull();
  });
});

describe('fetchShowcaseRepos', () => {
  it('skips repos that already have a full portfolio card', async () => {
    const featured = repo({ name: 'predict', html_url: 'https://github.com/JatinMangla/predict' });
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ items: [featured, repo()] })),
    );
    const repos = await fetchShowcaseRepos();
    expect(repos.map((item) => item.name)).toEqual(['tool']);
  });

  it('returns nothing, rather than throwing, when GitHub fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('rate limited', { status: 403 })));
    expect(await fetchShowcaseRepos()).toEqual([]);

    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new Error('offline'))));
    expect(await fetchShowcaseRepos()).toEqual([]);
  });
});
