'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { defaultEnquiry, whatsappLink } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Always-available WhatsApp entry point. Appears after the visitor has moved
 * past the hero (where the same action is already a primary button), so it
 * never competes with the hero CTA on a small screen.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(defaultEnquiry)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Jatin on WhatsApp"
      className={cn(
        'fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-pill bg-accent px-4 py-3.5 text-sm font-semibold text-white shadow-lift-lg transition-all duration-300 ease-entrance hover:scale-105 sm:bottom-7 sm:right-7',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp me</span>
      <span className="sr-only sm:hidden">WhatsApp me</span>
    </a>
  );
}
