'use client';

import { Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function ThemeToggle({ className }: { className?: string }) {
  // Starts undefined so server and client markup match; the icon appears once mounted.
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private browsing can block storage; the toggle still works for this visit.
    }
    setTheme(next);
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
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
