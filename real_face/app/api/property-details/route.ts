// pages/api/property.ts
import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = "https://api.gateway.attomdata.com";

interface AttomPropertyResponse {
  status?: {
    code?: number;
    msg?: string;
    [key: string]: any;
  };
  property?: any[];
  [key: string]: any;
}

interface AttomAPIResult {
  endpoint: string;
  data?: AttomPropertyResponse;
  error?: any;
}

function hasData(response: AttomPropertyResponse): boolean {
  // First check status code
  if (response?.status?.code !== 0) return false;

  // Remove known metadata fields
  const dataFields = Object.keys(response).filter(key => 
    !['status', 'echoed_fields', 'paging'].includes(key)
  );

  // Check remaining fields for data
  return dataFields.some(field => {
    const value = response[field];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).length > 0;
    }
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

async function callAttomAPI(endpoint: string, params: any): Promise<AttomPropertyResponse> {
  const url = `${BASE_URL}/${endpoint}`;
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        apikey: process.env.ATTOM_API_KEY as string,
      },
      params,
    });
    
    // Log response status based on data presence
    const responseData = response.data as AttomPropertyResponse;
    const containsData = hasData(responseData);
    logEndpoint(endpoint, containsData ? 'SUCCESS' : 'EMPTY');
    
    return responseData;
  } catch (error: any) {
    logEndpoint(endpoint, 'FAILED', error);
    throw error;
  }
}

function mergeObjects(base: Record<string, any>, extra: Record<string, any>): Record<string, any> {
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

    // Get initial property details
    const detailEndpoint = "propertyapi/v1.0.0/property/detail";
    const detailData = await callAttomAPI(detailEndpoint, { address });
    
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

    // Additional endpoints to query
    const endpoints = [
      "propertyapi/v1.0.0/property/basicprofile",
      "propertyapi/v1.0.0/property/buildingpermits",
      "propertyapi/v1.0.0/property/detailowner",
      "propertyapi/v1.0.0/property/expandedprofile",
      "transportationnoise",
      "propertyapi/v4/property/detailwithschools",
      "property/v3/preforeclosuredetails",
      "propertyapi/v1.0.0/allevents/detail",
    ];

    // Call all endpoints in parallel
    const results = await Promise.allSettled(
      endpoints.map(async (endpoint) => {
        try {
          const data = await callAttomAPI(endpoint, { attomId });
          return { endpoint, data, error: undefined };
        } catch (error) {
          return { endpoint, data: undefined, error };
        }
      })
    );

    // Merge successful results
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value.data && hasData(result.value.data)) {
        // Handle both array and object responses
        const responseData = result.value.data.property?.[0] || result.value.data;
        if (Object.keys(responseData).length > 0) {
          mergeObjects(mainProperty, responseData);
        }
      }
    });

    return NextResponse.json(mainProperty);
  } catch (error: any) {
    console.log('[ATTOM] API Error:', error.message);
    return NextResponse.json(
      { error: "Failed to fetch property data" },
      { status: 500 }
    );
  }
}