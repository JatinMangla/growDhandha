import { Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { services } from '@/data/services';
import { navLinks, site } from '@/data/site';
import { LedgerRule } from '@/components/ui/LedgerRule';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-sunken">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-soft bg-fg font-mono text-sm font-bold text-bg"
              >
                JM
              </span>
              <span className="font-display text-lg font-semibold">{site.name}</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {site.role} in {site.location.city}. I build websites, mobile apps and business software
              for Indian small businesses — starting at {site.startingPrice}.
            </p>
            <LedgerRule className="max-w-[120px]" />
            <div className="flex gap-2">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jatin Mangla on LinkedIn"
                className="tap-target inline-flex items-center justify-center rounded-pill border border-line bg-surface p-2.5 text-fg transition-colors hover:border-brand hover:text-brand-ink"
              >
                <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jatin Mangla on GitHub"
                className="tap-target inline-flex items-center justify-center rounded-pill border border-line bg-surface p-2.5 text-fg transition-colors hover:border-brand hover:text-brand-ink"
              >
                <Github className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
              <a
                href={site.socials.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jatin Mangla's developer portfolio"
                className="tap-target inline-flex items-center justify-center rounded-pill border border-line bg-surface p-2.5 text-fg transition-colors hover:border-brand hover:text-brand-ink"
              >
                <Globe className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Services" className="flex flex-col gap-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-fg">
              What I build
            </h2>
            <ul className="flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  {/* A plain anchor, deliberately: from another page a full load
                      lets AnchorScroll release the deferred sections and land
                      exactly, which a client-side transition would skip. */}
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a
                    href="/#services"
                    className="tap-target inline-flex items-center text-sm text-muted transition-colors hover:text-brand-ink"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-fg">
                Sections
              </h2>
              <ul className="flex flex-col gap-2.5">
                {[
                  ...navLinks,
                  { label: 'Pricing details', href: '/pricing' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contact', href: '/#contact' },
                ].map(
                  (link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="tap-target inline-flex items-center text-sm text-muted transition-colors hover:text-brand-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8">
          <address className="flex flex-col gap-2.5 not-italic sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href={`tel:${site.phone}`}
              className="tap-target inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand-ink"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="tap-target inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand-ink"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {site.email}
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {site.location.city}, {site.location.country} — {site.workingHours}
            </span>
          </address>

          <div className="flex flex-col gap-2 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {site.name}. All rights reserved.{' '}
              <a href="/privacy" className="underline underline-offset-2 transition-colors hover:text-brand-ink">
                Privacy
              </a>
            </p>
            <p>Built and maintained by hand — no page builders.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
