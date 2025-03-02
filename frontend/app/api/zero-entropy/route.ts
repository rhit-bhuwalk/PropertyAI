/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { ZeroEntropy } from 'zeroentropy';
import { getZoningPrompts } from '@/app/prompts/dev-info';
import OpenAI from 'openai';

// Initialize ZeroEntropy client
const zeroEntropy = new ZeroEntropy({
  apiKey: process.env.ZEROENTROPY_API_KEY!,
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { county, state, zoning_code } = await req.json();

    if (!county || !state || !zoning_code) {
      return NextResponse.json(
        { error: 'Missing required fields: county, state, or zoning_code' },
        { status: 400 }
      );
    }

    const collectionName = state.toUpperCase().trim();
    const codebookName = county.toLowerCase().trim();
    // Check if collection exists
    try {
      await validateCollection(collectionName);
    } catch {
      return NextResponse.json(
        { error: `Collection for state "${state}" not found` },
        { status: 404 }
      );
    }

    // Check if codebook exists
    try {
      await validateCodebook(collectionName, codebookName);
    } catch {
      return NextResponse.json(
        { error: `Codebook for county "${county}" not found` },
        { status: 404 }
      );
    }

    // Get the zoning prompts for the provided zoning code
    const zoningPrompts = getZoningPrompts(zoning_code);

    // Query the codebook for each prompt and gather results
    const results = await queryAllPrompts(collectionName, zoningPrompts);

    // Consolidate the results using OpenAI
    const summary = await consolidateResults(results, zoning_code, county, state);

    // Return the formatted results
    return NextResponse.json({
      county,
      state,
      zoning_code,
      analysis: results,
      summary,
    });
  } catch (error) {
    console.error('Zoning Analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to process zoning code analysis' },
      { status: 500 }
    );
  }
}

/**
 * Validates that a collection exists
 */
async function validateCollection(collectionName: string): Promise<void> {
  try {
    await zeroEntropy.queries.topDocuments({
      collection_name: collectionName,
      query: "test query",
      k: 1,
    });
  } catch (error: any) {
    if (error?.status === 404) {
      throw new Error(`Collection ${collectionName} not found`);
    }
    throw error;
  }
}

/**
 * Validates that a codebook exists within a collection
 */
async function validateCodebook(collectionName: string, codebookName: string): Promise<void> {
  try {
    // Check if the document exists in the collection
    await zeroEntropy.documents.getInfo({
      collection_name: collectionName,
      path: codebookName,
    });
  } catch (error: any) {
    if (error?.status === 404) {
      throw new Error(`Codebook ${codebookName} not found in collection ${collectionName}`);
    }
    throw error;
  }
}

/**
 * Queries the codebook for all prompts and formats the results
 */
async function queryAllPrompts(
  collectionName: string, 
  prompts: Record<string, string>
): Promise<Record<string, any>> {
  const results: Record<string, any> = {};

  // Process each prompt sequentially
  for (const [key, query] of Object.entries(prompts)) {
    try {
      const response = await zeroEntropy.queries.topSnippets({
        collection_name: collectionName,
        query,
        k: 5, 
      });

      // Format the response
      results[key] = {
        question: query,
        snippets: response.results.map((result: any) => ({
          content: result.content || '',
          document_path: result.document_path || '',
          relevance_score: result.relevance_score || null,
          page_number: result.metadata?.page_number || null,
        })),
      };
    } catch (error) {
      console.error(`Error querying prompt "${key}":`, error);
      results[key] = {  
        question: query,
        error: 'Failed to retrieve information',
        snippets: [],
      };
    }
  }

  return results;
}

/**
 * Consolidates the retrieved snippets into a coherent summary using OpenAI
 */
async function consolidateResults(
  results: Record<string, any>,
  zoningCode: string,
  county: string,
  state: string
): Promise<Record<string, string>> {
  const summaries: Record<string, string> = {};
  
  // Process each prompt/question separately
  for (const [key, data] of Object.entries(results)) {
    try {
      if (!data.snippets || data.snippets.length === 0) {
        summaries[key] = "No relevant information found.";
        continue;
      }
      
      // Extract snippets for this prompt
      const snippetTexts = data.snippets.map((snippet: any, index: number) => 
        `Snippet ${index + 1}: ${snippet.content}`
      ).join('\n\n');
      
      // Create a targeted prompt for this specific question
      const prompt = `
You are a real estate zoning expert analyzing zoning code "${zoningCode}" in ${county} County, ${state}.

Regarding the following specific question:
"${data.question}"

I have retrieved these snippets from the county zoning codebook:

${snippetTexts}

Please provide a concise, factual summary answering ONLY this specific question based strictly on the information in these snippets. 
Your response should be focused specifically on what's relevant to the question.
If the snippets don't contain an answer to the question, state that clearly.
If there are contradictions or unclear points in the snippets, note those as areas that require further research.
Limit your response to 3-4 sentences maximum.
`;

      // Call OpenAI API for this specific question
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Using a lightweight model
        messages: [
          { 
            role: "system", 
            content: "You are a zoning code expert that provides clear, concise summaries of zoning information based on provided snippets. Keep responses factual and directly based on the provided information only." 
          },
          { 
            role: "user", 
            content: prompt 
          }
        ],
        temperature: 0.2, // Even lower temperature for more factual responses
        max_tokens: 250, // Shorter limit for each field
      });

      // Store the result with the key
      summaries[key] = response.choices[0].message.content?.trim() || "Unable to generate summary.";
    } catch (error) {
      console.error(`Error consolidating results for prompt "${key}":`, error);
      summaries[key] = "Failed to generate summary. Please review the individual snippets for information.";
    }
  }

  return summaries;
}

