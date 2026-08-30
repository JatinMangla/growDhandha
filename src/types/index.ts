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
  price: string;
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

export type NavLink = {
  label: string;
  href: string;
};
