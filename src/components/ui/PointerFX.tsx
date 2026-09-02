'use client';

import { useEffect } from 'react';

/**
 * Drives every pointer-reactive surface on the page from one delegated
 * listener, mounted once in the root layout.
 *
 * What it does: writes `--px/--py` (where the cursor is over an element) and
 * `--rx/--ry` (tilt) onto `.fx-card`, and `--mx/--my` onto `.fx-magnet`. All
 * the actual movement is CSS, so this never animates anything itself — it
 * only publishes coordinates.
 *
 * What it deliberately does not do:
 * - run on touch devices. Gated on `(hover: hover) and (pointer: fine)`, so
 *   phones — most of this site's traffic — never execute a line of it.
 * - run for visitors who asked for reduced motion.
 * - read layout on every pointer move. The element's rect is measured once on
 *   enter and cached; writing custom properties would otherwise invalidate
 *   layout and force a re-measure on the next move, which is the classic way
 *   an effect like this turns into jank.
 */

const TILT_DEGREES = 5;
const MAGNET_STRENGTH = 0.22;
const MAGNET_MAX_PX = 7;

type Tracked = { element: HTMLElement; rect: DOMRect; kind: 'card' | 'magnet' };

export function PointerFX() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reduceMotion.matches) return;

    let tracked: Tracked | null = null;
    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const clear = (element: HTMLElement, kind: Tracked['kind']) => {
      if (kind === 'card') {
        element.style.removeProperty('--rx');
        element.style.removeProperty('--ry');
      } else {
        element.style.removeProperty('--mx');
        element.style.removeProperty('--my');
      }
    };

    const paint = () => {
      frame = 0;
      if (!tracked) return;

      const { element, rect, kind } = tracked;
      // Normalised position within the element, clamped to its bounds.
      const nx = Math.min(Math.max((pointer.x - rect.left) / rect.width, 0), 1);
      const ny = Math.min(Math.max((pointer.y - rect.top) / rect.height, 0), 1);

      if (kind === 'card') {
        element.style.setProperty('--px', `${(nx * 100).toFixed(1)}%`);
        element.style.setProperty('--py', `${(ny * 100).toFixed(1)}%`);
        element.style.setProperty('--ry', `${((nx - 0.5) * 2 * TILT_DEGREES).toFixed(2)}deg`);
        element.style.setProperty('--rx', `${((0.5 - ny) * 2 * TILT_DEGREES).toFixed(2)}deg`);
        return;
      }

      const dx = (pointer.x - (rect.left + rect.width / 2)) * MAGNET_STRENGTH;
      const dy = (pointer.y - (rect.top + rect.height / 2)) * MAGNET_STRENGTH;
      const clamp = (value: number) => Math.min(Math.max(value, -MAGNET_MAX_PX), MAGNET_MAX_PX);
      element.style.setProperty('--mx', `${clamp(dx).toFixed(2)}px`);
      element.style.setProperty('--my', `${clamp(dy).toFixed(2)}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      const target = event.target as Element | null;
      const card = target?.closest?.('.fx-card') as HTMLElement | null;
      const magnet = target?.closest?.('.fx-magnet') as HTMLElement | null;
      // A magnetic button inside a card wins — it is the smaller target.
      const next = magnet ?? card;

      if (!next) {
        if (tracked) {
          clear(tracked.element, tracked.kind);
          tracked = null;
        }
        return;
      }

      if (!tracked || tracked.element !== next) {
        if (tracked) clear(tracked.element, tracked.kind);
        // Measured once per entry, not per move.
        tracked = { element: next, rect: next.getBoundingClientRect(), kind: magnet ? 'magnet' : 'card' };
      }

      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // The cached rect is stale after any scroll or resize.
    const invalidate = () => {
      if (tracked) tracked.rect = tracked.element.getBoundingClientRect();
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', invalidate, { passive: true });
    window.addEventListener('resize', invalidate, { passive: true });

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', invalidate);
      window.removeEventListener('resize', invalidate);
      cancelAnimationFrame(frame);
      if (tracked) clear(tracked.element, tracked.kind);
    };
  }, []);

  return null;
}

/**
 * The two light layers a `.fx-card` needs. Rendered as real elements because
 * `bracket-frame` already claims ::before and ::after on these cards.
 */
export function CardFx() {
  return (
    <>
      <span className="fx-sheen" aria-hidden="true" />
      <span className="fx-edge" aria-hidden="true" />
    </>
  );
}
