'use client';

import { Moon, Sun } from 'lucide-react';
import { useCallback, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

/**
 * The theme lives on `<html class="dark">`, set before paint by ThemeScript —
 * that class is the single source of truth, so this component subscribes to it
 * rather than keeping a copy in React state.
 */
function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

// Unknown on the server, so server and client markup match; the icon appears
// once hydrated.
const serverTheme = (): Theme | undefined => undefined;

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private browsing can block storage; the toggle still works for this visit.
    }
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      // A toggle button keeps one fixed name and reports its state through
      // aria-pressed; changing the label as well made screen readers announce
      // a contradiction ("switch to light mode, pressed").
      aria-label="Dark mode"
      aria-pressed={theme === undefined ? undefined : isDark}
      className={cn(
        'tap-target relative inline-flex items-center justify-center rounded-pill border border-line bg-surface p-2.5 text-fg transition-colors duration-200 hover:border-brand hover:text-brand-ink',
        className,
      )}
    >
      <Sun
        className={cn(
          'h-[18px] w-[18px] transition-all duration-300',
          theme === undefined ? 'opacity-0' : isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          'absolute h-[18px] w-[18px] transition-all duration-300',
          theme === undefined ? 'opacity-0' : isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        )}
        aria-hidden="true"
      />
    </button>
  );
}
