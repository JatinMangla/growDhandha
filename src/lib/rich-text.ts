/**
 * Inline links inside plain content strings: `[anchor text](/internal/path)`.
 *
 * Contextual links — a sentence in one article pointing at the page that
 * answers its next question — are the strongest internal-linking signal a
 * small site has: they pass authority to the target and tell search engines
 * what it is about through the anchor text. This lets articles and service
 * pages carry them without turning the content model into HTML.
 *
 * Only root-relative paths are recognised; external links stay out of body
 * copy on purpose. A unit test checks every link points at a real page.
 */

export type RichSegment = string | { text: string; href: string };

const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Splits text into plain runs and links, in order. */
export function parseRichText(text: string): RichSegment[] {
  const segments: RichSegment[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) segments.push(text.slice(last, index));
    segments.push({ text: match[1] ?? '', href: match[2] ?? '/' });
    last = index + match[0].length;
  }
  if (last < text.length) segments.push(text.slice(last));
  return segments;
}

/** The text a reader sees, links reduced to their anchor text — for schema and word counts. */
export function plainText(text: string): string {
  return text.replace(LINK, '$1');
}

/** Markdown with absolute URLs, for llms.txt and the `.md` representations. */
export function absoluteMarkdown(text: string, origin: string): string {
  return text.replace(LINK, (_match, anchor: string, href: string) => `[${anchor}](${origin}${href})`);
}

/** Every internal path linked from the text. */
export function linkTargets(text: string): string[] {
  return [...text.matchAll(LINK)].map((match) => match[2] ?? '/');
}
