import { NextResponse } from "next/server"
import ogs from "open-graph-scraper"

const RETRY_ATTEMPTS = 3
const INITIAL_BACKOFF = 1000 // 1 second

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isZillowUrl(url: string): boolean {
  return url.toLowerCase().includes('zillow.com')
}

// Extract basic property info from Zillow URL
function extractZillowInfo(url: string) {
  try {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const zpid = pathParts[pathParts.length - 1].replace('_zpid', '')
    
    // Extract address from URL
    const addressPart = pathParts[pathParts.length - 2]
    const address = addressPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/([A-Z])/g, ' $1')
      .trim()

    return {
      ogTitle: `Property at ${address}`,
      ogDescription: `Zillow property listing with ID: ${zpid}`,
      ogUrl: url,
      ogType: 'website',
      ogSite_name: 'Zillow',
      zpid
    }
  } catch (error) {
    return {
      ogTitle: 'Zillow Property Listing',
      ogUrl: url,
      ogType: 'website',
      ogSite_name: 'Zillow'
    }
  }
}

function getHeaders(url: string) {
  const baseHeaders = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }

  // Add Zillow-specific headers if needed
  if (isZillowUrl(url)) {
    return {
      ...baseHeaders,
      'cache-control': 'max-age=0',
      'cookie': '',
      'referer': 'https://www.zillow.com/',
    }
  }

  return baseHeaders
}

async function fetchWithRetry(url: string, attempt = 1): Promise<any> {
  const options = {
    url,
    timeout: 15000,
    headers: getHeaders(url)
  }

  try {
    console.log(`Attempt ${attempt}: Fetching OpenGraph data for URL:`, url)
    const { error, result } = await ogs(options)

    if (error) {
      throw new Error(typeof error === 'string' ? error : 'OGS Error')
    }

    return result
  } catch (error: unknown) {
    if (attempt >= RETRY_ATTEMPTS) {
      throw error
    }

    const backoffTime = INITIAL_BACKOFF * Math.pow(2, attempt - 1)
    console.log(`Attempt ${attempt} failed. Retrying in ${backoffTime}ms...`)
    await sleep(backoffTime)
    
    return fetchWithRetry(url, attempt + 1)
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ 
      error: "URL is required",
      status: "error" 
    }, { status: 400 })
  }

  try {
    const result = await fetchWithRetry(url)
    
    return NextResponse.json({
      status: "success",
      data: result
    })
  } catch (error: unknown) {
    console.error("Error fetching OpenGraph data:", error)
    
    // Handle Zillow-specific errors with fallback
    if (isZillowUrl(url)) {
      const fallbackData = extractZillowInfo(url)
      return NextResponse.json({
        status: "success",
        data: fallbackData,
        source: "fallback",
        note: "Using extracted data from URL as Zillow blocked direct access"
      })
    }

    return NextResponse.json({ 
      error: "Failed to fetch OpenGraph data",
      status: "error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

