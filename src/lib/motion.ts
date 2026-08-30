import type { Transition } from 'framer-motion';

/**
 * The site's motion language: one easing curve, used everywhere.
 *
 * Almost all movement on this site is CSS — the hero entrance, the scroll
 * reveals, the process spine, the ambient washes, the ticker — so it runs on
 * the compositor and never waits for hydration on a mid-range phone. Framer
 * Motion is reserved for the mobile menu, which needs a real enter *and* exit
 * sequence, and is code-split so it loads only when that menu is opened.
 */
export const EASE_ENTRANCE: Transition['ease'] = [0.16, 1, 0.3, 1];
