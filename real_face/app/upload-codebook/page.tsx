"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Trash2 } from "lucide-react"

const PDFIcon = () => (
  <svg
    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06L11.94 1.94A1.5 1.5 0 0 0 10.879 1.5H4.5ZM6 13a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 6 13Zm0-3a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 6 10Zm0-3a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 6 7Z" />
  </svg>
)

export default function UploadCodebook() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDeleteFile = () => {
    setFile(null)
    setError(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
  
    setIsUploading(true)
    setError(null)
  
    try {
      const client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
        },
      })
      const timestamp = Date.now()
      const key = `codebooks/${timestamp}-${file.name}`
      const upload = new Upload({
        client,
        params: {
          Bucket: "municipalcodes",
          Key: key, // reusing the same `key`
          Body: file,
          ContentType: file.type,
        },
      })
  
      upload.on("httpUploadProgress", (progress) => {
        if (progress.loaded && progress.total) {
          setUploadProgress(Math.round((progress.loaded / progress.total) * 100))
        }
      })
  
      await upload.done()
      localStorage.setItem("uploadedPdfName", file.name)
  
      const command = new GetObjectCommand({
        Bucket: "municipalcodes",
        Key: key, 
      })
      const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 })
  
      const userId = localStorage.getItem("userId")
      if (!userId) {
        throw new Error("User ID not found")
      }
  
      const response = await fetch("http://localhost:8080/push_codebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: signedUrl,
          userId: userId,
        }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to push codebook")
      } else {
        console.log("Successfully pushed codebook")
      }
  
      // 6) Go to your report page
      router.push("/report")
    } catch (err) {
      console.error("Error uploading file:", err)
      setError("Failed to upload file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="px-4 py-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-medium">PropertyAI</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-2xl font-bold text-center">Upload Codebook PDF</h1>
          <p className="text-center text-zinc-400">
            Please upload the codebook PDF for the municipality of the property you're analyzing.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <PDFIcon />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{file.name}</p>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                        onClick={(e) => {
                          e.preventDefault()
                          handleDeleteFile()
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete File
                      </Button>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 10MB)</p>
                    </>
                  )}
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
              </label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium"
              disabled={!file || isUploading}
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Uploading... {uploadProgress}%</span>
                </div>
              ) : (
                "Upload and Continue"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

