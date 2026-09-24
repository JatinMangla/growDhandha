import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Sora } from 'next/font/google';
import Script from 'next/script';
import { AnchorScroll } from '@/components/layout/AnchorScroll';
import { ConversionTracking } from '@/components/layout/ConversionTracking';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { PointerFX } from '@/components/ui/PointerFX';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { site, siteUrl } from '@/data/site';
import { UMAMI_SCRIPT_SRC, umamiWebsiteId } from '@/lib/analytics';
import './globals.css';

/**
 * Sora carries the headlines — geometric, wide, confident.
 * Plus Jakarta Sans handles body copy; it stays readable at 14px on a
 * mid-range Android screen, which is where most of this traffic will be.
 */
const display = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Website & App Development in Delhi from ${site.startingPrice} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.socials.linkedin }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    'website development Delhi',
    'affordable website for business India',
    'mobile app developer Delhi',
    'inventory management software for small business',
    'billing software for shop',
    'custom business website India',
    'CRM for small business India',
    'sasta website banwaye',
    'freelance web developer Delhi',
  ],
  /* Pages that set their own `alternates` replace this whole object, so each
     one names its own markdown form — a single global link here used to tell
     agents that /pricing's markdown was the homepage's. */
  alternates: {
    canonical: '/',
    types: { 'text/markdown': '/index.md' },
  },
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: `${site.name} — ${site.role}`,
    title: `Website & App Development in Delhi from ${site.startingPrice}`,
    description: site.shortDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Website & App Development in Delhi from ${site.startingPrice}`,
    description: site.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF7F0' },
    { media: '(prefers-color-scheme: dark)', color: '#090C1C' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <ThemeScript />
        {/* Site-wide markdown summaries. Each page's own markdown alternate
            comes from its `metadata.alternates.types`. */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="Site summary for LLMs" />
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms-full.txt"
          title="Full site content as markdown"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-pill focus:bg-brand focus:px-5 focus:py-3 focus:font-medium focus:text-on-brand"
        >
          Skip to content
        </a>
        <AnchorScroll />
        <ConversionTracking />
        <RevealObserver />
        <PointerFX />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        {umamiWebsiteId ? (
          <Script src={UMAMI_SCRIPT_SRC} data-website-id={umamiWebsiteId} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
