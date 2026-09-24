import type { Testimonial } from '@/types';

/**
 * Real client quotes only — the section stays hidden until this has entries,
 * because an invented testimonial is worse than none.
 *
 * Ask at the moment a client is happiest (launch day), get their permission to
 * use their name and business, and copy their words as they wrote them.
 */
export const testimonials: Testimonial[] = [];
