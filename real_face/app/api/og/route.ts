import { NextResponse } from "next/server"
import ogs from "open-graph-scraper"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  console.log("Fetching OpenGraph data for URL:", url)

  if (!url) {
    console.error("No URL provided")
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const options = {
      url,
      timeout: 10000,
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    }
    
    console.log("Fetching with options:", options)
    const { error, result } = await ogs(options)
    
    if (error) {
      console.error("OGS Error:", error)
      return NextResponse.json({ error: "Failed to fetch OpenGraph data" }, { status: 500 })
    }

    console.log("OpenGraph data fetched successfully:", result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching OpenGraph data:", error)
    return NextResponse.json({ 
      error: "Failed to fetch OpenGraph data",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

