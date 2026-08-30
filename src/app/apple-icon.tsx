import { ImageResponse } from 'next/og';

// Apple touch icons must be a raster format, so this one is generated at build time.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          color: '#FBF7F0',
          fontSize: 72,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.03em',
        }}
      >
        <div style={{ display: 'flex' }}>JM</div>
        <div style={{ display: 'flex', width: 96, height: 6, backgroundColor: '#FF7A18', marginTop: 14 }} />
      </div>
    ),
    size,
  );
}
