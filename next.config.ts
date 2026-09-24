import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Content-Security-Policy.
 *
 * `script-src` still allows 'unsafe-inline', and that is a deliberate trade:
 * Next streams its own inline bootstrap scripts, and the only strict
 * alternative is a per-request nonce, which forces every page to render
 * dynamically and gives up the static CDN hit that keeps this site fast in
 * India. What the policy does buy: no third-party script, frame, font or
 * connection can load except the ones named here; the site cannot be framed;
 * forms can only post back to this origin; `<base>` and plugins are locked.
 *
 * Adding a third-party service means adding its origin below — the browser
 * console names anything this blocks.
 */
const umami = 'https://cloud.umami.is https://api-gateway.umami.dev';
// Vercel's preview toolbar and comments; production pages never load it.
const vercelLive = 'https://vercel.live';

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${umami} ${vercelLive}${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${umami} ${vercelLive}${isDev ? ' ws:' : ''}`,
  `frame-src ${vercelLive}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

// Security headers. Applied to every route; Vercel serves these on the edge.
const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Matches `frame-ancestors 'none'` for browsers that predate CSP level 2.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  /**
   * Markdown representations: `/pricing.md`, `/blog/slug.md`, and `/index.md`
   * for the homepage. Static rewrites, so ordinary page views run no code.
   */
  async rewrites() {
    // The path travels as segments, not `?path=`: see the markdown route's comment.
    return [
      { source: '/:page.md', destination: '/api/md/:page' },
      { source: '/blog/:slug.md', destination: '/api/md/blog/:slug' },
    ];
  },
};

export default nextConfig;
