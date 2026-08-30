'use client';

import { useEffect } from 'react';

/**
 * Makes in-page anchors land exactly, despite the `content-visibility`
 * deferral on below-the-fold sections.
 *
 * While a section is still deferred its height is a placeholder, so a jump to
 * a target further down the page is computed against the wrong layout and
 * lands hundreds of pixels short. This releases the deferral as soon as a
 * visitor actually navigates to an anchor, waits for layout to settle, and
 * then scrolls to the real position. The initial-load benefit is already
 * banked by that point, so nothing is lost.
 *
 * Scroll behaviour comes from CSS (`scroll-behavior: smooth`, switched off
 * under `prefers-reduced-motion`), so this does not need to check for it.
 */
export function AnchorScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const release = () => root.classList.add('anchors-released');

    /** Waits two frames so the released layout is measured, then scrolls. */
    const scrollToId = (id: string, behavior: ScrollBehavior) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const target = document.getElementById(id);
          if (target) target.scrollIntoView({ behavior, block: 'start' });
        });
      });
    };

    const idFromHash = (hash: string) => {
      if (hash.length < 2) return null;
      try {
        return decodeURIComponent(hash.slice(1));
      } catch {
        return hash.slice(1);
      }
    };

    // Someone arriving on a shared deep link, e.g. /#pricing.
    const initialId = idFromHash(window.location.hash);
    if (initialId) {
      release();
      scrollToId(initialId, 'instant');
    }

    const onClick = (event: MouseEvent) => {
      // Let modified clicks (new tab, download, etc.) behave normally.
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const id = idFromHash(anchor.getAttribute('href') ?? '');
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      release();
      scrollToId(id, 'auto');

      // Keep the URL shareable and the back button meaningful.
      window.history.pushState(null, '', `#${id}`);
    };

    const onHashChange = () => {
      const id = idFromHash(window.location.hash);
      if (!id) return;
      release();
      scrollToId(id, 'auto');
    };

    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return null;
}
