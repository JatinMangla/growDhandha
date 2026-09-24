/**
 * Conversion tracking, through Umami (cookieless, no consent banner needed).
 *
 * The script is loaded only when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set, so
 * local development and preview deploys send nothing. Every call here is a
 * no-op until the script has loaded, and a blocked script never throws.
 */

export const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

/** Umami's hosted script; also listed in the CSP in next.config.ts. */
export const UMAMI_SCRIPT_SRC = 'https://cloud.umami.is/script.js';

export type ConversionEvent = 'whatsapp_click' | 'call_click' | 'email_click' | 'form_submit';

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

export function track(event: ConversionEvent, data?: EventData): void {
  try {
    window.umami?.track(event, data);
  } catch {
    // Analytics must never break the thing it is measuring.
  }
}

/** Which contact channel a link opens, if any. */
export function channelOf(href: string): ConversionEvent | null {
  if (href.startsWith('https://wa.me/')) return 'whatsapp_click';
  if (href.startsWith('tel:')) return 'call_click';
  if (href.startsWith('mailto:')) return 'email_click';
  return null;
}
