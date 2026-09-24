import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { CardFx } from '@/components/ui/PointerFX';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/data/faqs';
import { customOption, pricingAssurances, pricingTiers, startingPrice, tier as tierById } from '@/data/pricing';
import { defaultEnquiry, site, siteUrl, whatsappLink } from '@/data/site';
import { cn } from '@/lib/utils';

const TITLE = `Website and app pricing — from ${startingPrice}, no hidden charges`;

export const metadata: Metadata = {
  title: TITLE,
  description: `Exactly what a website, mobile app or billing system costs: three fixed-price plans from ${startingPrice}, what each includes, what is genuinely extra, and how payment works.`,
  keywords: [
    'website price India',
    'website cost Delhi',
    'affordable website for small business',
    'mobile app development cost India',
    'billing software price India',
  ],
  alternates: { canonical: '/pricing', types: { 'text/markdown': '/pricing.md' } },
  openGraph: {
    type: 'website',
    url: '/pricing',
    title: TITLE,
    description: `Three fixed-price plans from ${startingPrice}. What each includes, what is genuinely extra, and how payment works.`,
  },
};

/** Questions from the shared FAQ data that are specifically about money. */
const PRICING_FAQ_IDS = ['whats-included', 'payment', 'hosting-domain', 'why-cheap', 'after-launch'];
const pricingFaqs = faqs.filter((faq) => PRICING_FAQ_IDS.includes(faq.id));

function PricingJsonLd() {
  const url = `${siteUrl}/pricing`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: metadata.title,
        description: metadata.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#business` },
        primaryImageOfPage: `${siteUrl}/opengraph-image`,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: site.name, item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Pricing', item: url },
        ],
      },
      {
        // A price range an assistant can quote in one line.
        '@type': 'AggregateOffer',
        '@id': `${url}#offers`,
        priceCurrency: 'INR',
        lowPrice: Math.min(...pricingTiers.map((tier) => tier.priceValue)),
        highPrice: Math.max(...pricingTiers.map((tier) => tier.priceValue)),
        offerCount: pricingTiers.length,
        offers: pricingTiers.map((tier) => ({
          '@type': 'Offer',
          name: tier.name,
          description: tier.bestFor,
          price: tier.priceValue,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          seller: { '@id': `${siteUrl}/#business` },
          url,
          deliveryLeadTime: tier.timeline,
          itemOffered: {
            '@type': 'Service',
            name: `${tier.name} website and software package`,
            provider: { '@id': `${siteUrl}/#business` },
            areaServed: { '@type': 'Country', name: 'India' },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: pricingFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

export default function PricingPage() {
  return (
    <div className="pb-20 pt-28 sm:pb-24 sm:pt-36">
      <PricingJsonLd />

      <div className="shell flex flex-col gap-14">
        <div className="flex flex-col gap-5">
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="What a website, app or billing system actually costs"
            description="Three fixed-price plans. You get the full scope and the final number in writing before any work starts, and that number does not change unless you ask for something new."
          />

          {/* The answer, first — the thing someone came to this page for. */}
          <p className="max-w-prose text-lead font-medium text-fg">
            Websites start at {site.startingPrice} one-time. A larger site with a catalogue and an
            admin panel is {tierById('business').price}. Custom billing, inventory, CRM or mobile app work
            starts at {tierById('custom').price.replace(/^From /, '')} and is quoted after we talk.
          </p>
        </div>

        <ul className="grid items-start gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal as="li" key={tier.id} delay={index * 0.08} className="h-full">
              <article
                className={cn(
                  'fx-card surface-card flex h-full flex-col gap-6 p-6 hover:shadow-lift sm:p-8',
                  tier.featured ? 'aurora-ring border-brand shadow-lift' : 'hover:border-brand/50',
                )}
              >
                <CardFx />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-lg font-semibold">{tier.name}</h2>
                    {tier.featured ? (
                      <span className="rounded-pill bg-brand px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-on-brand">
                        Most chosen
                      </span>
                    ) : null}
                  </div>

                  <p className="font-display text-display-md font-semibold text-fg">{tier.price}</p>
                  <p className="text-sm text-subtle">{tier.priceNote}</p>
                  <LedgerRule className="max-w-[100px]" />
                  <p className="text-sm leading-relaxed text-muted">{tier.bestFor}</p>
                  <p className="text-sm font-medium text-accent-ink">{tier.timeline}</p>
                </div>

                <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={whatsappLink(tier.enquiry)}
                  data-cta={`tier-${tier.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={tier.featured ? 'primary' : 'secondary'}
                  size="lg"
                  className="mt-auto w-full"
                >
                  {tier.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pricingAssurances.map((assurance) => (
              <li
                key={assurance}
                className="flex items-start gap-2.5 rounded-soft border border-line bg-surface p-4 text-sm text-muted"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                <span>{assurance}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="surface-card flex flex-col gap-5 border-dashed p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-display-sm">{customOption.title}</h2>
            <p className="max-w-prose text-sm leading-relaxed text-muted">{customOption.body}</p>
          </div>
          <ButtonLink
            href={whatsappLink(customOption.enquiry)}
            data-cta="custom-requirement"
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            className="w-full shrink-0 lg:w-auto"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {customOption.ctaLabel}
          </ButtonLink>
        </Reveal>

        <section aria-labelledby="pricing-faq" className="flex flex-col gap-8">
          <h2 id="pricing-faq" className="text-display-md">
            Questions about the price
          </h2>
          <dl className="flex flex-col gap-6">
            {pricingFaqs.map((faq) => (
              <Reveal key={faq.id} className="flex flex-col gap-2 border-t border-line pt-6">
                <dt className="font-display text-lg font-semibold text-fg">{faq.question}</dt>
                <dd className="max-w-prose text-base leading-relaxed text-muted">{faq.answer}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        <div className="flex flex-col gap-4 rounded-card border border-line bg-sunken p-6 sm:p-8">
          <p className="max-w-prose text-sm leading-relaxed text-muted">
            Not sure which plan fits? Tell me what your business does and what is currently wasting
            your time. If a website or app will not actually help you, I will say so.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappLink(defaultEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="fx-magnet w-full sm:w-auto"
            >
              Get a free quote
            </ButtonLink>
            <Link
              href="/#work"
              className="tap-target inline-flex items-center justify-center rounded-pill border border-line bg-surface px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-brand hover:text-brand-ink sm:text-base"
            >
              See previous work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
