import type { Metadata } from 'next';
import { site } from '@/data/site';

/** Roughly where Google cuts a title off on a phone (it measures pixels; ~60–65 characters). */
export const TITLE_LIMIT = 65;

/**
 * A page title that survives the search result.
 *
 * The layout appends " | Jatin Mangla" to every title. That is worth having
 * when it fits, but a truncated title — "…worth switching? | Jatin M…" —
 * loses the reader the part that earns the click, and click-through is one of
 * the signals that actually moves rankings (docs/SEO-PLAYBOOK.md). So the
 * suffix is dropped whenever it would push the title past the limit.
 */
export function seoTitle(title: string): Metadata['title'] {
  return `${title} | ${site.name}`.length <= TITLE_LIMIT ? title : { absolute: title };
}
