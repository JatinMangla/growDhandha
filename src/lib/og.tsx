import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

/**
 * Satori has no glyph for the rupee sign in its fallback font, so the card
 * spells it out. Everywhere else on the site the real symbol is used.
 */
const priceForCard = site.startingPrice.replace('₹', 'Rs. ');

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/**
 * Link preview card for WhatsApp, LinkedIn and X. Rendered at build time by
 * Satori, so it uses inline styles and a flexbox-only subset of CSS.
 */
export function renderOgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0E1330',
          padding: '72px',
          color: '#FBF7F0',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '14px',
              backgroundColor: '#FF7A18',
              color: '#0E1330',
              fontSize: '30px',
              fontWeight: 700,
            }}
          >
            JM
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '30px', fontWeight: 600 }}>{site.name}</span>
            <span style={{ fontSize: '21px', color: '#A3AAC2' }}>
              {site.role} · {site.location.city}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ display: 'flex', height: '4px', width: '260px', backgroundColor: '#FF7A18' }} />
          <div
            style={{
              display: 'flex',
              fontSize: '68px',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
            }}
          >
            Websites & apps for Indian businesses
          </div>
          <div style={{ display: 'flex', fontSize: '40px', fontWeight: 600, color: '#F0C24A' }}>
            Starting at {priceForCard}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['10,500+ users served', '5+ years experience', 'Fixed price, no surprises'].map((chip) => (
            <div
              key={chip}
              style={{
                display: 'flex',
                border: '1px solid #262D4C',
                borderRadius: '999px',
                padding: '12px 24px',
                fontSize: '22px',
                color: '#A3AAC2',
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
