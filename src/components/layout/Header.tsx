'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Menu, Phone, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { defaultEnquiry, navLinks, site, whatsappLink } from '@/data/site';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

/**
 * The animated panel — and the animation library with it — is downloaded only
 * once a visitor actually opens the menu. Its links are already in the DOM in
 * the desktop nav and the footer, so nothing is lost for crawlers.
 */
const MobileMenu = dynamic(() => import('./MobileMenu').then((mod) => mod.MobileMenu), {
  ssr: false,
});

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Once mounted the panel stays mounted, so it can animate on the way out.
  const [menuMounted, setMenuMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile menu, keep keyboard focus inside it
  // (toggle + panel), and close it on Escape with focus back on the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      const toggle = toggleRef.current;
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggle?.focus();
        return;
      }
      if (event.key !== 'Tab' || !toggle) return;

      const panel = document.getElementById('mobile-menu');
      const focusables = [toggle, ...(panel?.querySelectorAll<HTMLElement>('a[href], button') ?? [])];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuMounted(true);
    setMenuOpen((open) => !open);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-entrance',
        scrolled
          ? 'border-b border-line bg-bg/85 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="tap-target group flex items-center gap-2.5 font-display text-base font-semibold tracking-tight sm:text-lg"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-soft bg-fg font-mono text-sm font-bold text-bg transition-transform duration-300 group-hover:-rotate-6"
          >
            JM
          </span>
          {/* The name is the link's accessible name at every width; below `sm`
              it is visually hidden rather than removed. */}
          <span className="sr-only sm:not-sr-only">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="tap-target relative inline-flex items-center rounded-pill px-4 py-2 text-sm text-muted transition-colors duration-200 hover:text-fg after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={`tel:${site.phone}`}
            aria-label={`Call ${site.name} on ${site.phoneDisplay}`}
            className="tap-target hidden items-center justify-center rounded-pill border border-line bg-surface p-2.5 text-fg transition-colors duration-200 hover:border-brand hover:text-brand-ink sm:inline-flex lg:hidden"
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>

          {/* Sticky desktop CTA — always one tap from a conversation. */}
          <ButtonLink
            href={whatsappLink(defaultEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="header"
            className="hidden lg:inline-flex"
          >
            Get free consultation
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="tap-target inline-flex items-center justify-center rounded-pill border border-line bg-surface p-2.5 text-fg transition-colors duration-200 hover:border-brand lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuMounted ? <MobileMenu open={menuOpen} onNavigate={closeMenu} /> : null}
    </header>
  );
}
