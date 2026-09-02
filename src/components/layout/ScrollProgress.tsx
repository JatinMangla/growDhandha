'use client';

import { useEffect, useRef } from 'react';

/**
 * Hairline progress bar pinned under the header. Decorative only.
 *
 * Where the browser supports scroll-driven timelines it drives itself entirely
 * from CSS (`animation-timeline: scroll(root)`) and this component does
 * nothing at all — no listener, no rAF, no work on the main thread while
 * scrolling. Everywhere else it falls back to a rAF-throttled passive
 * listener writing the transform directly, with no React state, so scrolling
 * still never triggers a re-render.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const nativeTimeline =
      typeof CSS !== 'undefined' &&
      CSS.supports('animation-timeline: scroll()') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (nativeTimeline) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      node.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-gold to-accent"
    />
  );
}
