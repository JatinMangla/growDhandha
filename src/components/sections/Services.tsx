import { ArrowUpRight, Check } from 'lucide-react';
import { CardFx } from '@/components/ui/PointerFX';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/data/services';
import { whatsappLink } from '@/data/site';

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="What I build"
          title="Six things that make a real difference to a small business"
          description="Pick the one that sounds like your problem. If none of them fit, tell me what is slowing you down and I will tell you honestly whether software helps."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal as="li" key={service.id} delay={(index % 3) * 0.08}>
                <article className="bracket-frame fx-card surface-card group flex h-full flex-col gap-4 p-6 hover:border-brand/50 hover:shadow-lift sm:p-7">
                  <CardFx />
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-soft bg-brand/10 text-brand-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-on-brand">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-display-sm">{service.title}</h3>
                    <p className="text-sm font-medium text-brand-ink">{service.promise}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-muted">{service.description}</p>

                  <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-4">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(`Hi Jatin, I want to know more about: ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-fg transition-colors hover:text-brand-ink"
                  >
                    Ask about {service.title.toLowerCase()}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
