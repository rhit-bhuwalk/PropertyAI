import { NextRequest, NextResponse } from 'next/server';
import { ZeroEntropy } from 'zeroentropy';

// Initialize ZeroEntropy client
const zeroEntropy = new ZeroEntropy({
  apiKey: process.env.ZERO_ENTROPY_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { url, userId, action, query } = await req.json();

    switch (action) {
      case 'push_codebook':
        return await handlePushCodebook(url, userId);
      case 'status':
        return await handleStatusCheck(userId);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('ZeroEntropy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleStatusCheck(userId: string) {
  try {
    // Try to query the collection - if it fails with 404, it's still processing
    try {
      const result = await zeroEntropy.queries.topSnippets({
        collection_name: userId,
        query: "test query",
        k: 1
      });
      
      return NextResponse.json({ status: "complete" });
    } catch (queryError: any) {
     
      if (queryError?.status === 404) {
        return NextResponse.json({ status: "processing" });
      }
      throw queryError;
    }
  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json({ 
      status: "failed",
      error: error instanceof Error ? error.message : "Failed to check status"
    });
  }
}

async function handlePushCodebook(url: string, userId: string) {
  try {
    // Download PDF content
    const pdfResponse = await fetch(url);
    if (!pdfResponse.ok) {
      throw new Error('Failed to download PDF');
    }
    const pdfBuffer = await pdfResponse.arrayBuffer();
    const base64Content = Buffer.from(pdfBuffer).toString('base64');

    try {
      await zeroEntropy.collections.delete({ collection_name: userId });
    } catch (error: any) {
      if (error?.status !== 404) {
        throw error;
      }
    }
    await zeroEntropy.collections.add({ collection_name: userId });
   
    const filename = url.split('/').pop() || 'document.pdf';
    const path = `${userId}_${filename}`;
    
    await zeroEntropy.documents.add({
      collection_name: userId,
      path,
      content: {
        type: 'auto',
        base64_data: base64Content,
      },
    });

    return NextResponse.json({ 
      message: 'Codebook push started successfully',
      id: userId 
    });
  } catch (error) {
    console.error('Push codebook error:', error);
    return NextResponse.json(
      { error: 'Failed to push codebook' },
      { status: 500 }
    );
  }
}

// async function handleQueryCodebook(query: string, userId: string) {
//   try {
//     const response = await zeroEntropy.queries.top_snippets({
//       collection_name: userId,
//       query,
//       k: 5,
//     });

//     return NextResponse.json(response.results);
//   } catch (error) {
//     console.error('Query codebook error:', error);
//     return NextResponse.json(
//       { error: 'Failed to query codebook' },
//       { status: 500 }
//     );
//   }
// }
