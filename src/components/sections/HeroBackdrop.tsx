/**
 * Ambient hero motion: a ruled-paper field with two slow, blurred washes of
 * colour drifting behind it.
 *
 * Deliberately a server component with CSS-only animation — transform and
 * opacity only, so it runs on the compositor and costs the main thread nothing
 * on a mid-range Android. `prefers-reduced-motion` stops it via the global
 * rule in `globals.css`.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ruled paper, faded out towards the bottom so text stays clean. */}
      <div
        className="ruled-paper absolute inset-0 opacity-70 dark:opacity-40"
        style={{
          maskImage: 'radial-gradient(120% 80% at 50% 0%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, black 30%, transparent 78%)',
        }}
      />

      <div
        className="animate-wash-a absolute -left-[18%] -top-[28%] h-[42rem] w-[42rem] rounded-full opacity-[0.22] blur-[110px] will-change-transform dark:opacity-[0.30]"
        style={{ background: 'radial-gradient(circle, rgb(var(--c-brand)) 0%, transparent 65%)' }}
      />
      <div
        className="animate-wash-b absolute -right-[14%] top-[6%] h-[34rem] w-[34rem] rounded-full opacity-[0.18] blur-[110px] will-change-transform dark:opacity-[0.26]"
        style={{ background: 'radial-gradient(circle, rgb(var(--c-accent)) 0%, transparent 65%)' }}
      />

      {/* Settle the whole field into the page background. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
