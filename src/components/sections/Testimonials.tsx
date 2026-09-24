import { Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from '@/data/testimonials';

/** Renders nothing until `src/data/testimonials.ts` has real entries. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="clients" className="defer-render border-y border-line bg-sunken py-20 sm:py-24 lg:py-32">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="In their words"
          title="What business owners say after launch"
          description="Unedited, from people who run the kind of business you do."
        />

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal as="li" key={item.id} delay={(index % 3) * 0.08}>
              <figure className="surface-card flex h-full flex-col gap-5 p-6 sm:p-7">
                <Quote className="h-6 w-6 text-brand-ink" aria-hidden="true" />
                <blockquote className="text-base leading-relaxed text-fg">{item.quote}</blockquote>
                <figcaption className="mt-auto flex flex-col gap-1 border-t border-line pt-4">
                  <span className="text-sm font-semibold text-fg">{item.name}</span>
                  <span className="text-sm text-muted">{item.business}</span>
                  <span className="eyebrow text-subtle">{item.project}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
