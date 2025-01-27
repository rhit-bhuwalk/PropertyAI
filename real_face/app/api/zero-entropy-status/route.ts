import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      )
    }

    // TODO: Replace with actual status check logic
    const response = await fetch('http://localhost:8080/check_codebook_status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error checking codebook status:', error)
    return NextResponse.json(
      { error: 'Failed to check codebook status' },
      { status: 500 }
    )
  }
} 