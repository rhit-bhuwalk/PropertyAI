"use client";

import { useState, useEffect } from "react";
import PropertyReport from "./property-report"

// Combined response interfaces remain the same if you need them
interface AttomStatus {
  version: string;
  code: number;
  msg: string;
  total: number;
  page: number;
  pagesize: number;
  responseDateTime: string;
  transactionID: string;
  attomId: number;
}

interface AttomProperty {
  identifier?: { [key: string]: any };
  lot?: { [key: string]: any };
  area?: { [key: string]: any };
  address?: { [key: string]: any };
  location?: { [key: string]: any };
  summary?: { [key: string]: any };
  utilities?: { [key: string]: any };
  building?: { [key: string]: any };
  vintage?: { [key: string]: any };
}

interface PropertyResponse {
  status: AttomStatus;
  property: AttomProperty[];
  echoed_fields?: { [key: string]: any };
}

export default function Report() {
  const [data, setData] = useState<AttomProperty | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchPropertyData() {
      try {
        const address = localStorage.getItem("propertyAddress");
        if (!address) {
          throw new Error("No property address found.");
        }
        const response = await fetch("/api/mock-property-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch property data");
        }

        const response_json = await response.json();

        setData(response_json as AttomProperty);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPropertyData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-700">
        Loading property data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return <PropertyReport data={data} />;
}