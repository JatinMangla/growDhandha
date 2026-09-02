import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { techGroups, techMarquee } from '@/data/tech';

/** The second lane runs the list backwards so the two never sync up. */
const reversedMarquee = [...techMarquee].reverse();

export function TechStack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="defer-render py-20 sm:py-24 lg:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Under the hood"
          title="The tools I use — you never have to think about them"
          description="This is here for the one person in your team who will ask. Everything below is current, well-supported technology that will still be maintained years from now."
          align="center"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {techGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.08}>
              <div className="surface-card flex h-full flex-col gap-4 p-6">
                <h3 className="eyebrow">{group.label}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-pill border border-line bg-bg px-3 py-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:border-brand hover:text-brand-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Two lanes running against each other, at different speeds. The
          counter-motion is what makes it read as a mechanism rather than a
          scrolling list. Each lane is duplicated so its loop is seamless, and
          the whole thing is hidden from assistive tech because the grouped
          list above already names every item. */}
      <div
        aria-hidden="true"
        className="relative mt-12 flex flex-col gap-3 overflow-hidden border-y border-line bg-sunken py-5"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee-x gap-8 pr-8 motion-reduce:animate-none">
          {[...techMarquee, ...techMarquee].map((item, index) => (
            <span
              key={`a-${item}-${index}`}
              className="whitespace-nowrap font-display text-lg font-medium text-subtle"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex w-max animate-marquee-x-reverse gap-8 pr-8 motion-reduce:animate-none">
          {[...reversedMarquee, ...reversedMarquee].map((item, index) => (
            <span
              key={`b-${item}-${index}`}
              className="whitespace-nowrap font-display text-lg font-medium text-subtle"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
