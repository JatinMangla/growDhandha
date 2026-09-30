import type { Metadata } from 'next';
import { seoTitle } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { startingPrice } from '@/data/pricing';
import { services } from '@/data/services';
import { defaultEnquiry, siteUrl, whatsappLink } from '@/data/site';

const TITLE = 'Website, app and software development services';
const DESCRIPTION = `Business websites, mobile apps, CRM, billing and inventory systems, custom software and AI features for Indian small businesses. Fixed prices from ${startingPrice}.`;

export const metadata: Metadata = {
  title: seoTitle(TITLE),
  description: DESCRIPTION,
  alternates: { canonical: '/services', types: { 'text/markdown': '/services.md' } },
  openGraph: { type: 'website', url: '/services', title: TITLE, description: DESCRIPTION },
};

/**
 * The hub for every buyer-intent page. It is linked from the header on every
 * page, and it is the URL to point backlinks at: authority that lands here
 * reaches each service page in one hop, instead of spreading across the
 * homepage's many links first (see docs/SEO-PLAYBOOK.md).
 */
export default function ServicesPage() {
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: TITLE,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/services/${service.id}`,
      name: service.title,
    })),
  };

  return (
    <div className="pb-20 pt-28 sm:pb-24 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }} />

      <div className="shell flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
            ]}
          />
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="What I build for small businesses"
            description={`Six kinds of work, each at a fixed price agreed before I start — websites from ${startingPrice}. Pick the one that sounds like your problem; if none fit, tell me what is slowing you down.`}
          />
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.id}>
                <article className="surface-card group relative flex h-full flex-col gap-4 p-6 transition-colors hover:border-brand/50 sm:p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-soft bg-brand/10 text-brand-ink">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="text-display-sm">
                    <Link
                      href={`/services/${service.id}`}
                      prefetch={false}
                      className="after:absolute after:inset-0 hover:text-brand-ink"
                    >
                      {service.title}
                    </Link>
                  </h2>
                  <p className="text-sm font-medium text-brand-ink">{service.promise}</p>
                  <p className="text-sm leading-relaxed text-muted">{service.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                    What it includes and costs
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-4 rounded-card border border-line bg-sunken p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-prose text-sm leading-relaxed text-muted">
            Not sure which one you need? Describe the problem and I will tell you what it takes — and
            whether you need to build anything at all.
          </p>
          <ButtonLink
            href={whatsappLink(defaultEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            data-cta="services-hub"
            className="w-full shrink-0 sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Ask on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
