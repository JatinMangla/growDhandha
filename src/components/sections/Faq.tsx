'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/data/faqs';
import { whatsappLink } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Accordion built on buttons + aria-expanded rather than <details>, so the
 * open/close transition is controllable and keyboard behaviour is explicit.
 * Answers stay in the DOM, so they are indexable and findable with Ctrl+F.
 */
export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="defer-render py-20 sm:py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            title="Everything people ask me before they say yes"
            description="If your question is not here, message me on WhatsApp. I answer directly, and I will tell you if something is not worth your money."
          />
          <ButtonLink
            href={whatsappLink('Hi Jatin, I have a question before I decide.')}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="mt-8"
          >
            Ask your question
          </ButtonLink>
        </div>

        <ul className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <Reveal as="li" key={faq.id} delay={Math.min(index, 4) * 0.05}>
                <div
                  className={cn(
                    'surface-card overflow-hidden transition-colors duration-300',
                    isOpen && 'border-brand/50',
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      id={`faq-trigger-${faq.id}`}
                      className="tap-target flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display text-base font-semibold text-fg transition-colors hover:text-brand-ink sm:px-6 sm:text-lg"
                    >
                      {faq.question}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                          isOpen ? 'border-brand bg-brand text-on-brand' : 'border-line text-muted',
                        )}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${faq.id}`}
                    className={cn(
                      'grid transition-all duration-300 ease-entrance',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
