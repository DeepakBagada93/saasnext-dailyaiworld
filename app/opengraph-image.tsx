import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Daily AI World'
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
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    {/* Simple Logo Representation */}
                    <div
                        style={{
                            width: '60px',
                            height: '60px',
                            background: '#f97316',
                            borderRadius: '50%',
                            marginRight: '20px',
                        }}
                    />
                    <h1 style={{ fontSize: '80px', fontWeight: 'bold', margin: 0 }}>
                        Daily AI World
                    </h1>
                </div>
                <p style={{ fontSize: '30px', color: '#a1a1aa' }}>
                    AI Business, Design, and Future Trends
                </p>
            </div>
        ),
        {
            ...size,
        }
    )
}
