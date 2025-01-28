import requests
import base64
from zeroentropy import ZeroEntropy

class PropertyZeroEntropy(ZeroEntropy):
    """
    A convenience subclass of ZeroEntropy that ties a single collection_name
    to all operations, plus some helper methods for PDF uploads and queries.
    """

    def __init__(self, api_key: str, collection_name: str):
        """
        Initialize the client with an API key and a default collection name.
        """
        super().__init__(api_key=api_key)
        self.collection_name = collection_name

    def process_pdf(self, url: str) -> str:
        """
        Downloads a PDF from `url`, base64-encodes it, and uploads it to the
        current collection. The `path` is automatically generated from the URL’s filename.
        Returns a success or error string.
        """
        try:
            pdf_resp = requests.get(url, timeout=10)
            pdf_resp.raise_for_status()
            base64_content = base64.b64encode(pdf_resp.content).decode("utf-8")
            filename = url.split("/")[-1] or "document.pdf"
            short_path = f"{self.collection_name}_{filename}"
            self.documents.add(
                collection_name=self.collection_name,
                path=short_path,
                content={
                    "type": "auto",
                    "base64_data": base64_content,
                }
            )
            print(f"PDF uploaded successfully to collection '{self.collection_name}' at path '{short_path}'")
            return f"PDF uploaded successfully to collection '{self.collection_name}' at path '{short_path}'"
        except Exception as e:
            return f"Error processing {url}: {e}"

    def get_collection_info(self):
        """
        Returns a list of documents in this collection.
        """
        resp = self.documents.get_info_list(collection_name=self.collection_name)
        return resp.results

    def get_top_documents(self, query: str, k: int = 5):
        """
        Returns the top K documents for a given query in this collection.
        """
        resp = self.queries.top_documents(
            collection_name=self.collection_name,
            query=query,
            k=k,
        )
        return resp.results

    def get_snippets_info(self, query: str, k: int = 5):
        """
        Returns the top K snippets for a given query in this collection.
        """
        resp = self.queries.top_snippets(
            collection_name=self.collection_name,
            query=query,
            k=k,
        )
        return resp.results
    
    def get_pages_info(self, query: str, k: int = 5):
        """
        Returns the top K pages for a given query in this collection.
        """
        resp = self.queries.top_pages(
            collection_name=self.collection_name,
            query=query,
            k=k,
        )
        return resp.results
    
    def get_info_by_id(self, id: str):
        """
        Returns the top K documents for a given query in this collection.
        """
        resp = self.documents.get_info(collection_name=self.collection_name, id=id)
        return resp.results