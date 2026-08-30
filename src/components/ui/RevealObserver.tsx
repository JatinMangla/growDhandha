'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Drives every `data-reveal` element on the page from a single
 * IntersectionObserver, mounted once in the root layout.
 *
 * Keeping the behaviour here rather than in each `Reveal` means the ~40
 * reveals on the homepage are plain server-rendered markup with no client
 * component of their own.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)'));
    if (targets.length === 0) return;

    // Reduced motion: show everything at once, no observer at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (const target of targets) target.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.01 },
    );

    for (const target of targets) observer.observe(target);

    return () => observer.disconnect();
    // Re-scan after a client-side navigation brings new sections into the DOM.
  }, [pathname]);

  return null;
}
