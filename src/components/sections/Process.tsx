import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/data/process';

/**
 * The timeline spine fills as the section comes into view — the ledger rule
 * turned vertical. The fill is a CSS transition triggered by the same shared
 * observer every other reveal uses, so the whole timeline costs one class
 * toggle rather than a scroll-linked animation loop.
 *
 * Numbering is a genuine sequence here, so the steps are numbered.
 */
export function Process() {
  return (
    <section id="process" className="defer-render py-20 sm:py-24 lg:py-32">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="How it works"
          title="Five steps, and you know where you stand at every one"
          description="No jargon, no long meetings, no wondering what is happening with your money. This is the whole process, start to finish."
        />

        {/* The spine sits outside the list: an <ol> may only contain <li>. */}
        <div className="relative">
          <Reveal
            as="span"
            className="absolute bottom-8 left-[1.375rem] top-3 w-px bg-line sm:left-[1.625rem]"
          >
            <span
              aria-hidden="true"
              className="process-spine absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-brand via-gold to-accent"
            />
          </Reveal>

          <ol className="flex flex-col gap-8 sm:gap-10">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal as="li" key={step.id} delay={index * 0.05} className="relative pl-16 sm:pl-20">
                  <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface font-mono text-sm font-semibold text-brand-ink sm:h-[3.25rem] sm:w-[3.25rem]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-soft bg-brand/10 text-brand-ink">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h3 className="text-display-sm">{step.title}</h3>
                      <span className="rounded-pill border border-line px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-subtle">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-lead text-fg">{step.description}</p>
                    <p className="max-w-prose text-sm leading-relaxed text-muted">{step.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
