import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { defaultEnquiry, navLinks, whatsappLink } from '@/data/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page does not exist. Head back to the homepage or message me directly.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="ruled-paper pointer-events-none absolute inset-0 -z-10 opacity-50" />

      <div className="shell flex min-h-[70vh] flex-col justify-center gap-7 py-28 sm:py-36">
        <p className="font-mono text-display-lg font-semibold text-brand-ink">404</p>
        <LedgerRule className="max-w-[180px]" />

        <div className="flex flex-col gap-3">
          <h1 className="max-w-[18ch] text-display-lg">This page does not exist</h1>
          <p className="max-w-prose text-lead text-muted">
            The link may be old, or there may be a typo in the address. Nothing is broken on your side
            — here is the way back.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" className="w-full sm:w-auto">
            Back to homepage
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink
            href={whatsappLink(defaultEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Message me instead
          </ButtonLink>
        </div>

        <nav aria-label="Popular sections" className="flex flex-col gap-3 border-t border-line pt-7">
          <h2 className="eyebrow">Or jump straight to</h2>
          <ul className="flex flex-wrap gap-2">
            {[...navLinks, { label: 'Blog', href: '/blog' }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href.startsWith('#') ? `/${link.href}` : link.href}
                  className="tap-target inline-flex items-center rounded-pill border border-line bg-surface px-4 py-2.5 text-sm text-fg transition-colors hover:border-brand hover:text-brand-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
