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
    // Android offers "Install app" only with PNGs at 192 and 512; the SVG
    // covers everything else. The maskable icon keeps its monogram inside the
    // launcher's safe zone. (The 180px apple-icon is for iOS, which reads it
    // from a <link> tag, not from here.)
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192', purpose: 'any' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512', purpose: 'any' },
      { src: '/icon-maskable-512.png', type: 'image/png', sizes: '512x512', purpose: 'maskable' },
    ],
  };
}
