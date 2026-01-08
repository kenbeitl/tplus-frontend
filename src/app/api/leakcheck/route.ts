import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('check');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Forward the request to the external API
    const response = await fetch(
      `https://tplus.ai/api/leakcheck/public?check=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Leakcheck API error:', error);
    return NextResponse.json(
      { error: 'Failed to check for data breaches' },
      { status: 500 }
    );
  }
}
