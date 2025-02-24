import { NextResponse } from "next/server";
import { MOCK_DETAIL_RESPONSE } from "./mockAttomResponses";
export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json({ error: "Address is required." }, { status: 400 });
    }

    // Simulate a slight delay to mimic API call
    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json(MOCK_DETAIL_RESPONSE);
  } catch (error: any) {
    console.error('[ATTOM] Error:', error);
    return NextResponse.json(
      { error: "Failed to fetch property data" },
      { status: 500 }
    );
  }
}
