from fastapi import FastAPI, HTTPException, Depends, Request
from pydantic import BaseModel
import os, io
from dotenv import load_dotenv
from typing import Tuple, Callable
from inspect import currentframe, getframeinfo
import json
import os
import uuid
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


# Import Zillow scraping functions
from zillow import scrape_zillow_property, extract_data
from PropertyZeroEntropy import PropertyZeroEntropy
app = FastAPI()
load_dotenv()  # Load environment variables from .env file

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any source
    allow_origin_regex=None,  # Disable regex as it's not needed when allowing all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodebookQueryById(BaseModel):
    userId: str

class ZillowRequest(BaseModel):
    url: str

class CodebookRequest(BaseModel):
    url: str
    userId: str

class CodebookQuery(BaseModel):
    query: str
    userId: str

@app.post("/get_mls_data")
async def get_mls_data(request: ZillowRequest):
    try:
        scraped_data = await scrape_zillow_property(request.url)

        if not scraped_data or not scraped_data["json_data_found"]:
            raise HTTPException(status_code=404, detail="Failed to scrape data from Zillow URL")

        temp_scraped_file = f"temp_scraped_{uuid.uuid4()}.json"

        try:
            with open(temp_scraped_file, "w", encoding='utf-8') as json_file:
                json.dump(scraped_data["data_json"], json_file, indent=2, ensure_ascii=False)

            # Synchronously extract
            properties_data = extract_data(temp_scraped_file)
            print('extraction complete!')
            return properties_data

        finally:
            # Clean up temp file
            if os.path.exists(temp_scraped_file):
                os.remove(temp_scraped_file)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing Zillow data: {str(e)}")

@app.post("/push_codebook")
async def push_codebook(request: CodebookRequest):
    try:
        id = request.userId
        z = PropertyZeroEntropy(api_key=os.getenv("ZERO_ENTROPY_API_KEY"), collection_name=id)
        try:
            z.add_collection()
        except Exception as ze:
            if ze.status_code == 409:
                z.delete_collection()
                z.add_collection()
            else:
                raise
        message = z.process_pdf(request.url)
        print(message)
        print('codebook pushed!')

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error pushing codebook to ZeroEntropy: {str(e)}")
    finally:
        return {"message": "Codebook pushed successfully", "id": id}

@app.post("/query_codebook")
async def query_codebook(request: CodebookQuery):
    id = request.userId
    z = PropertyZeroEntropy(api_key=os.getenv("ZERO_ENTROPY_API_KEY"), collection_name=id)
    answer = z.get_info(f"What are the zoning laws for the code {request.query}")
    return answer
  
# @app.post("/query_codebook_by_id")
# async def query_codebook_by_id(request: CodebookQueryById):
#     try:
#         id = request.userId
#         z = PropertyZeroEntropy(api_key=os.getenv("ZERO_ENTROPY_API_KEY"), collection_name=id)
#         documents = z.documents.get_info_list(collection_name=id)
#         return documents
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error querying codebook by ID: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)