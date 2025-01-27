export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If it's a Zillow image, return it directly
  if (src.includes('zillowstatic.com')) {
    return src
  }

  // For other images, use default behavior
  return `${src}?w=${width}&q=${quality || 75}`
} 