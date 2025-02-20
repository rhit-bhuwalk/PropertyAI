// pages/api/mock-property-details.ts
import { NextResponse } from "next/server";
import { MOCK_ENDPOINT_RESPONSES, ERROR_RESPONSE } from "./mockAttomResponses";

type ValidEndpoint = keyof typeof MOCK_ENDPOINT_RESPONSES;

function hasData(response: any): boolean {
  if (response?.status?.code !== 0) return false;
  
  // Check for specific response types
  if (response.transportationNoise) {
    return true;
  }
  if (response.school && response.school.length > 0) {
    return true;
  }
  if (response.property && response.property.length > 0) {
    return true;
  }
  
  // Remove known metadata fields
  const dataFields = Object.keys(response).filter(key => 
    !['status', 'echoed_fields', 'paging', 'version'].includes(key)
  );

  return dataFields.some(field => {
    const value = response[field];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
    return value !== null && value !== undefined;
  });
}

function logEndpoint(endpoint: string, status: 'SUCCESS' | 'FAILED' | 'EMPTY', error?: any) {
  const name = endpoint.split('/').pop() || endpoint;
  let message = `[ATTOM] ${name}: ${status}`;
  if (error) {
    message += ` (${error.response?.status || error.code}: ${error.response?.data?.msg || error.message})`;
  }
  console.log(message);
}

async function mockCallAttomAPI(endpoint: ValidEndpoint, params: any): Promise<any> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100));

  const mockResponse = MOCK_ENDPOINT_RESPONSES[endpoint];
  if (!mockResponse) {
    logEndpoint(endpoint, 'FAILED', { message: `Unknown endpoint: ${endpoint}` });
    throw new Error(`Unknown endpoint: ${endpoint}`);
  }

  // Check if the endpoint has data
  const containsData = hasData(mockResponse);
  logEndpoint(endpoint, containsData ? 'SUCCESS' : 'EMPTY');

  return mockResponse;
}

function mergeObjects(base: Record<string, any>, extra: Record<string, any>): Record<string, any> {
  // Special handling for specific data types
  if (extra.transportationNoise) {
    base.transportationNoise = extra.transportationNoise;
    return base;
  }
  if (extra.school || extra.schoolDistrict) {
    base.school = extra.school;
    base.schoolDistrict = extra.schoolDistrict;
    return base;
  }

  const baseKeyMap = new Map(Object.keys(base).map((key) => [key.toLowerCase(), key]));

  for (const extraKey of Object.keys(extra)) {
    const normalizedKey = baseKeyMap.get(extraKey.toLowerCase()) || extraKey;

    if (!base.hasOwnProperty(normalizedKey)) {
      base[normalizedKey] = extra[extraKey];
    } else {
      const baseVal = base[normalizedKey];
      const extraVal = extra[extraKey];

      if (
        baseVal &&
        extraVal &&
        typeof baseVal === "object" &&
        typeof extraVal === "object" &&
        !Array.isArray(baseVal) &&
        !Array.isArray(extraVal)
      ) {
        mergeObjects(baseVal, extraVal);
      }
    }
  }
  return base;
}

export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json({ error: "Address is required." }, { status: 400 });
    }

    const detailEndpoint = "propertyapi/v1.0.0/property/detail" as ValidEndpoint;
    const detailData = await mockCallAttomAPI(detailEndpoint, { address });
    
    if (!hasData(detailData)) {
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 }
      );
    }

    const mainProperty = detailData.property?.[0] || {};
    const attomId = mainProperty?.identifier?.attomId;
    
    if (!attomId) {
      return NextResponse.json({ error: "Invalid property data." }, { status: 404 });
    }

    const endpoints = [
      "propertyapi/v1.0.0/property/basicprofile",
      "propertyapi/v1.0.0/property/buildingpermits",
      "propertyapi/v1.0.0/property/detailowner",
      "propertyapi/v1.0.0/property/expandedprofile",
      "transportationnoise",
      "propertyapi/v4/property/detailwithschools",
      "property/v3/preforeclosuredetails",
      "propertyapi/v1.0.0/allevents/detail"
    ] as ValidEndpoint[];

    const results = await Promise.allSettled(
      endpoints.map(async (endpoint) => {
        try {
          const data = await mockCallAttomAPI(endpoint, { attomId });
          return { endpoint, data, error: undefined };
        } catch (error) {
          return { endpoint, data: undefined, error };
        }
      })
    );

    results.forEach((result) => {
      if (result.status === 'fulfilled' && hasData(result.value.data)) {
        const responseData = result.value.data;
        
        // Handle different response types
        if (responseData.property?.length > 0) {
          mergeObjects(mainProperty, responseData.property[0]);
        } else {
          // For non-property responses (schools, noise, etc.)
          mergeObjects(mainProperty, responseData);
        }
      }
    });

    return NextResponse.json(mainProperty);
  } catch (error: any) {
    console.error('[ATTOM] Error:', error);
    return NextResponse.json(
      { error: "Failed to fetch property data" },
      { status: 500 }
    );
  }
}