import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { CardFx } from '@/components/ui/PointerFX';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { customOption, pricingAssurances, pricingTiers } from '@/data/pricing';
import { whatsappLink } from '@/data/site';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <section id="pricing" className="defer-render border-y border-line bg-sunken py-20 sm:py-24 lg:py-32">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Pricing"
          title="One price, agreed upfront. No surprises later."
          description="Pick the plan that matches where your business is today. You can always add to it later — nothing here locks you in."
          align="center"
        />

        <ul className="grid items-start gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal as="li" key={tier.id} delay={index * 0.08} className="h-full">
              <article
                className={cn(
                  'fx-card surface-card flex h-full flex-col gap-6 p-6 hover:shadow-lift sm:p-8',
                  tier.featured
                    ? 'aurora-ring border-brand shadow-lift lg:-mt-3'
                    : 'hover:border-brand/50',
                )}
              >
                <CardFx />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold">{tier.name}</h3>
                    {tier.featured ? (
                      <span className="rounded-pill bg-brand px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-on-brand">
                        Most chosen
                      </span>
                    ) : null}
                  </div>

                  <p className="flex items-baseline gap-2">
                    <span className="font-display text-display-md font-semibold text-fg">{tier.price}</span>
                  </p>
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

        {/* Fourth option — the custom conversation. */}
        <Reveal className="surface-card flex flex-col gap-5 border-dashed p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-display-sm">{customOption.title}</h3>
            <p className="max-w-prose text-sm leading-relaxed text-muted">{customOption.body}</p>
          </div>
          <ButtonLink
            href={whatsappLink(customOption.enquiry)}
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
      </div>
    </section>
  );
}
