/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { ZeroEntropy } from 'zeroentropy';
import { v4 as uuidv4 } from 'uuid';

const zeroEntropy = new ZeroEntropy({
  apiKey: process.env.ZERO_ENTROPY_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { url, userId, action, query, documentId } = await req.json();
    console.log(url, userId, action, query, documentId);
    
    switch (action) {
      case 'push_codebook':
        return await handlePushCodebook(url, userId);
      case 'status':
        return await handleStatusCheck(userId);
      case 'find_document':
        return await handleFindDocument(userId, documentId);
      case 'query_documents':
        return await handleQueryDocuments(userId, query);
      case 'query_codebook':
        return await handleQueryCodebook(query, userId);
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

async function handleQueryDocuments(userId: string, query: string) {
  try {
    const results = await zeroEntropy.queries.topDocuments({
      collection_name: userId,
      query,
      k: 5,
    });
    
    return NextResponse.json({ 
      results: results.results,
      message: 'Documents found successfully' 
    });
  } catch (error: any) {
    console.error('Query documents error:', error);
    
    if (error?.status === 404) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to query documents' },
      { status: 500 }
    );
  }
}

async function handleFindDocument(userId: string, documentId: string) {
  try {
    const document = await zeroEntropy.documents.getInfo({
      collection_name: userId,
      path: documentId,
    });
    
    return NextResponse.json({ 
      document,
      message: 'Document found successfully' 
    });
  } catch (error: any) {
    console.error('Find document error:', error);
    
    if (error?.status === 404) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to find document' },
      { status: 500 }
    );
  }
}

async function handleStatusCheck(userId: string) {
  try {
    try {
      const result = await zeroEntropy.queries.topDocuments({
        collection_name: userId,
        query: "test query",
        k: 1
      });
      console.log(result);
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
   
    const filename = url.split('/').pop() || uuidv4() + ".pdf"
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

async function handleQueryCodebook(query: string, userId: string) {
  try {
    const response = await zeroEntropy.queries.topSnippets({
      collection_name: userId,
      query,
      k: 5,
    });

    return NextResponse.json({
      results: response.results,
      message: 'Codebook queried successfully'
    });
  } catch (error: any) {
    console.error('Query codebook error:', error);
    
    if (error?.status === 404) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to query codebook' },
      { status: 500 }
    );
  }
}

