import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PropertyAI'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px'
          }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'white', 
              borderRadius: '4px' 
            }} />
          </div>
          <div style={{ fontSize: '64px', fontWeight: 'bold' }}>PropertyAI</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 