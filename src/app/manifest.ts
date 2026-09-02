import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

/**
 * Web app manifest.
 *
 * Matters more for this audience than it might elsewhere: most visitors arrive
 * on a mid-range Android, and without a manifest "Add to home screen" falls
 * back to a cropped screenshot and the raw URL as the label. With one, a
 * returning customer gets the business name and a proper icon.
 *
 * Colours mirror the light-theme tokens in globals.css — `theme_color` tints
 * the Android status bar, so it should match the page ground rather than the
 * brand, or the top of the screen fights the header.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: 'growDhandha',
    description: site.shortDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'en-IN',
    dir: 'ltr',
    categories: ['business', 'productivity'],
    background_color: '#FBF7F0',
    theme_color: '#FBF7F0',
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        type: 'image/png',
        sizes: '180x180',
        purpose: 'maskable',
      },
    ],
  };
}
