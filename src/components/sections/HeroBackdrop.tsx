import type { CSSProperties } from 'react';

/**
 * Ambient hero motion, built as four layers of depth.
 *
 * A server component with no JavaScript at all. Three kinds of movement,
 * every one of them composited:
 *
 * - the two colour washes drift on their own slow loops;
 * - each layer parallaxes against page scroll via `animation-timeline:
 *   scroll()`, so depth is driven by the browser rather than a scroll handler;
 * - a band of light crosses the grid every few seconds, like an instrument
 *   readout refreshing.
 *
 * `--parallax` sets how far each layer travels: the grid barely moves, the
 * washes move most, which is what reads as distance.
 */
const layer = (parallax: number) => ({ '--parallax': parallax }) as CSSProperties;

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ruled paper, faded out towards the bottom so text stays clean. */}
      <div
        className="ruled-paper parallax-layer absolute inset-0 opacity-70 dark:opacity-40"
        style={{
          ...layer(6),
          maskImage: 'radial-gradient(120% 80% at 50% 0%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, black 30%, transparent 78%)',
        }}
      />

      {/* The travelling readout band. */}
      <div className="hero-scanline" />

      {/* Colour washes. The wrapper parallaxes, the inner element drifts, so
          the two transforms compose instead of overwriting each other. Below
          `sm` they hold still: a 40rem animated blur is real GPU and battery
          cost on a phone for motion few would notice. */}
      <div className="parallax-layer absolute inset-0" style={layer(26)}>
        <div
          className="animate-wash-a absolute -left-[18%] -top-[28%] h-[42rem] w-[42rem] rounded-full opacity-[0.22] blur-[110px] will-change-transform max-sm:animate-none max-sm:will-change-auto dark:opacity-[0.30]"
          style={{ background: 'radial-gradient(circle, rgb(var(--c-brand)) 0%, transparent 65%)' }}
        />
      </div>

      <div className="parallax-layer absolute inset-0" style={layer(18)}>
        <div
          className="animate-wash-b absolute -right-[14%] top-[6%] h-[34rem] w-[34rem] rounded-full opacity-[0.18] blur-[110px] will-change-transform max-sm:animate-none max-sm:will-change-auto dark:opacity-[0.26]"
          style={{ background: 'radial-gradient(circle, rgb(var(--c-accent)) 0%, transparent 65%)' }}
        />
      </div>

      {/* Settle the whole field into the page background. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
