import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { stats } from '@/data/stats';

export function TrustBar() {
  return (
    <section aria-labelledby="trust-heading" className="border-y border-line bg-sunken py-12 sm:py-14">
      <div className="shell">
        <h2 id="trust-heading" className="sr-only">
          Track record in numbers
        </h2>

        {/* Each stat is one dt/dd pair inside a div wrapper, as the spec
            requires. `order` puts the number on top without breaking that. */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delay={index * 0.08} className="flex flex-col gap-1.5">
              <dt className="order-2 flex flex-col gap-1.5">
                <span className="text-sm font-medium text-fg">{stat.label}</span>
                <span className="text-xs leading-relaxed text-subtle">{stat.note}</span>
              </dt>
              <dd className="order-1 font-display text-display-sm font-semibold text-fg sm:text-display-md">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
