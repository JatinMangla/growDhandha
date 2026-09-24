'use client';

import { useEffect } from 'react';
import { channelOf, track } from '@/lib/analytics';

/**
 * Records every WhatsApp, call and email tap from one delegated listener, so
 * no individual button needs to know about analytics.
 *
 * Each event is labelled with where it happened: an explicit `data-cta` on or
 * around the link wins (the header, the floating button, a pricing tier),
 * otherwise the id of the section it sits in (`services`, `faq`, `contact`).
 * That is enough to answer the only question that matters here — which part
 * of the page actually starts conversations.
 */
export function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;

      const channel = channelOf(link.getAttribute('href') ?? '');
      if (!channel) return;

      const cta =
        link.closest<HTMLElement>('[data-cta]')?.dataset.cta ??
        link.closest('section[id]')?.id ??
        link.closest('header, footer')?.tagName.toLowerCase() ??
        'unlabelled';

      track(channel, { cta, path: window.location.pathname });
    };

    // Capture phase, so a handler that stops propagation cannot hide a click.
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
