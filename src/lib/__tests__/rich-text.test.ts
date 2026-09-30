import { describe, expect, it } from 'vitest';
import { absoluteMarkdown, linkTargets, parseRichText, plainText } from '@/lib/rich-text';

const text = 'See [what it costs](/pricing) and [the guide](/blog/x) first.';

describe('rich text', () => {
  it('splits text into plain runs and links, in order', () => {
    expect(parseRichText(text)).toEqual([
      'See ',
      { text: 'what it costs', href: '/pricing' },
      ' and ',
      { text: 'the guide', href: '/blog/x' },
      ' first.',
    ]);
  });

  it('leaves text without links alone', () => {
    expect(parseRichText('Nothing here.')).toEqual(['Nothing here.']);
  });

  it('only treats root-relative paths as links', () => {
    expect(parseRichText('[x](https://evil.example)')).toEqual(['[x](https://evil.example)']);
  });

  it('reduces links to their anchor text for schema and word counts', () => {
    expect(plainText(text)).toBe('See what it costs and the guide first.');
  });

  it('makes links absolute for markdown readers', () => {
    expect(absoluteMarkdown(text, 'https://site.in')).toBe(
      'See [what it costs](https://site.in/pricing) and [the guide](https://site.in/blog/x) first.',
    );
  });

  it('lists every link target', () => {
    expect(linkTargets(text)).toEqual(['/pricing', '/blog/x']);
  });
});
