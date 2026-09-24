import { ImageResponse } from 'next/og';

/**
 * The PNG home-screen icons Android needs for "Install app" — it will not
 * offer installation from an SVG alone.
 *
 * `maskable` icons get cropped to whatever shape the launcher uses (circle,
 * squircle, teardrop), and only the centre 80% is guaranteed to survive. So the
 * maskable variant is full-bleed ink with the monogram shrunk into that safe
 * zone; the regular one can use the whole square.
 */
export function renderAppIcon(size: number, { maskable = false } = {}): ImageResponse {
  const scale = maskable ? 0.72 : 1;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0E1330',
          borderRadius: maskable ? 0 : size * 0.22,
          color: '#FBF7F0',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          fontSize: size * 0.4 * scale,
          letterSpacing: '-0.03em',
        }}
      >
        <div style={{ display: 'flex' }}>JM</div>
        <div
          style={{
            display: 'flex',
            width: size * 0.53 * scale,
            height: Math.max(2, size * 0.033 * scale),
            marginTop: size * 0.078 * scale,
            backgroundColor: '#FF7A18',
          }}
        />
      </div>
    ),
    { width: size, height: size },
  );
}
