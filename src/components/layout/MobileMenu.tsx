'use client';

import { AnimatePresence, domAnimation, LazyMotion, m, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { defaultEnquiry, navLinks, site, whatsappLink } from '@/data/site';
import { EASE_ENTRANCE } from '@/lib/motion';

type MobileMenuProps = {
  open: boolean;
  onNavigate: () => void;
};

/**
 * The animated mobile navigation panel.
 *
 * This is the one place Framer Motion earns a runtime: an enter *and* exit
 * sequence with staggered children, which CSS cannot express without keeping
 * the element mounted. It is code-split via `next/dynamic` in the header and
 * only downloaded when a visitor first opens the menu, so it never touches
 * the critical path or the initial page load.
 */
export function MobileMenu({ open, onNavigate }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  // Opening the menu moves focus into it, so a keyboard user lands on the
  // first link instead of staying on the toggle behind an overlay.
  useEffect(() => {
    if (open) navRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
  }, [open]);

  const panel = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
      };

  const item = reduceMotion
    ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
    : {
        hidden: { opacity: 0, x: -12 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE_ENTRANCE } },
      };

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            {...panel}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE_ENTRANCE }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <m.nav
              ref={navRef}
              aria-label="Mobile"
              className="shell flex flex-col gap-1 py-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {navLinks.map((link) => (
                <m.a
                  key={link.href}
                  variants={item}
                  href={link.href}
                  onClick={onNavigate}
                  className="tap-target flex items-center justify-between rounded-soft px-3 py-3.5 text-base text-fg transition-colors hover:bg-sunken"
                >
                  {link.label}
                  <span aria-hidden="true" className="font-mono text-xs text-subtle">
                    {link.href.replace(/^\/#/, '#')}
                  </span>
                </m.a>
              ))}

              <m.a
                variants={item}
                href="/blog"
                onClick={onNavigate}
                className="tap-target flex items-center justify-between rounded-soft px-3 py-3.5 text-base text-fg transition-colors hover:bg-sunken"
              >
                Blog
                <span aria-hidden="true" className="font-mono text-xs text-subtle">
                  /blog
                </span>
              </m.a>

              <m.div variants={item} className="mt-3 grid gap-2 pb-2">
                <ButtonLink
                  href={whatsappLink(defaultEnquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  data-cta="mobile-menu"
                  onClick={onNavigate}
                >
                  Chat on WhatsApp
                </ButtonLink>
                <ButtonLink href={`tel:${site.phone}`} variant="secondary" size="lg" onClick={onNavigate}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phoneDisplay}
                </ButtonLink>
              </m.div>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
