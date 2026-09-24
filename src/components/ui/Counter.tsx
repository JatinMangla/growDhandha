'use client';

import { useEffect, useRef, useState } from 'react';
import { formatIndianNumber } from '@/lib/utils';

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts up once the number scrolls into view, on a plain rAF loop.
 *
 * The complete value is always in the accessibility tree and in the HTML, so
 * screen readers and crawlers never see a half-counted number, and the visual
 * value is correct immediately for reduced-motion visitors.
 */
export function Counter({ value, prefix = '', suffix = '', durationMs = 1600 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The server renders the final value. If the number is already on screen
    // when this runs, the visitor has read it — zeroing it now flashed
    // "10,500 → 0 → 10,500". Only count up numbers that are still out of view.
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    setDisplay(0);

    let frame = 0;
    let start = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      setDisplay(Math.round(easeOut(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{`${prefix}${formatIndianNumber(value)}${suffix}`}</span>
      <span aria-hidden="true">
        {prefix}
        {formatIndianNumber(display)}
        {suffix}
      </span>
    </span>
  );
}
