import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { differentiators } from '@/data/differentiators';
import { site } from '@/data/site';

export function WhyMe() {
  return (
    <section id="why-me" className="border-y border-line bg-sunken py-20 sm:py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why work with me"
            title="The honest answers to what you are actually worried about"
            description="Most business owners have already been let down by someone who promised a website. So here is the plain version, before you have to ask."
          />
          <div className="surface-card mt-8 p-6">
            <p className="text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-fg">
                {site.yearsExperience}+ years, currently at {site.currentEmployer}
              </strong>{' '}
              &mdash; an enterprise software firm. I build for banks and finance teams by day, which is
              why the standards on your project are higher than the price suggests.
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-4">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.id} delay={index * 0.06}>
                <article className="surface-card group flex gap-4 p-6 transition-colors duration-300 hover:border-brand/50 sm:gap-5 sm:p-7">
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-soft bg-accent/10 text-accent-ink transition-colors duration-300 group-hover:bg-accent/20">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-xs italic text-subtle">{item.fear}</p>
                    <h3 className="text-display-sm">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{item.answer}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
