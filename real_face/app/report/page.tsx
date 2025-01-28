"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { format } from "date-fns"
import { parseZillowData } from "@/utils/parseZillowData"
import { PropertyDataTable } from "@/components/property-data-table"
import { ZoningDataTable } from "@/components/zoning-data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReportData {
    [key: string]: any
}

interface ZoningResponse {
    content: string
    start_index: number
    end_index: number
    page_span: number[]
    path: string
    score: number
}

export default function ReportPage() {
    const [projectName, setProjectName] = useState("Lino Lakes")
    const [reportData, setReportData] = useState<ReportData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
    const [zoningCode, setZoningCode] = useState("")
    const [zoningData, setZoningData] = useState<ZoningResponse[]>([])
    const [parsedFields, setParsedFields] = useState<Record<string, any> | null>(null)
    const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)
    const [userId, setUserId] = useState<string | null>(null)
    const [codebookStatus, setCodebookStatus] = useState<"processing" | "complete" | "failed" | null>(null)

    useEffect(() => {
        const fileName = localStorage.getItem("uploadedPdfName")
        const storedId = localStorage.getItem("userId")
        setUserId(storedId)

        if (fileName) {
            setUploadedFileName(fileName)
        }

        const fetchReport = async () => {
            try {
                const propertyUrl = localStorage.getItem("propertyUrl")
                const response = await fetch("http://localhost:8080/get_mls_data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url: propertyUrl }),
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || "Failed to generate report")
                }
                setReportData(data)
                const extractedFields = parseZillowData(data)
                setParsedFields(extractedFields)

                const signedUrl = localStorage.getItem("signedUrl")
                if (signedUrl && storedId) {
                    fetch("/api/zero-entropy", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            url: signedUrl,
                            userId: storedId,
                            action: "push_codebook",
                        }),
                    })
                        .then((res) => {
                            if (!res.ok) {
                                return res.json().then((data) => {
                                    console.error("ZeroEntropy push error:", data.error || "Unknown")
                                })
                            }
                            console.log("ZeroEntropy push started successfully")
                        })
                        .catch((bgErr) => {
                            console.error("ZeroEntropy push failed in background:", bgErr)
                        })
                }
            } catch (err) {
                console.error("Error generating report:", err)
                setError(err instanceof Error ? err.message : "An error occurred")
            } finally {
                setIsLoading(false)
            }
        }

        fetchReport()
    }, [])


    useEffect(() => {
        if (!userId) return;

        const checkStatus = async () => {
            try {
                const resp = await fetch("/api/zero-entropy", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: userId,
                        action: "status",
                    }),
                });
                const data = await resp.json();

                if (data.status === "processing") {
                    setCodebookStatus("processing");
                } else if (data.status === "complete") {
                    setCodebookStatus("complete");
                    clearInterval(interval);
                } else if (data.status === "failed") {
                    setCodebookStatus("failed");
                    if (data.error) setError(data.error);
                    clearInterval(interval);
                }
            } catch (err) {
                console.error("Error checking codebook status:", err);
            }
        };

        let interval: NodeJS.Timeout | undefined;
        if (codebookStatus === "processing") {
            interval = setInterval(checkStatus, 20000);
        }
        checkStatus();
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [userId]);


    const fetchZoningData = async () => {
        if (!zoningCode) return
        try {
            const response = await fetch("http://localhost:8080/query_codebook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: zoningCode, userId: userId, query_type: "zoning" }),
            })
            const data = await response.json()
            setZoningData(data as ZoningResponse[])
            console.log(data)
        } catch (error) {
            console.error("Error fetching zoning data:", error)
            setZoningData([])
        }
    }

    const currentDate = format(new Date(), "M/d/yy")

    return (
        <div className="min-h-screen bg-orange-50">
            <header className="px-4 py-6 bg-white shadow-sm">
                <Link href="/" className="flex items-center gap-2 w-fit">
                    <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                        <div className="w-4 h-4 bg-orange-500 rounded-sm" />
                    </div>
                    <span className="font-medium text-orange-950">PropertyAI</span>
                </Link>
            </header>

            <main className="container dashboard-container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="grid gap-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h1 className="text-2xl font-bold text-orange-950">
                                    MAC Development - SIR (Site Investigation Report)
                                </h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-950 whitespace-nowrap">Project Name:</span>
                                    <Input
                                        type="text"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        className="max-w-[200px] bg-white text-orange-950 
                               placeholder:text-orange-300 border-orange-200 
                               focus:border-orange-500 focus:ring-orange-500 focus-visible:ring-orange-500"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 p-6 bg-orange-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-orange-950">SIR Compilation Date:</span>
                                    <span className="text-orange-900">{currentDate}</span>
                                </div>
                                <div className="space-y-2">
                                    <span className="font-semibold text-orange-950">Gathered Attachments:</span>
                                    {uploadedFileName ? (
                                        <p className="text-orange-900">{uploadedFileName}</p>
                                    ) : (
                                        <p className="text-orange-600 italic">No file uploaded</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            {isLoading ? (
                                <div className="flex items-center justify-center p-8">
                                    <div className="w-8 h-8 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                                </div>
                            ) : error ? (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{error}</div>
                            ) : reportData ? (
                                <>
                                    <h2 className="text-xl font-semibold mb-2 text-orange-950">Parsed Fields:</h2>
                                    {parsedFields && <PropertyDataTable data={parsedFields} />}
                                </>
                            ) : null}
                        </div>

                        <Card>
                            <CardHeader className="bg-orange-50">
                                <CardTitle className="text-lg font-semibold text-orange-950">Zoning</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {/* Show a message if codebook is not yet indexed */}
                                {codebookStatus === "processing" && (
                                    <div className="text-orange-900 mb-4">
                                        <strong>Codebook indexing in progress...</strong>
                                    </div>
                                )}
                                {codebookStatus === "failed" && (
                                    <div className="text-red-600 mb-4">
                                        Failed to index codebook. Please contact support or try again later.
                                    </div>
                                )}
                                {codebookStatus !== "complete" ? (
                                    // If not complete, disable the form or hide it
                                    <div className="text-orange-600 italic">
                                        Codebook must finish indexing before you can query zoning data.
                                    </div>
                                ) : (
                                    // Render zoning input/search only if indexing is complete
                                    <>
                                        <p className="text-orange-900 mb-4">
                                            Enter the zoning code that your property falls under:
                                        </p>
                                        <div className="flex items-center gap-4 mb-6">
                                            <Input
                                                type="text"
                                                value={zoningCode}
                                                onChange={(e) => setZoningCode(e.target.value)}
                                                className="max-w-[200px] bg-white text-orange-950 
                                   placeholder:text-orange-300 border-orange-200 
                                   focus:border-orange-500 focus:ring-orange-500 focus-visible:ring-orange-500"
                                            />
                                            <Button
                                                onClick={fetchZoningData}
                                                disabled={!zoningCode}
                                                className="bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500"
                                            >
                                                Get Zoning Data
                                            </Button>
                                        </div>
                                        <ZoningDataTable
                                            zoningData={zoningData}
                                            currentSnippetIndex={currentSnippetIndex}
                                            setCurrentSnippetIndex={setCurrentSnippetIndex}
                                        />
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
