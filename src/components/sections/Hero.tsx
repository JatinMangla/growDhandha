import { ArrowRight, BadgeCheck, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import type { CSSProperties } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { defaultEnquiry, site, whatsappLink } from '@/data/site';
import { HeroBackdrop } from './HeroBackdrop';

const assurances = [
  { icon: BadgeCheck, label: 'Fixed price, in writing' },
  { icon: MessageCircle, label: 'You talk to the developer' },
  { icon: Clock, label: `I reply within ${site.responseTime}` },
];

/** Position in the entrance sequence; consumed by `.hero-enter` in globals.css. */
const step = (index: number) => ({ '--i': index }) as CSSProperties;

/**
 * The orchestrated page-load reveal: each line releases the next.
 *
 * Driven by CSS `animation-delay` rather than an animation runtime, and kept
 * as a server component. This is the one sequence that must not wait for
 * hydration — on a mid-range Android, a JS-driven hero entrance is the
 * difference between the headline appearing immediately and appearing a
 * second late.
 */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44">
      <HeroBackdrop />

      <div className="hero-enter shell relative flex flex-col items-start gap-7">
        <div style={step(0)} className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface/80 px-3.5 py-1.5 font-mono text-eyebrow uppercase text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new projects
          </span>
          <span className="font-mono text-eyebrow uppercase text-muted">
            {site.location.city}, {site.location.country}
          </span>
        </div>

        <h1 style={step(1)} className="max-w-[16ch] text-display-xl">
          A website or app for your business.{' '}
          <span className="text-gradient-brand">Starting at {site.startingPrice}.</span>
        </h1>

        <div style={step(2)} className="w-full max-w-md">
          <LedgerRule />
        </div>

        <p style={step(3)} className="max-w-[52ch] text-lead text-muted">
          I am Jatin, a developer in Delhi. I build websites, mobile apps, and billing and inventory
          software for Indian small businesses — with the same standards I use on a fintech platform
          serving <strong className="font-semibold text-fg">10,500+ users</strong> every day.
        </p>

        <div style={step(4)} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <ButtonLink
            href={whatsappLink(defaultEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="w-full sm:w-auto"
          >
            Get free consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="#work" variant="secondary" size="lg" className="w-full sm:w-auto">
            View work
          </ButtonLink>
        </div>

        <ul style={step(5)} className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
          {assurances.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2 text-sm text-muted">
              <Icon className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <p
          style={step(6)}
          className="inline-flex items-start gap-2.5 rounded-card border border-line bg-surface/70 p-4 text-sm text-muted backdrop-blur sm:items-center"
        >
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink sm:mt-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-fg">Yes, really {site.startingPrice}.</strong> No
            hidden charges, no surprise bills. You see the full price before I start.
          </span>
        </p>
      </div>
    </section>
  );
}
