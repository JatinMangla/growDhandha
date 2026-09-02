import type { LucideIcon } from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  /** One-line outcome, written for a non-technical owner. */
  promise: string;
  description: string;
  /** Plain-language deliverables — never feature jargon. */
  outcomes: string[];
  icon: LucideIcon;
};

export type Stat = {
  id: string;
  /** Numeric target for the animated counter. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Where the number comes from, so it can be defended in a sales call. */
  note: string;
};

export type PricingTier = {
  id: string;
  name: string;
  /** Display form, e.g. '₹4,999'. */
  price: string;
  /** Numeric INR value for structured data, so an assistant can quote it. */
  priceValue: number;
  /** True when `priceValue` is a floor rather than the price. */
  priceIsFrom?: boolean;
  priceNote: string;
  bestFor: string;
  includes: string[];
  timeline: string;
  featured?: boolean;
  ctaLabel: string;
  /** Pre-filled WhatsApp enquiry for this tier. */
  enquiry: string;
};

export type Project = {
  id: string;
  name: string;
  category: string;
  year: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  /** Optional public link; omit for work under NDA. */
  href?: string;
  /** Two-letter monogram used by the placeholder card art. */
  monogram: string;
  accent: 'brand' | 'accent' | 'gold';
};

export type ProcessStep = {
  id: string;
  title: string;
  duration: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Differentiator = {
  id: string;
  title: string;
  fear: string;
  answer: string;
  icon: LucideIcon;
};

export type TechGroup = {
  id: string;
  label: string;
  items: string[];
};

/**
 * Article body blocks.
 *
 * A flat list of paragraphs extracts badly: retrieval models look for a direct
 * answer near the top and for question-shaped headings, and find neither in a
 * wall of text. These blocks give each article real structure, and the `qa`
 * blocks are emitted as `FAQPage` structured data as well as rendered.
 */
export type PostBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  /** The direct answer, lifted out of the prose so it can be quoted alone. */
  | { kind: 'callout'; text: string }
  | { kind: 'qa'; question: string; answer: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. '2026-09-02'. */
  publishedAt: string;
  /** ISO date of the last substantive edit; feeds sitemap and dateModified. */
  updatedAt: string;
  readingMinutes: number;
  tags: string[];
  /** One-sentence answer to the title, shown first and used as the summary. */
  answer: string;
  body: PostBlock[];
};

export type NavLink = {
  label: string;
  href: string;
};
